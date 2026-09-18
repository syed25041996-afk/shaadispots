import React from 'react';
import { Sparkles, Camera, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 text-brand-900 border border-brand-200/80 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          The ShaadiSpots Story
        </div>
        <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-stone-900 tracking-tight">
          Reimagining How Families Discover{' '}
          <span className="text-brand-900">Wedding Venues</span>
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Planning a wedding is one of life’s most joyful milestones — yet visiting dozens of banquets across traffic-heavy Bengaluru with misleading promotional photos was exhausting. We built ShaadiSpots to change that forever.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-wedding space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center border border-brand-200">
            <Camera className="w-6 h-6 text-brand-800" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-stone-900">
            Real Photos & Google Verified Reviews
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Every venue listed on ShaadiSpots is enriched with authentic Google Places data, genuine reviews from real couples who celebrated there, transparent capacity metrics, and multi-angle high-resolution photo galleries.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-wedding space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-50 text-gold-900 flex items-center justify-center border border-gold-300">
            <ShieldCheck className="w-6 h-6 text-gold-700" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-stone-900">
            Zero Commission & Direct Access
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            We don’t add middleman surcharges. Families connect directly with the general managers of royal palaces, kalyana mantapas, and convention centres, unlocking true seasonal discounts, tasting sessions, and transparent contract terms.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-gradient-to-br from-brand-950 to-stone-900 text-white rounded-3xl p-8 sm:p-12 border border-gold-500/30 shadow-wedding-lg">
        <div className="max-w-2xl mb-8 space-y-2">
          <span className="text-gold-400 font-bold text-xs uppercase tracking-wider">
            Our Commitments
          </span>
          <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-cream-100">
            Built For Indian Weddings At Scale
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-stone-300 text-xs sm:text-sm">
          <div className="space-y-2">
            <span className="text-gold-400 font-bold text-base block font-serif">
              250+ Verified Venues
            </span>
            <p className="leading-relaxed">
              Covering every corner of Bengaluru: from Palace Grounds and Whitefield to JP Nagar and Yelahanka.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-gold-400 font-bold text-base block font-serif">
              Genuine Experiences
            </span>
            <p className="leading-relaxed">
              Unbiased reviews and ratings to help you pick the right banquet for intimate or grand gatherings.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-gold-400 font-bold text-base block font-serif">
              Dedicated Concierge
            </span>
            <p className="leading-relaxed">
              Our wedding venue specialists help coordinate dates, arrange site visits, and answer queries free of charge.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center space-y-6 pt-4">
        <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
          Ready to discover your dream wedding hall?
        </h3>
        <Link
          to="/halls"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-900 hover:bg-brand-950 text-white font-bold text-sm shadow-wedding transition-transform hover:scale-105"
        >
          <span>Browse All 250+ Venues</span>
        </Link>
      </div>
    </div>
  );
};
