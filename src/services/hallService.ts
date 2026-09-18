import { ALL_HALLS } from '../data/halls';
import { Hall, HallFilters, EnquiryPayload } from '../types/hall';

/**
 * Single Service Layer for Venue & Hall Data Access
 *
 * ARCHITECTURAL RULE:
 * Components MUST NEVER import ALL_HALLS directly.
 * All UI access must flow through these async functions returning Promises.
 * To migrate to Firebase/Firestore in the future:
 *   Replace the internal mock resolution with Firestore queries (e.g. `getDocs(query(...))`
 *   or `getDoc(doc(...))`) without altering function signatures or return types.
 */

// Simulated network latency helper (in milliseconds)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch all halls, optionally filtered and sorted
 *
 * @param filters Optional search, area, capacity, price, amenities, vegOnly, and sorting criteria
 * @returns Promise resolving to an array of matching Hall objects
 */
export async function getAllHalls(filters?: HallFilters): Promise<Hall[]> {
  // Simulate network round-trip latency
  await delay(250);

  let results = [...ALL_HALLS];

  if (!filters) {
    return results;
  }

  // 1. Text Search (name, description, area, city, amenities)
  if (filters.search && filters.search.trim() !== '') {
    const q = filters.search.toLowerCase().trim();
    results = results.filter((hall) => {
      const nameMatch = hall.name.toLowerCase().includes(q);
      const descMatch = hall.description.toLowerCase().includes(q);
      const areaMatch = hall.area.toLowerCase().includes(q);
      const addressMatch = hall.address.toLowerCase().includes(q);
      const cityMatch = hall.city.toLowerCase().includes(q);
      const amenityMatch = hall.amenities.some((a) => a.toLowerCase().includes(q));
      return nameMatch || descMatch || areaMatch || addressMatch || cityMatch || amenityMatch;
    });
  }

  // 2. Area Filter
  if (filters.area && filters.area !== 'All Areas') {
    results = results.filter((hall) => hall.area.toLowerCase() === filters.area!.toLowerCase());
  }

  // 3. Min Capacity Filter
  if (filters.minCapacity && filters.minCapacity > 0) {
    results = results.filter((hall) => hall.capacityMax >= filters.minCapacity!);
  }

  // 4. Max Capacity Filter
  if (filters.maxCapacity && filters.maxCapacity > 0) {
    results = results.filter((hall) => hall.capacityMin <= filters.maxCapacity!);
  }

  // 5. Max Price Per Day Filter
  if (filters.maxPricePerDay && filters.maxPricePerDay > 0) {
    results = results.filter((hall) => hall.pricePerDay <= filters.maxPricePerDay!);
  }

  // 6. Max Price Per Plate Filter
  if (filters.maxPricePerPlate && filters.maxPricePerPlate > 0) {
    results = results.filter((hall) => hall.pricePerPlate <= filters.maxPricePerPlate!);
  }

  // 7. Veg-Only Toggle
  if (filters.vegOnly) {
    results = results.filter((hall) => hall.vegOnly === true);
  }

  // 8. AC Toggle
  if (filters.isAC) {
    results = results.filter((hall) => hall.isAC === true);
  }

  // 9. Parking Toggle
  if (filters.hasParking) {
    results = results.filter((hall) => hall.hasParking === true);
  }

  // 10. Rooms Toggle
  if (filters.hasRooms) {
    results = results.filter((hall) => hall.hasRooms === true);
  }

  // 11. Amenities Filter (hall must contain ALL selected amenities)
  if (filters.amenities && filters.amenities.length > 0) {
    results = results.filter((hall) =>
      filters.amenities!.every((selectedAmenity) =>
        hall.amenities.some((a) => a.toLowerCase().includes(selectedAmenity.toLowerCase()))
      )
    );
  }

  // 12. Sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'price-desc':
        results.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'rating-desc':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'capacity-desc':
        results.sort((a, b) => b.capacityMax - a.capacityMax);
        break;
    }
  }

  return results;
}

/**
 * Fetch a single hall by its unique ID
 *
 * @param id The hall identifier
 * @returns Promise resolving to the Hall object, or null if not found
 */
export async function getHallById(id: string): Promise<Hall | null> {
  // Simulate network latency
  await delay(200);

  const hall = ALL_HALLS.find((h) => h.id === id);
  return hall ? { ...hall } : null;
}

/**
 * Submit an event enquiry for a specific hall
 *
 * In production with Firebase, this will be replaced with:
 *   await addDoc(collection(db, 'enquiries'), { hallId, ...payload, createdAt: serverTimestamp() });
 *
 * @param hallId The hall being enquired about
 * @param payload The customer's enquiry details
 */
export async function createEnquiry(hallId: string, payload: EnquiryPayload): Promise<void> {
  // Simulate network latency
  await delay(400);

  // Validate payload basics
  if (!hallId) {
    throw new Error('Venue ID is required to submit an enquiry.');
  }
  if (!payload.name || !payload.phone || !payload.email || !payload.eventDate) {
    throw new Error('Please fill in all required enquiry fields.');
  }

  // Log in development to confirm data structure
  console.info(`[Enquiry Submitted] Venue ID: ${hallId}`, payload);

  // Ready to resolve
  return Promise.resolve();
}

