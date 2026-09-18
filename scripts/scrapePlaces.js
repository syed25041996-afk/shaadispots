/**
 * Google Places API bulk scraper with Photos & Reviews support
 * ------------------------------------------------------------
 * - Grid-searches an area (e.g. Bangalore) using Nearby Search
 * - Deduplicates venues by place_id
 * - Fetches Place Details including:
 *     * Contact info (phone, website, address)
 *     * Rating & user ratings count
 *     * Coordinates (lat, lng)
 *     * Up to 5 Google reviews (author, rating, text, relative time)
 *     * Up to 5 high-resolution venue photos (resolved to direct Google CDN URLs)
 * - Exports results to:
 *     * places_detailed.json (Rich, structured dataset matching app schema)
 *     * places_output.csv (Spreadsheet-friendly with photo URLs & top review)
 * - Tracks API calls and estimates costs
 */

import fs from "fs";

// ============================================================
// CONFIG
// ============================================================

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || "AIzaSyCiHUCAKad4lhIDOFWUmo9K6wVfyGy4T-U";
const SEARCH_KEYWORD = "wedding hall";
const GRID_RADIUS_M = 5000; // 5 km radius per grid point

// Enrichments
const FETCH_DETAILS = true;
const FETCH_PHOTOS = true;             // Fetch venue photos
const MAX_PHOTOS_PER_PLACE = 5;        // Number of photos to capture per venue (1 to 10)
const RESOLVE_PHOTO_CDN_URLS = true;   // Resolve to direct CDN URLs (lh3.googleusercontent.com)
const FETCH_REVIEWS = true;            // Fetch top reviews per venue (up to 5)

// Output files
const OUTPUT_CSV = "places_output.csv";
const OUTPUT_JSON = "places_detailed.json";

// Grid of [lat, lng] points (Bangalore metro area)
const GRID_POINTS = [
  [12.9716, 77.5946], // Central Bangalore
  [12.9351, 77.6146], // Koramangala / HSR
  [12.9081, 77.6476], // Sarjapur / Bellandur
  [13.0358, 77.597],  // Hebbal / North
  [13.1007, 77.5963], // Yelahanka
  [12.9755, 77.5058], // Rajajinagar / West
  [12.8988, 77.5748], // JP Nagar / Banashankari
  [12.8452, 77.6602], // Electronic City
  [12.9634, 77.7359], // Whitefield
  [12.9855, 77.7095]  // Marathahalli
];

// API call tracking
let apiCalls = {
  nearby_search: 0,
  place_details: 0,
  place_photos: 0
};

// ============================================================
// HELPERS
// ============================================================

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Safe CSV string escaper
function toCsv(rows) {
  const headers = [
    "place_id",
    "name",
    "address",
    "phone",
    "website",
    "rating",
    "rating_count",
    "lat",
    "lng",
    "photos_count",
    "photos",
    "reviews_count",
    "top_review"
  ];

  const escape = (val) => {
    const s = String(val ?? "");
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => escape(row[h])).join(","));
  }
  return lines.join("\n");
}

// ============================================================
// API CALLS
// ============================================================

/**
 * Grid search using Nearby Search
 */
async function nearbySearchAllPages(lat, lng, radius, keyword) {
  const baseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  let results = [];
  let pageToken;

  while (true) {
    const params = new URLSearchParams({ key: API_KEY });
    if (pageToken) {
      params.set("pagetoken", pageToken);
    } else {
      params.set("location", `${lat},${lng}`);
      params.set("radius", String(radius));
      params.set("keyword", keyword);
    }

    const resp = await fetch(`${baseUrl}?${params.toString()}`);
    const data = await resp.json();
    apiCalls.nearby_search++;

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      console.warn(`  [warn] Nearby Search error: ${data.status} - ${data.error_message || ""}`);
      break;
    }

    results = results.concat(data.results || []);
    if (!data.next_page_token) break;

    pageToken = data.next_page_token;
    await sleep(2000); // Google requires a 2s pause before next_page_token becomes valid
  }
  return results;
}

