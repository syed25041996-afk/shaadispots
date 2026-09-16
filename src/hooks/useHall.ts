import { useQuery } from '@tanstack/react-query';
import { getHallById } from '../services/hallService';
import { Hall } from '../types/hall';

/**
 * Custom hook to fetch a single hall by ID
 */
export function useHall(id?: string) {
  return useQuery<Hall | null, Error>({
    queryKey: ['hall', id],
    queryFn: () => (id ? getHallById(id) : Promise.resolve(null)),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 10, // 10 minutes fresh
  });
}

