/**
 * Hall Data Models and Types for ShaadiSpots
 */

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  eventType?: string;
  avatarUrl?: string;
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
  website?: string;
  mapLink: string;
  lat?: number;
  lng?: number;
  isAC: boolean;
  hasParking: boolean;
  hasRooms: boolean;
  vegOnly: boolean;
  featured: boolean;

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
