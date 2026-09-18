import { Hall, HallFilters, EnquiryPayload } from '../types/hall';
import { ALL_HALLS } from '../data/halls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ENQUIRIES_STORAGE_KEY = '@shaadispots_enquiries';

/**
 * Service Layer for fetching halls and managing enquiries on mobile.
 */
export const hallService = {
  /**
   * Fetch all halls with client-side filtering and sorting.
   */
  async getAllHalls(filters?: HallFilters): Promise<Hall[]> {
    // Simulated realistic mobile network latency
    await new Promise((resolve) => setTimeout(resolve, 200));

    let results = [...ALL_HALLS];

    if (!filters) return results;

    // Search query
    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      results = results.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.area.toLowerCase().includes(q) ||
          h.description.toLowerCase().includes(q) ||
          h.amenities.some((a) => a.toLowerCase().includes(q))
      );
    }

    // Locality area
    if (filters.area && filters.area !== 'All Areas') {
      results = results.filter((h) => h.area.toLowerCase() === filters.area!.toLowerCase());
    }

    // Min capacity
    if (filters.minCapacity !== undefined && filters.minCapacity > 0) {
      results = results.filter((h) => h.capacityMax >= filters.minCapacity!);
    }

    // Max capacity
    if (filters.maxCapacity !== undefined && filters.maxCapacity > 0) {
      results = results.filter((h) => h.capacityMin <= filters.maxCapacity!);
    }

    // Max price per day
    if (filters.maxPricePerDay !== undefined && filters.maxPricePerDay > 0) {
      results = results.filter((h) => h.pricePerDay <= filters.maxPricePerDay!);
    }

    // Max price per plate
    if (filters.maxPricePerPlate !== undefined && filters.maxPricePerPlate > 0) {
      results = results.filter((h) => h.pricePerPlate <= filters.maxPricePerPlate!);
    }

    // Veg Only
    if (filters.vegOnly) {
      results = results.filter((h) => h.vegOnly);
    }

    // AC
    if (filters.isAC) {
      results = results.filter((h) => h.isAC);
    }

    // Parking
    if (filters.hasParking) {
      results = results.filter((h) => h.hasParking);
    }

    // Rooms
    if (filters.hasRooms) {
      results = results.filter((h) => h.hasRooms);
    }

    // Amenities list filter
    if (filters.amenities && filters.amenities.length > 0) {
      results = results.filter((h) =>
        filters.amenities!.every((reqAmenity) =>
          h.amenities.some((a) => a.toLowerCase().includes(reqAmenity.toLowerCase()))
        )
      );
    }

    // Sorting
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
  },

  /**
   * Fetch single hall by its ID.
   */
  async getHallById(id: string): Promise<Hall | null> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const hall = ALL_HALLS.find((h) => h.id === id);
    return hall || null;
  },

  /**
   * Submit enquiry and persist to AsyncStorage.
   */
  async createEnquiry(payload: EnquiryPayload): Promise<{ success: boolean; id: string }> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const newEnquiry: EnquiryPayload = {
      ...payload,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Confirmed',
    };

    try {
      const existing = await this.getEnquiries();
      const updated = [newEnquiry, ...existing];
      await AsyncStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to persist enquiry to storage:', err);
    }

    return { success: true, id: newEnquiry.id! };
  },

  /**
   * Get all submitted enquiries from storage.
   */
  async getEnquiries(): Promise<EnquiryPayload[]> {
    try {
      const raw = await AsyncStorage.getItem(ENQUIRIES_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn('Failed to read enquiries from storage:', err);
    }
    return [];
  },
};

