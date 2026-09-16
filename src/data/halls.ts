import { Hall } from '../types/hall';

/**
 * Realistic Dummy Venue Data for ShaadiSpots - Bengaluru (Bangalore) Edition
 * Features 14 distinct wedding halls, convention centres, and royal pavilions across Bangalore.
 * Roughly half of the halls have `modelUrl` assigned to test 3D .glb loading,
 * while the other half have `undefined` to demonstrate the procedural 3D hall generator.
 */
export const DUMMY_HALLS: Hall[] = [
  {
    id: 'hall-1',
    name: 'The Tamarind Tree Heritage Pavilion',
    description: 'An enchanting heritage sanctuary set amidst lush green tamarind groves, antique wooden pavilions, natural stone courtyards, and traditional water bodies. Perfect for ethereal South Indian traditional muhurthams, open-air sangeet nights, and sunset receptions.',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80'
    ],
    address: '88 Avalahalli, Off Kanakapura Main Road',
    area: 'Kanakapura Road',
    city: 'Bengaluru',
    capacityMin: 250,
    capacityMax: 1000,
    pricePerDay: 480000,
    pricePerPlate: 2200,
    rating: 4.92,
    reviewCount: 168,
    amenities: [
      'Air Conditioned Indoor Hall + Courtyard',
      'Valet Parking (250+ cars)',
      'Traditional Antique Bridal Suite',
      'South & North Indian Master Chefs',
      'Acoustic Garden Lighting & Sound',
      'Power Backup (100%)',
      'Vedic Homam / Hawan Permitted',
      'Heritage Guest Suites (10)',
      'Wheelchair Accessible'
    ],
    contactPhone: '+91 98450 11223',
    contactEmail: 'weddings@thetamarindtree.in',
    mapLink: 'https://maps.google.com/?q=The+Tamarind+Tree+Bangalore',
    isAC: true,
    hasParking: true,
    hasRooms: true,
    vegOnly: false,
    featured: true,
    modelUrl: '/models/banquet-a.glb',
    dimensions: { width: 28, length: 50, height: 7.5 },
    tableCount: 36,
    reviews: [
      {
        id: 'r1',
        author: 'Deepika & Gautham',
        rating: 5,
        date: 'February 2026',
        eventType: 'Traditional Muhurtham & Reception',
        comment: 'The natural heritage ambiance of The Tamarind Tree made our wedding magical. The antique pond and mandap looked breathtaking in real life and in our photos!'
      },
      {
        id: 'r2',
        author: 'Karthik Rao',
        rating: 4.9,
        date: 'January 2026',
        eventType: 'Sangeet Evening',
        comment: 'Outstanding acoustics and lighting between the stone trees. Our guests loved the authentic Bangalore garden city feel.'
      }
    ]
  },
  {
    id: 'hall-2',
    name: 'Gayathri Grand at Palace Grounds',
    description: 'One of Bangalore’s most iconic and massive celebration destinations situated inside the royal Palace Grounds. Features vast air-conditioned royal pillarless halls with soaring 9-metre ceilings, majestic gold facades, and dedicated baraat pathways.',
    images: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Gate No. 4, Bellary Road, Sadashivanagar',
    area: 'Palace Grounds',
    city: 'Bengaluru',
    capacityMin: 600,
    capacityMax: 3000,
    pricePerDay: 850000,
    pricePerPlate: 2600,
    rating: 4.88,
    reviewCount: 245,
    amenities: [
      'Pillarless Royal Mega Hall',
      'Valet Parking (1000+ cars)',
      'Dual Deluxe Green Rooms',
      'Multi-cuisine Live Theatres',
      'Concert-grade Sound Rigging',
      'Air Conditioned Throughout',
      'Hawan Allowed in Designated Mandap',
      'Dedicated Royal VIP Lounge'
    ],
    contactPhone: '+91 99001 88442',
    contactEmail: 'events@gayathrigrand.com',
    mapLink: 'https://maps.google.com/?q=Palace+Grounds+Bangalore',
    isAC: true,
    hasParking: true,
    hasRooms: false,
    vegOnly: false,
    featured: true,
    modelUrl: undefined, // Procedural 3D scene
    dimensions: { width: 38, length: 70, height: 9.2 },
    tableCount: 52,
    reviews: [
      {
        id: 'r3',
        author: 'Siddharth & Ananya Hegde',
        rating: 5,
        date: 'January 2026',
        eventType: 'Grand Wedding Reception',
        comment: 'Accommodated 2,200 guests with complete ease. The pillarless view meant everyone could see the stage from any angle.'
      }
    ]
  },
  {
    id: 'hall-3',
    name: 'Templetree Leisure Ballroom',
    description: 'An eco-luxe boutique venue surrounded by monolithic stone arches, open-air courtyards, thatched heritage gazebos, and contemporary air-conditioned indoor banquets. Designed for tasteful intimate celebrations.',
    images: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Varthur Hobli, Near Outer Ring Road, Bellandur',
    area: 'Bellandur',
    city: 'Bengaluru',
    capacityMin: 150,
    capacityMax: 500,
    pricePerDay: 320000,
    pricePerPlate: 2100,
    rating: 4.8,
    reviewCount: 110,
    amenities: [
      'Eco-luxe Architecture with Stone Arches',
      'Central Air Conditioning',
      'Valet Parking (150 cars)',
      'Designer Bridal Suite',
      'Organic & Curated Gourmet Menus',
      'Live Instrumentalists Acoustic Setup',
      'High-Speed Wi-Fi'
    ],
    contactPhone: '+91 98455 77661',
    contactEmail: 'celebrate@templetreeleisure.com',
    mapLink: 'https://maps.google.com/?q=Templetree+Leisure+Bangalore',
    isAC: true,
    hasParking: true,
    hasRooms: false,
    vegOnly: false,
    featured: false,
    modelUrl: '/models/banquet-b.glb',
    dimensions: { width: 20, length: 35, height: 5.5 },
    tableCount: 18,
    reviews: [
      {
        id: 'r4',
        author: 'Varun & Sahana',
        rating: 5,
        date: 'December 2025',
        eventType: 'Wedding & Cocktails',
        comment: 'The stone arches and warm lighting gave our wedding an organic, intimate luxury vibe. Guests from out of town loved the tranquil environment.'
      }
    ]
  },
  {
    id: 'hall-4',
    name: 'MLR Convention Centre JP Nagar',
    description: 'A celebrated contemporary convention landmark designed by award-winning architects. Features world-class acoustic design, banquet halls, landscaped open lawns, and 500-seat auditorium theatre.',
    images: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Brigade Millennium Campus, 7th Phase, JP Nagar',
    area: 'JP Nagar',
    city: 'Bengaluru',
    capacityMin: 300,
    capacityMax: 1200,
    pricePerDay: 420000,
    pricePerPlate: 1950,
    rating: 4.84,
    reviewCount: 192,
    amenities: [
      'Architectural Acoustic Design',
      'Air Conditioned Dining & Main Hall',
      'Valet Parking (350 cars)',
      'Multiple Green Rooms & Dressing Suites',
      'In-house Sound Rigging Included',
      'Guest Rooms (6 Executive Rooms)',
      'Hawan Allowed with Smoke Evacuation'
    ],
    contactPhone: '+91 99801 33221',
    contactEmail: 'bookings@mlr.in',
    mapLink: 'https://maps.google.com/?q=MLR+Convention+Centre+JP+Nagar',
    isAC: true,
    hasParking: true,
    hasRooms: true,
    vegOnly: false,
    featured: true,
    modelUrl: undefined, // Procedural 3D scene
    dimensions: { width: 30, length: 54, height: 7.2 },
    tableCount: 38,
    reviews: [
      {
        id: 'r5',
        author: 'Naveen & Prathiksha',
        rating: 5,
        date: 'January 2026',
        eventType: 'Brahmin Wedding & Reception',
        comment: 'The dining hall flow for the traditional plantain leaf lunch was impeccable. Smooth parking coordination for all 1000 guests.'
      }
    ]
  },
  {
    id: 'hall-5',
    name: 'The Grand Ballroom at The Leela Palace',
    description: 'Inspired by the architectural opulence of the Vijayanagara Empire, featuring gold-leaf embellished domes, hand-woven carpets, bespoke mood lighting, and opulent crystal chandeliers. The pinnacle of 5-star luxury weddings in Bengaluru.',
    images: [
      'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80'
    ],
    address: '23 HAL Old Airport Road, Kodihalli',
    area: 'Old Airport Road',
    city: 'Bengaluru',
    capacityMin: 200,
    capacityMax: 800,
    pricePerDay: 720000,
    pricePerPlate: 3600,
    rating: 4.96,
    reviewCount: 220,
    amenities: [
      'Palatial Vijayanagara Architecture',
      '5-Star Hospitality & Michelin-trained Chefs',
      'Valet Parking (300 cars)',
      'Presidential Bridal Suite',
      'Luxury Accommodation (15 Rooms)',
      'Swarovski Crystal Chandeliers',
      'LED Stage Wall Compatible'
    ],
    contactPhone: '+91 80 2521 1234',
    contactEmail: 'weddings.bangalore@theleela.com',
    mapLink: 'https://maps.google.com/?q=The+Leela+Palace+Bengaluru',
    isAC: true,
    hasParking: true,
    hasRooms: true,
    vegOnly: false,
    featured: true,
    modelUrl: '/models/banquet-a.glb',
    dimensions: { width: 26, length: 48, height: 7.2 },
    tableCount: 32,
    reviews: [
      {
        id: 'r6',
        author: 'Rhea & Aditya Singhal',
        rating: 5,
        date: 'February 2026',
        eventType: 'Luxury Wedding',
        comment: 'Pure royal grandeur! The banquet decor, culinary spread, and personal butler service for the families was beyond extraordinary.'
      }
    ]
  },
  {
    id: 'hall-6',
    name: 'Shubham Convention Hall Jayanagar',
    description: 'A renowned pure-vegetarian traditional convention destination featuring traditional South Indian kalyana mantapa architecture, spacious dining halls with banana-leaf plantain service tables, and dedicated homa / hawan areas.',
    images: [
      'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80'
    ],
    address: '33rd Cross, 11th Main, 4th Block, Jayanagar',
    area: 'Jayanagar',
    city: 'Bengaluru',
    capacityMin: 200,
    capacityMax: 750,
    pricePerDay: 260000,
    pricePerPlate: 1250,
    rating: 4.72,
    reviewCount: 140,
    amenities: [
      '100% Pure Vegetarian & Sattvic Kitchen',
      'Traditional Plantain Leaf Dining Setup',
      'Central Air Conditioning',
      'Valet Parking (150 cars)',
      'Dedicated Homa / Hawan Mandap Chimney',
      'Bridal Dressing Suite with Vanity Mirrors',
      'Guest Rooms (8 Rooms)'
    ],
    contactPhone: '+91 98440 22998',
    contactEmail: 'bookings@shubhamjayanagar.in',
    mapLink: 'https://maps.google.com/?q=Jayanagar+Bangalore',
    isAC: true,
    hasParking: true,
    hasRooms: true,
    vegOnly: true,
    featured: false,
    modelUrl: undefined, // Procedural 3D scene
    dimensions: { width: 24, length: 42, height: 5.8 },
    tableCount: 26,
    reviews: [
      {
        id: 'r7',
        author: 'Suresh Kumar Iyer',
        rating: 5,
        date: 'January 2026',
        eventType: 'Traditional Tamil Muhurtham',
        comment: 'Finding a venue that strictly follows vegetarian guidelines with traditional lunch arrangements in Jayanagar was perfect. Our elders were thrilled.'
      }
    ]
  },
  {
    id: 'hall-7',
    name: 'White Feather Convention Centre',
    description: 'A premier modern convention and wedding arena on Hosur Road known for futuristic architecture, high-power concert rigging, pillarless layout, and dual banqueting halls.',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Opposite Metro Station, Hosur Main Road, Electronic City',
    area: 'Electronic City',
    city: 'Bengaluru',
    capacityMin: 350,
    capacityMax: 1500,
    pricePerDay: 540000,
    pricePerPlate: 2300,
    rating: 4.82,
    reviewCount: 185,
    amenities: [
      'Pillarless Futuristic Architecture',
      'Full Central Air Conditioning',
      'Valet Parking with Guarded Multi-level Lot (400 cars)',
      'Dual Halls for Ceremony & Dining',
      'Deluxe Green Rooms',
      'High-Power Acoustic Concert Audio',
      'Wheelchair Ramps & Elevators'
    ],
    contactPhone: '+91 98860 44332',
    contactEmail: 'events@whitefeather.in',
    mapLink: 'https://maps.google.com/?q=White+Feather+Convention+Centre+Bangalore',
    isAC: true,
    hasParking: true,
    hasRooms: false,
    vegOnly: false,
    featured: true,
    modelUrl: '/models/room-generic.glb',
    dimensions: { width: 32, length: 58, height: 7.8 },
    tableCount: 42,
    reviews: [
      {
        id: 'r8',
        author: 'Prashant & Shruti Nair',
        rating: 5,
        date: 'December 2025',
        eventType: 'Reception & Sangeet',
        comment: 'Convenient location for tech corridor guests. The intelligent lighting and stage setup made our sangeet performances feel like a Bollywood awards show.'
      }
    ]
  },
  {
    id: 'hall-8',
    name: 'Miraya Greens Luxury Banquets',
    description: 'A serene 12-acre luxury resort and banquet campus surrounded by dense greenery, tranquil lotus ponds, open-air amphitheatre, and modern glasshouse banquets for romantic celebrations.',
    images: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Sakshi Nagar, Bannerghatta Main Road',
    area: 'Bannerghatta Road',
    city: 'Bengaluru',
    capacityMin: 200,
    capacityMax: 900,
    pricePerDay: 460000,
    pricePerPlate: 2400,
    rating: 4.86,
    reviewCount: 132,
    amenities: [
      'Glasshouse Banquet + Lawn Amphitheatre',
      'Valet Parking (300 cars)',
      'Lakeside Mandap Platform',
      'Bridal Suite with Private Garden Terrace',
      'Guest Rooms (12 Luxury Cottages)',
      'Hawan Allowed with Fire Marshal Compliance',
      'Customized Lighting Package'
    ],
    contactPhone: '+91 99011 55667',
    contactEmail: 'concierge@mirayagreens.com',
    mapLink: 'https://maps.google.com/?q=Miraya+Greens+Bangalore',
    isAC: true,
    hasParking: true,
    hasRooms: true,
    vegOnly: false,
    featured: false,
    modelUrl: undefined, // Procedural 3D scene
    dimensions: { width: 25, length: 48, height: 6.4 },
    tableCount: 30,
    reviews: [
      {
        id: 'r9',
        author: 'Sneha & Rohan',
        rating: 5,
        date: 'February 2026',
        eventType: 'Eco-Luxury Wedding',
        comment: 'The glasshouse banquet looking over the lotus pond was pure poetry. Our guests appreciated staying in the on-site cottages.'
      }
    ]
  },
  {
    id: 'hall-9',
    name: 'Royal Orchid Resort & Convention Centre',
    description: 'Sprawled over 8 acres of manicured gardens, featuring an imperial air-conditioned ballroom, wooden dance floor, and poolside sangeet lawns near Bengaluru Airport corridor.',
    images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Allalasandra, Bellary Road, Near Jakkur Flying Club',
    area: 'Yelahanka',
    city: 'Bengaluru',
    capacityMin: 250,
    capacityMax: 1100,
    pricePerDay: 520000,
    pricePerPlate: 2500,
    rating: 4.85,
    reviewCount: 164,
    amenities: [
      'Imperial Air Conditioned Ballroom',
      'Valet Parking (400 cars)',
      'Large Wooden Dance Floor',
      'Poolside Cocktail Lawn',
      'Guest Accommodation (45 Resort Rooms)',
      'Bridal Suite with Hair & Makeup Lounge',
      'Liquor License Permitted'
    ],
    contactPhone: '+91 80 2856 0668',
    contactEmail: 'resortevents@royalorchidhotels.com',
    mapLink: 'https://maps.google.com/?q=Royal+Orchid+Resort+Yelahanka+Bangalore',
    isAC: true,
    hasParking: true,
    hasRooms: true,
    vegOnly: false,
    featured: true,
    modelUrl: '/models/banquet-b.glb',
    dimensions: { width: 28, length: 52, height: 7.0 },
    tableCount: 36,
    reviews: [
      {
        id: 'r10',
        author: 'Arvind & Meghana',
        rating: 5,
        date: 'January 2026',
        eventType: 'Wedding & Poolside Sangeet',
        comment: 'Having both the air-conditioned ballroom and the poolside lawn right next to each other gave us the best of both worlds.'
      }
    ]
  },
  {
    id: 'hall-10',
    name: 'Sheesh Mahal at Palace Grounds',
    description: 'A magnificent royal pavilion inside Palace Grounds featuring mirror mosaic walls, carved teak doorways, and an expansive courtyard for lavish Baraat welcomes and grand reception stages.',
    images: [
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Near Mehkri Circle, Jayamahal Road',
    area: 'Palace Grounds',
    city: 'Bengaluru',
    capacityMin: 400,
    capacityMax: 2200,
    pricePerDay: 780000,
    pricePerPlate: 2700,
    rating: 4.89,
    reviewCount: 205,
    amenities: [
      'Ornate Sheesh Mahal Glass Facade',
      'Combined Royal Hall + Courtyard Lawn',
      'Valet Parking (800 cars)',
      'Multiple Royal Green Rooms',
      'Concert-ready Line Array Audio',
      'Baraat Band Welcoming Corridor',
      'Full Generator Backup'
    ],
    contactPhone: '+91 98452 77110',
    contactEmail: 'sheeshmahal@palacegrounds.com',
    mapLink: 'https://maps.google.com/?q=Sheesh+Mahal+Palace+Grounds+Bangalore',
    isAC: true,
    hasParking: true,
    hasRooms: false,
    vegOnly: false,
    featured: true,
    modelUrl: undefined, // Procedural 3D scene
    dimensions: { width: 34, length: 64, height: 8.5 },
    tableCount: 46,
    reviews: [
      {
        id: 'r11',
        author: 'Mahesh & Tanvi Reddy',
        rating: 5,
        date: 'November 2025',
        eventType: 'Reddy Royal Wedding',
        comment: 'Grandeur at its finest! The stage elevation and glasswork reflection under the spotlights looked straight out of a fairy tale.'
      }
    ]
  },
  {
    id: 'hall-11',
    name: 'Clarks Exotica Convention Resort',
    description: 'A luxury 5-star destination wedding haven nestled against the picturesque Nandi Hills backdrop, featuring Grand Ocean Ballroom, banquet terraces, and 140 guest villas.',
    images: [
      'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Swiss Town, Hollywood Town, Devanahalli',
    area: 'Devanahalli',
    city: 'Bengaluru',
    capacityMin: 300,
    capacityMax: 1800,
    pricePerDay: 750000,
    pricePerPlate: 3200,
    rating: 4.93,
    reviewCount: 198,
    amenities: [
      'Destination Resort next to Kempegowda Airport',
      'Valet Parking (500 cars)',
      '140 Luxury Guest Villas for Family Stay',
      'Presidential Bridal Suite',
      'Grand Ocean Pillarless Ballroom',
      'Hawan Allowed with Fire Pit Infrastructure',
      'Spa & Salon for Wedding Guests'
    ],
    contactPhone: '+91 80 7177 7000',
    contactEmail: 'weddings@clarksexotica.com',
    mapLink: 'https://maps.google.com/?q=Clarks+Exotica+Bangalore',
    isAC: true,
    hasParking: true,
    hasRooms: true,
    vegOnly: false,
    featured: true,
    modelUrl: '/models/banquet-a.glb',
    dimensions: { width: 30, length: 60, height: 8.0 },
    tableCount: 44,
    reviews: [
      {
        id: 'r12',
        author: 'Vinay & Divya Rao',
        rating: 5,
        date: 'December 2025',
        eventType: '3-Day Destination Wedding',
        comment: 'Since all our NRI family arrived at Kempegowda Airport, Clarks Exotica was the ideal destination. The villas and grand ballroom exceeded all expectations.'
      }
    ]
  },
  {
    id: 'hall-12',
    name: 'Amara Convention Centre',
    description: 'A contemporary banquet landmark featuring high ceilings, warm acoustic wooden panelling, centralized climate control, and separate dining and mandap levels along Kanakapura Road.',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Near Metro Cash & Carry, Kanakapura Road, Konanakunte',
    area: 'Kanakapura Road',
    city: 'Bengaluru',
    capacityMin: 200,
    capacityMax: 850,
    pricePerDay: 350000,
    pricePerPlate: 1650,
    rating: 4.76,
    reviewCount: 115,
    amenities: [
      'Multi-tier Banquet Setup (Mandap + Dining)',
      'Valet Parking (250 cars)',
      '100% Central Air Conditioning',
      'Pure Veg and Multi-cuisine Menus',
      'Deluxe Bridal Lounge',
      'Dedicated Metro Access Corridor',
      'Full Power Backup'
    ],
    contactPhone: '+91 98453 66778',
    contactEmail: 'events@amaraconvention.in',
    mapLink: 'https://maps.google.com/?q=Amara+Convention+Centre+Bangalore',
    isAC: true,
    hasParking: true,
    hasRooms: true,
    vegOnly: false,
    featured: false,
    modelUrl: undefined, // Procedural 3D scene
    dimensions: { width: 25, length: 46, height: 6.5 },
    tableCount: 28,
    reviews: [
      {
        id: 'r13',
        author: 'Sanjay & Keerthi',
        rating: 4.8,
        date: 'November 2025',
        eventType: 'Sangeet & Muhurtham',
        comment: 'Super easy access for our guests coming via the Green Line Metro. Split level layout meant dining was peaceful and clean.'
      }
    ]
  },
  {
    id: 'hall-13',
    name: 'Sankey Grand Ballroom at ITC Windsor',
    description: 'Regal British-colonial manor architecture featuring fluted white pillars, Georgian woodwork, sparkling chandelier suites, and curated royal Awadhi and Dakshin menus.',
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
    ],
    address: '25 Windsor Square, Golf Course Road',
    area: 'Sankey Road',
    city: 'Bengaluru',
    capacityMin: 150,
    capacityMax: 500,
    pricePerDay: 580000,
    pricePerPlate: 3400,
    rating: 4.91,
    reviewCount: 172,
    amenities: [
      'Victorian & Regency Colonial Grandeur',
      '5-Star Luxury Accommodations (12 Rooms)',
      'Valet Parking (200 cars)',
      'Dakshin & Awadhi Royal Master Chefs',
      'Bridal Dressing Suite',
      'Air Conditioning with Climate Filtration',
      'Live Classical Shehnai / Carnatic Setup'
    ],
    contactPhone: '+91 80 2226 9898',
    contactEmail: 'itcwindsor.events@itchotels.in',
    mapLink: 'https://maps.google.com/?q=ITC+Windsor+Bangalore',
    isAC: true,
    hasParking: true,
    hasRooms: true,
    vegOnly: false,
    featured: false,
    modelUrl: '/models/room-generic.glb',
    dimensions: { width: 22, length: 38, height: 6.0 },
    tableCount: 22,
    reviews: [
      {
        id: 'r14',
        author: 'Arun & Radhika Swamy',
        rating: 5,
        date: 'January 2026',
        eventType: 'Classic Heritage Wedding',
        comment: 'ITC Windsor delivered unmatched timeless elegance. The Dakshin food counters received endless compliments from all our relatives.'
      }
    ]
  },
  {
    id: 'hall-14',
    name: 'The Groves Convention Hall & Lawns',
    description: 'An expansive tech-corridor wedding complex in Whitefield offering modular acoustic walls, intelligent concert lighting, wide mandap staging, and multi-cuisine live catering.',
    images: [
      'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'ITPL Main Road, Near Hope Farm Junction, Whitefield',
    area: 'Whitefield',
    city: 'Bengaluru',
    capacityMin: 250,
    capacityMax: 1000,
    pricePerDay: 440000,
    pricePerPlate: 2000,
    rating: 4.78,
    reviewCount: 148,
    amenities: [
      'Modular Partitioned AC Banquet',
      'Valet Parking (300 cars)',
      'Large Wooden Sangeet Dance Floor',
      'Deluxe Family Changing Rooms',
      'Concert-grade Lighting Truss Rig',
      'Hawan Compliant with Smoke Chimney',
      'Wheelchair Accessible'
    ],
    contactPhone: '+91 98800 11995',
    contactEmail: 'weddings@thegroveswhitefield.com',
    mapLink: 'https://maps.google.com/?q=Whitefield+Bangalore',
    isAC: true,
    hasParking: true,
    hasRooms: false,
    vegOnly: false,
    featured: false,
    modelUrl: undefined, // Procedural 3D scene
    dimensions: { width: 28, length: 50, height: 7.0 },
    tableCount: 36,
    reviews: [
      {
        id: 'r15',
        author: 'Chethan & Nidhi',
        rating: 5,
        date: 'January 2026',
        eventType: 'Reception & Sangeet',
        comment: 'Convenient location in Whitefield with great parking. The hall looked grand and modern!'
      }
    ]
  }
];

export const POPULAR_AREAS = [
  'All Areas',
  'Palace Grounds',
  'Kanakapura Road',
  'JP Nagar',
  'Whitefield',
  'Yelahanka',
  'Electronic City',
  'Jayanagar',
  'Devanahalli',
  'Bellandur',
  'Old Airport Road',
  'Bannerghatta Road',
  'Sankey Road'
];
