import React from 'react';
import { Building2, HeartHandshake, Star, Compass } from 'lucide-react';

export const StatsStrip: React.FC = () => {
  const stats = [
    {
      icon: Building2,
      value: '120+',
      label: 'Verified Venues',
      sub: 'Top banquets & palaces',
    },
    {
      icon: Compass,
      value: '100%',
      label: '3D Virtual Previews',
      sub: 'Accurate spatial walkthroughs',
    },
    {
      icon: HeartHandshake,
      value: '15,000+',
      label: 'Happy Couples',
      sub: 'Weddings & Sangeet hosted',
    },
    {
      icon: Star,
      value: '4.9 ★',
      label: 'Average Host Rating',
      sub: 'From genuine verified reviews',
    },
  ];

  return (
    <div className="bg-white border-y border-stone-200/80 shadow-sm py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center space-y-1 sm:space-y-1.5"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center mb-1 border border-brand-200/60 shadow-xs">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-800" />
                </div>
                <span className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900 tracking-tight">
                  {item.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-800">
                  {item.label}
                </span>
                <span className="text-[11px] text-stone-600 hidden sm:block">
                  {item.sub}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

