import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useHalls } from '../hooks/useHalls';
import { HallFilters } from '../types/hall';
import { HallCard } from '../components/halls/HallCard';
import { HallFiltersComponent } from '../components/halls/HallFilters';
import { HallCardSkeleton } from '../components/common/Skeleton';
import {
  SlidersHorizontal,
  X,
  SearchX,
  ArrowUpDown,
  Building2
} from 'lucide-react';

export const ListingsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Initialize filters from URL parameters
  const initialFilters: HallFilters = useMemo(() => {
    return {
      search: searchParams.get('search') || undefined,
      area: searchParams.get('area') || undefined,
      minCapacity: searchParams.get('minCapacity') ? Number(searchParams.get('minCapacity')) : undefined,
      maxPricePerDay: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      vegOnly: searchParams.get('vegOnly') === 'true' ? true : undefined,
      hasRooms: searchParams.get('hasRooms') === 'true' ? true : undefined,
      sortBy: (searchParams.get('sortBy') as any) || 'rating-desc',
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<HallFilters>(initialFilters);

  // Keep state in sync with URL search params
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Query service via TanStack Query hook
  const { data: halls = [], isLoading, isFetching } = useHalls(filters);

  // Update filters and sync to URL
  const handleFiltersChange = (newFilters: HallFilters) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.area && newFilters.area !== 'All Areas') params.set('area', newFilters.area);
    if (newFilters.minCapacity) params.set('minCapacity', String(newFilters.minCapacity));
    if (newFilters.maxPricePerDay) params.set('maxPrice', String(newFilters.maxPricePerDay));
    if (newFilters.vegOnly) params.set('vegOnly', 'true');
    if (newFilters.hasRooms) params.set('hasRooms', 'true');
    if (newFilters.sortBy) params.set('sortBy', newFilters.sortBy);

    setSearchParams(params);
  };

  const handleResetFilters = () => {
    const empty: HallFilters = {
      sortBy: 'rating-desc',
    };
    setFilters(empty);
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Listings Page Title & Description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-900 border border-brand-200/60 mb-2">
            <Building2 className="w-3.5 h-3.5 text-brand-800" />
            Bengaluru (Bangalore) Wedding Venues
          </div>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-stone-900">
            Marriage Halls & Banquets Directory
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Compare guest capacities, rental fees, and floor specs. Click "View in 3D" to launch an interactive spatial walkthrough.
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-brand-900 text-white font-semibold text-xs shadow-md"
          >
            <SlidersHorizontal className="w-4 h-4 text-gold-300" />
            <span>Filter Venues</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <HallFiltersComponent
            filters={filters}
            onChange={handleFiltersChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Listings Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort & Count Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs sm:text-sm font-semibold text-stone-700">
              Showing{' '}
              <span className="font-serif font-bold text-brand-950 text-base">
                {isLoading ? '...' : halls.length}
              </span>{' '}
              {halls.length === 1 ? 'venue' : 'venues'} found
              {isFetching && !isLoading && (
                <span className="ml-2 text-xs text-stone-600 italic animate-pulse">
                  (updating...)
                </span>
              )}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-stone-600" />
              <label htmlFor="sort-select" className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Sort By:
              </label>
              <select
                id="sort-select"
                value={filters.sortBy || 'rating-desc'}
                onChange={(e) =>
                  handleFiltersChange({ ...filters, sortBy: e.target.value as any })
                }
                aria-label="Sort venues"
                className="text-xs font-semibold bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
              >
                <option value="rating-desc">Highest Rated (★ 5.0)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="capacity-desc">Largest Capacity</option>
              </select>
            </div>
          </div>

          {/* Skeletons while loading */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <HallCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && halls.length === 0 && (
            <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-stone-200/90 shadow-wedding space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-900 flex items-center justify-center mx-auto border border-brand-200">
                <SearchX className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900">
                No Matching Venues Found
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                We couldn’t find any marriage halls matching your selected criteria. Try loosening your filters or resetting to see all available banquets.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-brand-900 hover:bg-brand-950 text-white font-semibold text-xs shadow-md transition"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}

          {/* Cards Grid */}
          {!isLoading && halls.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {halls.map((hall) => (
                <HallCard key={hall.id} hall={hall} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-over Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto z-10 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-serif font-bold text-lg text-stone-900">Filter Banquets</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <HallFiltersComponent
              filters={filters}
              onChange={handleFiltersChange}
              onReset={handleResetFilters}
            />

            <div className="pt-4 border-t border-stone-200">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-brand-900 text-white font-bold text-sm shadow-md"
              >
                Apply Filters & View Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