/**
 * Fetch Place Details including Photos and Reviews
 */
async function getPlaceDetails(placeId) {
  const url = "https://maps.googleapis.com/maps/api/place/details/json";
  const fields = [
    "name",
    "formatted_address",
    "formatted_phone_number",
    "website",
    "rating",
    "user_ratings_total",
    "geometry",
    "photos",
    "reviews"
  ].join(",");

  const params = new URLSearchParams({ place_id: placeId, fields, key: API_KEY });

  const resp = await fetch(`${url}?${params.toString()}`);
  const data = await resp.json();
  apiCalls.place_details++;

  if (data.status !== "OK") {
    console.warn(`  [warn] Details error for ${placeId}: ${data.status}`);
    return {};
  }
  return data.result || {};
}

/**
 * Resolves a Google photo reference into a direct CDN image URL.
 * Uses redirect: 'manual' to grab the 302 Location header instantly without downloading image bytes.
 */
async function resolvePhotoCdnUrl(photoReference, maxWidth = 800) {
  const apiUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${API_KEY}`;
  try {
    apiCalls.place_photos++;
    const res = await fetch(apiUrl, { redirect: "manual" });
    const cdnUrl = res.headers.get("location");
    if (cdnUrl) return cdnUrl;
    return apiUrl;
  } catch (err) {
    return apiUrl;
  }
}

// ============================================================
// MAIN SCRAPER
// ============================================================

async function main() {
  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    console.log("Error: Set GOOGLE_PLACES_API_KEY environment variable before running.");
    return;
  }

  const allPlaces = new Map();

  console.log("=".repeat(55));
  console.log("🌟 SHAADISPOTS - PLACES, PHOTOS & REVIEWS SCRAPER");
  console.log("=".repeat(55));
  console.log(`Searching ${GRID_POINTS.length} grid points for '${SEARCH_KEYWORD}'...`);

  // 1. Grid search
  for (let i = 0; i < GRID_POINTS.length; i++) {
    const [lat, lng] = GRID_POINTS[i];
    console.log(`[${i + 1}/${GRID_POINTS.length}] Searching near (${lat}, ${lng})...`);

    const found = await nearbySearchAllPages(lat, lng, GRID_RADIUS_M, SEARCH_KEYWORD);

    let newCount = 0;
    for (const place of found) {
      if (place.place_id && !allPlaces.has(place.place_id)) {
        allPlaces.set(place.place_id, place);
        newCount++;
      }
    }
    console.log(`    -> ${found.length} results, ${newCount} new unique (total: ${allPlaces.size})`);
  }

  console.log(`\nFound ${allPlaces.size} unique venues.`);

  const detailedVenues = [];
  const csvRows = [];

  // 2. Details, Photos & Reviews Enrichment
  if (FETCH_DETAILS) {
    console.log(`\nFetching details, photos (up to ${MAX_PHOTOS_PER_PLACE}/venue), and reviews...`);
    let count = 0;

    for (const [placeId, place] of allPlaces) {
      const details = await getPlaceDetails(placeId);

      // A. Reviews
      const reviews = (details.reviews || []).slice(0, 5).map((r) => ({
        author: r.author_name || "Anonymous",
        rating: r.rating ?? 5,
        text: (r.text || "").trim(),
        relative_time: r.relative_time_description || "",
        time: r.time,
        profile_photo_url: r.profile_photo_url || ""
      }));

      // B. Photos
      const photos = [];
      if (FETCH_PHOTOS && Array.isArray(details.photos)) {
        const photoItems = details.photos.slice(0, MAX_PHOTOS_PER_PLACE);
        for (const p of photoItems) {
          if (p.photo_reference) {
            if (RESOLVE_PHOTO_CDN_URLS) {
              const url = await resolvePhotoCdnUrl(p.photo_reference);
              photos.push(url);
            } else {
              photos.push(
                `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${p.photo_reference}&key=${API_KEY}`
              );
            }
          }
        }
      }

      // Lat / Lng
      const lat = details.geometry?.location?.lat ?? place.geometry?.location?.lat ?? "";
      const lng = details.geometry?.location?.lng ?? place.geometry?.location?.lng ?? "";

      // Structured venue object (JSON)
      const venueObj = {
        place_id: placeId,
        name: details.name || place.name,
        address: details.formatted_address || place.vicinity || "",
        lat,
        lng,
        phone: details.formatted_phone_number || "",
        website: details.website || "",
        rating: details.rating ?? place.rating ?? null,
        rating_count: details.user_ratings_total ?? place.user_ratings_total ?? 0,
        photos,
        reviews
      };
      detailedVenues.push(venueObj);

      // Flat row (CSV)
      csvRows.push({
        place_id: placeId,
        name: venueObj.name,
        address: venueObj.address,
        phone: venueObj.phone,
        website: venueObj.website,
        rating: venueObj.rating ?? "",
        rating_count: venueObj.rating_count ?? "",
        lat: venueObj.lat,
        lng: venueObj.lng,
        photos_count: photos.length,
        photos: photos.join(" | "),
        reviews_count: reviews.length,
        top_review: reviews.length > 0 ? reviews[0].text : ""
      });

      count++;
      if (count % 10 === 0 || count === allPlaces.size) {
        console.log(`    ...enriched ${count}/${allPlaces.size} venues (${apiCalls.place_photos} photos resolved)`);
      }
    }
  } else {
    // Basic search data only
    for (const [placeId, place] of allPlaces) {
      const lat = place.geometry?.location?.lat ?? "";
      const lng = place.geometry?.location?.lng ?? "";
      detailedVenues.push({
        place_id: placeId,
        name: place.name,
        address: place.vicinity || "",
        lat,
        lng,
        phone: "",
        website: "",
        rating: place.rating ?? null,
        rating_count: place.user_ratings_total ?? 0,
        photos: [],
        reviews: []
      });
      csvRows.push({
        place_id: placeId,
        name: place.name,
        address: place.vicinity || "",
        phone: "",
        website: "",
        rating: place.rating ?? "",
        rating_count: place.user_ratings_total ?? "",
        lat,
        lng,
        photos_count: 0,
        photos: "",
        reviews_count: 0,
        top_review: ""
      });
    }
  }

  // 3. Save JSON & CSV
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(detailedVenues, null, 2));
  console.log(`\n✅ Saved ${detailedVenues.length} detailed venues with photos & reviews to ${OUTPUT_JSON}`);

  fs.writeFileSync(OUTPUT_CSV, toCsv(csvRows));
  console.log(`✅ Saved ${csvRows.length} venues to ${OUTPUT_CSV}`);

  // 4. Cost Breakdown Estimation
  const costNearby = (apiCalls.nearby_search / 1000) * 32.0;
  const costDetails = (apiCalls.place_details / 1000) * 17.0;
  const costPhotos = (apiCalls.place_photos / 1000) * 7.0;
  const totalCost = costNearby + costDetails + costPhotos;

  console.log("\n" + "=".repeat(50));
  console.log("📊 API USAGE & ESTIMATED COST BREAKDOWN");
  console.log("=".repeat(50));
  console.log(`Nearby Search : ${apiCalls.nearby_search.toString().padStart(4)} calls (~$${costNearby.toFixed(4)})`);
  console.log(`Place Details : ${apiCalls.place_details.toString().padStart(4)} calls (~$${costDetails.toFixed(4)})`);
  console.log(`Place Photos  : ${apiCalls.place_photos.toString().padStart(4)} calls (~$${costPhotos.toFixed(4)})`);
  console.log("-".repeat(50));
  console.log(`Estimated Total: ~$${totalCost.toFixed(4)} USD`);
  console.log("(Google Maps offers a $200 free credit monthly)");
  console.log("Check live spend at: https://console.cloud.google.com/billing\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});