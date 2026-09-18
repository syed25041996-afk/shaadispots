import React, { useRef } from 'react';
import { Hall } from '../../types/hall';
import { HallCard } from '../halls/HallCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedCarouselProps {
  halls: Hall[];
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ halls }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const featuredHalls = halls.filter((h) => h.featured);

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-100 text-gold-900 border border-gold-300/80 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-700" />
              Handpicked Luxury
            </div>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-stone-900">
              Featured Wedding Venues
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-xl">
              Premier banquets, kalyana mantapas, and royal palaces verified with high-resolution photo galleries and real guest reviews.
            </p>
          </div>

          {/* Carousel Arrows & View All */}
          <div className="flex items-center gap-3">
            <Link
              to="/halls"
              className="text-xs sm:text-sm font-bold text-brand-900 hover:text-brand-950 underline mr-2"
            >
              View all venues &rarr;
            </Link>
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 shadow-sm transition"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 shadow-sm transition"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
        >
          {featuredHalls.map((hall) => (
            <div
              key={hall.id}
              className="w-[320px] sm:w-[380px] flex-shrink-0 snap-start"
            >
              <HallCard hall={hall} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
