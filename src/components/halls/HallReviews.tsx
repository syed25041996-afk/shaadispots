import React from 'react';
import { Hall } from '../../types/hall';
import { Star, MapPin, ExternalLink, CheckCircle } from 'lucide-react';

interface HallReviewsProps {
  hall: Hall;
}

export const HallReviews: React.FC<HallReviewsProps> = ({ hall }) => {
  const reviews = hall.reviews || [];

  return (
    <div className="space-y-8">
      {/* 1. Ratings & Reviews Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-wedding space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <h3 className="font-serif font-bold text-xl text-stone-900">
            Reviews & Couple Experiences
          </h3>
          <span className="text-xs font-semibold text-stone-500">
            {hall.reviewCount} Verified Reviews
          </span>
        </div>

        {/* Rating Breakdown Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-5 rounded-2xl bg-cream-50 border border-gold-300/40">
          {/* Overall Score */}
          <div className="flex flex-col items-center justify-center text-center md:border-r border-stone-200/80 pr-4">
            <span className="font-serif font-bold text-4xl text-brand-950">{hall.rating}</span>
            <div className="flex items-center gap-1 my-1.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(hall.rating) ? 'fill-amber-400' : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-stone-500">Based on {hall.reviewCount} reviews</span>
          </div>

          {/* Rating Progress Bars */}
          <div className="md:col-span-2 space-y-2">
            {[
              { stars: '5 Stars', pct: '88%' },
              { stars: '4 Stars', pct: '10%' },
              { stars: '3 Stars', pct: '2%' },
              { stars: '2 Stars', pct: '0%' },
              { stars: '1 Star', pct: '0%' },
            ].map((bar, i) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <span className="w-14 text-stone-600 font-medium">{bar.stars}</span>
                <div className="flex-1 h-2 rounded-full bg-stone-200 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-500 to-amber-500 rounded-full"
                    style={{ width: bar.pct }}
                  />
                </div>
                <span className="w-8 text-stone-400 text-right">{bar.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4 pt-2">
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/60 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-900 text-white font-bold text-xs flex items-center justify-center">
                      {rev.author[0]}
                    </div>
                    <div>
                      <span className="font-semibold text-stone-900 text-sm block">
                        {rev.author}
                      </span>
                      {rev.eventType && (
                        <span className="text-[11px] text-brand-800 font-medium">
                          {rev.eventType}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-400">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(rev.rating) ? 'fill-amber-400' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span>• {rev.date}</span>
                  </div>
                </div>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  "{rev.comment}"
                </p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium pt-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Wedding Host</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-stone-500 text-xs italic">
              No written reviews yet for this venue. Be the first couple to share your wedding experience!
            </p>
          )}
        </div>
      </div>

      {/* 2. Embedded Map Placeholder */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-wedding space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Location & Directions
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">{hall.address}, {hall.city}</p>
          </div>
          <a
            href={hall.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-gold-300 hover:text-white transition shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
        </div>

        {/* Map Visual Container */}
        <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 flex items-center justify-center group">
          {/* Simulated Map Background Styling */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="z-10 flex flex-col items-center text-center p-6 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200/80 shadow-wedding max-w-sm">
            <div className="w-12 h-12 rounded-full bg-brand-900 text-gold-300 flex items-center justify-center mb-3 shadow-md">
              <MapPin className="w-6 h-6 animate-bounce" />
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-base">{hall.name}</h4>
            <p className="text-xs text-stone-500 mt-1">{hall.address}</p>
            <p className="text-xs font-semibold text-brand-800 mt-2">
              Near prominent metro and expressway corridors
            </p>
            <a
              href={hall.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-4 py-2 rounded-xl bg-brand-900 text-white text-xs font-semibold hover:bg-brand-950 transition"
            >
              Get Turn-by-Turn Driving Directions &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
