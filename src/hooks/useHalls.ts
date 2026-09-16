import { useQuery } from '@tanstack/react-query';
import { getAllHalls } from '../services/hallService';
import { HallFilters, Hall } from '../types/hall';

/**
 * Custom hook to fetch halls with caching and filter reactivity
 */
export function useHalls(filters?: HallFilters) {
  return useQuery<Hall[], Error>({
    queryKey: ['halls', filters],
    queryFn: () => getAllHalls(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
  });
}

