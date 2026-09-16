import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Leaf, Bed, Compass } from 'lucide-react';

export const QuickFilterChips: React.FC = () => {
  const navigate = useNavigate();

  const chips = [
    { label: 'All Venues', icon: Compass, query: '' },
    { label: 'Palace Grounds', icon: MapPin, query: 'area=Palace+Grounds' },
    { label: 'Kanakapura Road', icon: MapPin, query: 'area=Kanakapura+Road' },
    { label: 'JP Nagar', icon: MapPin, query: 'area=JP+Nagar' },
    { label: 'Whitefield', icon: MapPin, query: 'area=Whitefield' },
    { label: 'Yelahanka', icon: MapPin, query: 'area=Yelahanka' },
    { label: 'Pure Veg Only', icon: Leaf, query: 'vegOnly=true' },
    { label: 'With Guest Rooms', icon: Bed, query: 'hasRooms=true' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-600 shrink-0">
          Quick Filters:
        </span>
        {chips.map((chip, idx) => {
          const Icon = chip.icon;
          return (
            <button
              key={idx}
              onClick={() => navigate(chip.query ? `/halls?${chip.query}` : '/halls')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white hover:bg-brand-50 hover:text-brand-900 text-stone-700 border border-stone-200/90 shadow-sm transition-all duration-200 shrink-0 hover:border-brand-300"
            >
              <Icon className="w-3.5 h-3.5 text-brand-800" />
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
