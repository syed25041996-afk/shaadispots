/**
 * Hall Data Models and Types for ShaadiSpots
 */

export interface HallDimensions {
  width: number;  // Hall width in metres
  length: number; // Hall length in metres
  height: number; // Ceiling height in metres
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  eventType?: string;
}

export interface Hall {
  id: string;
  name: string;
  description: string;
  images: string[];
  address: string;
  area: string;
  city: string;
  capacityMin: number;
  capacityMax: number;
  pricePerDay: number;
  pricePerPlate: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  contactPhone: string;
  contactEmail: string;
  mapLink: string;
  isAC: boolean;
  hasParking: boolean;
  hasRooms: boolean;
  vegOnly: boolean;
  featured: boolean;
  
  // 3D Viewer metadata
  modelUrl?: string;            // URL to .glb / .gltf file (optional)
  dimensions: HallDimensions;  // In metres
  tableCount: number;           // Number of banquet tables for procedural scene

  // Detailed reviews list
  reviews?: Review[];
}

export interface EnquiryPayload {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  guestCount: number;
  message?: string;
}

export interface HallFilters {
  search?: string;
  area?: string;
  minCapacity?: number;
  maxCapacity?: number;
  maxPricePerDay?: number;
  maxPricePerPlate?: number;
  amenities?: string[];
  vegOnly?: boolean;
  isAC?: boolean;
  hasParking?: boolean;
  hasRooms?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'rating-desc' | 'capacity-desc';
}

