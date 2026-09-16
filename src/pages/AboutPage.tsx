import React from 'react';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';
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
          Planning a wedding is one of life’s most joyful milestones — yet scouting dozen banquets across traffic-heavy cities with misleading 2D photos was exhausting. We built ShaadiSpots to change that forever.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-wedding space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center border border-brand-200">
            <Compass className="w-6 h-6 text-brand-800" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-stone-900">
            The 3D Digital Twin Philosophy
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Every venue listed on ShaadiSpots is mapped with true-to-scale spatial measurements. Whether rendering from low-poly Draco GLB scans or procedural hall simulations based on hall width, length, and ceiling height, families can inspect table densities and stage elevations without stepping foot outside their homes.
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
            We don’t add middleman surcharges. Families connect directly with the general managers of royal palaces and convention centres, unlocking true seasonal discounts, tasting sessions, and transparent contract terms.
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-gold-300">
              Acoustics & Lighting
            </h3>
            <p className="text-stone-300 text-xs leading-relaxed">
              We verify decibel compliance, moving head rigs, and power generator capacities so your sangeet night never suffers an interruption.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-gold-300">
              Ritual Compliance
            </h3>
            <p className="text-stone-300 text-xs leading-relaxed">
              From open-flame Vedic hawan permissions to dedicated Jain pure-veg cooking facilities, our directory clearly categorizes ritual accommodations.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-gold-300">
              Logistics & Parking
            </h3>
            <p className="text-stone-300 text-xs leading-relaxed">
              Never let parking hassles spoil your guest entry. We verify valet lot sizes, separate baraat pathways, and wheelchair ramps.
            </p>
          </div>
        </div>
      </div>

      {/* Team / Call to action */}
      <div className="text-center space-y-6 pt-4">
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
          Ready to discover your celebration venue?
        </h2>
        <div className="flex justify-center gap-4">
          <Link
            to="/halls"
            className="px-6 py-3 rounded-full bg-brand-900 hover:bg-brand-950 text-white font-semibold text-sm shadow-md transition"
          >
            Browse All Banquets &rarr;
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm transition"
          >
            Speak to a Venue Concierge
          </Link>
        </div>
      </div>
    </div>
  );
};
