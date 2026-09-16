import React from 'react';
import { HallFilters } from '../../types/hall';
import { POPULAR_AREAS } from '../../data/halls';
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  Users,
  IndianRupee,
  Leaf
} from 'lucide-react';

interface HallFiltersComponentProps {
  filters: HallFilters;
  onChange: (newFilters: HallFilters) => void;
  onReset: () => void;
}

const COMMON_AMENITIES = [
  'Air Conditioned',
  'Valet Parking',
  'Bridal Dressing Suite',
  'In-house Master Chefs',
  'Hawan Allowed',
  'Power Backup',
  'Concert Sound & Intelligent Lighting',
  'Rooms Available',
];

export const HallFiltersComponent: React.FC<HallFiltersComponentProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  const handleTextChange = (field: keyof HallFilters, val: any) => {
    onChange({ ...filters, [field]: val });
  };

  const handleAmenityToggle = (amenity: string) => {
    const current = filters.amenities || [];
    const exists = current.includes(amenity);
    const updated = exists
      ? current.filter((item) => item !== amenity)
      : [...current, amenity];
    onChange({ ...filters, amenities: updated });
  };

  return (
    <aside className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-wedding space-y-6">
      {/* Filters Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
          <SlidersHorizontal className="w-5 h-5 text-brand-900" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-brand-900 transition-colors"
          title="Reset all search filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Keyword Search */}
      <div className="space-y-1.5">
        <label htmlFor="search-input" className="text-xs font-bold uppercase tracking-wider text-stone-600">
          Search Venue
        </label>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            id="search-input"
            type="text"
            placeholder="Search by name, area, vibe..."
            value={filters.search || ''}
            onChange={(e) => handleTextChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/30 focus:border-brand-700 transition"
          />
        </div>
      </div>

      {/* 2. Area Dropdown */}
      <div className="space-y-1.5">
        <label htmlFor="area-select" className="text-xs font-bold uppercase tracking-wider text-stone-600">
          Locality / Area
        </label>
        <div className="relative">
          <select
            id="area-select"
            value={filters.area || 'All Areas'}
            onChange={(e) => handleTextChange('area', e.target.value)}
            className="w-full appearance-none pl-3.5 pr-10 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/30 focus:border-brand-700 transition text-stone-800"
          >
            {POPULAR_AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
        </div>
      </div>

      {/* 3. Capacity Range Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-stone-500" /> Guest Capacity
          </span>
          <span className="font-bold text-brand-950">
            {filters.minCapacity || 100}+ guests
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="2500"
          step="50"
          value={filters.minCapacity || 100}
          onChange={(e) => handleTextChange('minCapacity', Number(e.target.value))}
          className="w-full accent-brand-800 h-2 bg-stone-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-stone-600">
          <span>100</span>
          <span>1,200</span>
          <span>2,500+</span>
        </div>
      </div>

      {/* 4. Max Price Per Day */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1">
            <IndianRupee className="w-3.5 h-3.5 text-stone-500" /> Max Rental / Day
          </span>
          <span className="font-bold text-brand-950">
            {filters.maxPricePerDay
              ? `₹${(filters.maxPricePerDay / 100000).toFixed(1)} Lakh`
              : 'Any Price'}
          </span>
        </div>
        <input
          type="range"
          min="200000"
          max="1000000"
          step="50000"
          value={filters.maxPricePerDay || 1000000}
          onChange={(e) => {
            const val = Number(e.target.value);
            handleTextChange('maxPricePerDay', val === 1000000 ? undefined : val);
          }}
          className="w-full accent-gold-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-stone-600">
          <span>₹2 Lakh</span>
          <span>₹6 Lakh</span>
          <span>₹10 Lakh</span>
        </div>
      </div>

      {/* 5. Special Toggles */}
      <div className="space-y-3 pt-2 border-t border-stone-100">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
          Venue Preferences
        </label>

        {/* Veg Only Toggle */}
        <label className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50/50 border border-stone-200/80 cursor-pointer transition">
          <span className="flex items-center gap-2 text-xs font-medium text-stone-800">
            <Leaf className="w-4 h-4 text-emerald-600" />
            Pure Veg Only
          </span>
          <input
            type="checkbox"
            checked={Boolean(filters.vegOnly)}
            onChange={(e) => handleTextChange('vegOnly', e.target.checked ? true : undefined)}
            className="w-4 h-4 accent-emerald-700 rounded text-emerald-700 cursor-pointer"
          />
        </label>

        {/* Guest Rooms Toggle */}
        <label className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-brand-50/50 border border-stone-200/80 cursor-pointer transition">
          <span className="text-xs font-medium text-stone-800">
            Has Rooms for Guests
          </span>
          <input
            type="checkbox"
            checked={Boolean(filters.hasRooms)}
            onChange={(e) => handleTextChange('hasRooms', e.target.checked ? true : undefined)}
            className="w-4 h-4 accent-brand-800 rounded text-brand-800 cursor-pointer"
          />
        </label>
      </div>

      {/* 6. Amenities Checkboxes */}
      <div className="space-y-2.5 pt-2 border-t border-stone-100">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
          Amenities
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {COMMON_AMENITIES.map((amenity) => {
            const isChecked = filters.amenities?.includes(amenity) || false;
            return (
              <label
                key={amenity}
                className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer hover:text-stone-900 select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="w-4 h-4 accent-brand-800 rounded border-stone-300 cursor-pointer"
                />
                <span>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
