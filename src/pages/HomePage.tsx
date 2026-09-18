import React from 'react';
import { HeroSearch } from '../components/home/HeroSearch';
import { StatsStrip } from '../components/home/StatsStrip';
import { QuickFilterChips } from '../components/home/QuickFilterChips';
import { FeaturedCarousel } from '../components/home/FeaturedCarousel';
import { useHalls } from '../hooks/useHalls';
import {
  Camera,
  ShieldCheck,
  ArrowRight,
  Heart,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const { data: halls = [], isLoading } = useHalls();

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Hero with Search */}
      <HeroSearch />

      {/* 2. Stats Strip */}
      <StatsStrip />

      {/* 3. Quick Area & Preference Chips */}
      <QuickFilterChips />

      {/* 4. Featured Venues Showcase */}
      {!isLoading && halls.length > 0 && <FeaturedCarousel halls={halls} />}

      {/* 5. Why Choose ShaadiSpots Feature Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-brand-950 via-stone-900 to-brand-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-wedding-lg border border-gold-500/30 relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold tracking-wide border border-gold-400/30">
              <Camera className="w-4 h-4 text-gold-400" />
              <span>Verified Wedding Venue Directory</span>
            </div>
            <h2 className="font-serif font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-cream-100">
              Never Book A Marriage Hall{' '}
              <span className="text-gold-300">Blindly Again</span>
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Misleading promotional brochures and hidden costs can ruin wedding planning. ShaadiSpots aggregates authentic Google Places data, genuine host reviews, high-definition photo galleries, and transparent pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 relative z-10">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gold-500/20 text-gold-300 flex items-center justify-center border border-gold-500/30">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-white">
                Real Photo Galleries
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Inspect genuine photos uploaded by guests and hosts — check mandap decoration, dining hall cleanliness, and evening lighting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-rose-300 flex items-center justify-center border border-rose-500/30">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-white">
                Verified Google Reviews
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Read unfiltered feedback from families who conducted Muhurtham and Sangeet ceremonies at each hall in Bengaluru.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-white">
                Direct Management Rates
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Zero middleman commissions. Connect directly with banquet managers, inspect open dates, and negotiate genuine seasonal packages.
              </p>
            </div>
          </div>

          <div className="mt-10 relative z-10 flex flex-wrap gap-4">
            <Link
              to="/halls"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-stone-950 font-bold text-sm shadow-gold-glow transition-all"
            >
              <span>Explore All 250+ Venues</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition"
            >
              How ShaadiSpots Works
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-900 border border-brand-200/60 mb-2">
            <Heart className="w-3.5 h-3.5 text-brand-800" />
            Celebration Stories
          </div>
          <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900">
            Loved By Couples & Families
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Read how couples used ShaadiSpots to find their ideal banquet hall across Bengaluru.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote:
                'We live in London and had to plan our wedding in Bengaluru. Having real Google reviews and genuine photo galleries allowed us to shortlist and book with complete confidence!',
              author: 'Dr. Priya & Kunal',
              event: 'Wedding at Palace Grounds',
            },
            {
              quote:
                'Checking the verified guest counts and parking capacities saved us from a chaotic seating crunch. The direct manager contact was super helpful.',
              author: 'Rohit & Megha Kapoor',
              event: 'Reception in JP Nagar',
            },
            {
              quote:
                'Being able to filter by pure veg, guest rooms, and AC made venue hunting fast and stress-free. ShaadiSpots made finding a Kalyana Mantapa genuinely fun.',
              author: 'Simran & Harpreet',
              event: 'Anand Karaj in Yelahanka',
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-wedding space-y-4 flex flex-col justify-between"
            >
              <p className="text-stone-600 text-xs sm:text-sm italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="pt-3 border-t border-stone-100">
                <span className="font-serif font-bold text-stone-900 text-sm block">
                  {t.author}
                </span>
                <span className="text-[11px] text-brand-800 font-medium">{t.event}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
