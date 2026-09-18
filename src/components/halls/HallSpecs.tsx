import React from 'react';
import { Hall } from '../../types/hall';
import {
  Users,
  UtensilsCrossed,
  Wind,
  Car,
  Bed,
  Flame,
  Star,
  MapPin,
  CheckCircle
} from 'lucide-react';

interface HallSpecsProps {
  hall: Hall;
}

export const HallSpecs: React.FC<HallSpecsProps> = ({ hall }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const specsList = [
    {
      icon: Users,
      label: 'Guest Capacity',
      value: `${hall.capacityMin} to ${hall.capacityMax} Guests`,
      sub: 'Comfortably accommodates seating & floating guests',
    },
    {
      icon: Star,
      label: 'Google Rating',
      value: `${hall.rating} ★ Rating`,
      sub: `Based on ${hall.reviewCount.toLocaleString()} verified Google reviews`,
    },
    {
      icon: MapPin,
      label: 'Locality & Area',
      value: `${hall.area}, Bengaluru`,
      sub: 'Convenient road and metro connectivity',
    },
    {
      icon: UtensilsCrossed,
      label: 'Food Policy',
      value: hall.vegOnly ? 'Strictly Pure Vegetarian' : 'Veg & Non-Veg Permitted',
      sub: `From ${formatCurrency(hall.pricePerPlate)} per plate`,
    },
    {
      icon: Wind,
      label: 'Air Conditioning',
      value: hall.isAC ? '100% Climate Controlled' : 'Natural Ventilation',
      sub: 'Central HVAC with generator backup',
    },
    {
      icon: Car,
      label: 'Parking Facility',
      value: hall.hasParking ? 'Dedicated Valet Parking' : 'Street & Shared Parking',
      sub: 'Security and parking attendants included',
    },
    {
      icon: Bed,
      label: 'Bridal & Guest Rooms',
      value: hall.hasRooms ? 'AC Suites & Guest Rooms' : 'Bridal Dressing Suite Only',
      sub: 'Private washroom & vanity mirror',
    },
    {
      icon: Flame,
      label: 'Hawan & Mandap Fire',
      value: 'Permitted',
      sub: 'Compliant with Vedic ritual safety',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-wedding space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div>
          <h3 className="font-serif font-bold text-xl text-stone-900">
            Venue Specifications & Highlights
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            Verified data sourced directly from Google Places and venue administration
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          Verified Listing
        </span>
      </div>

      {/* Grid of Spec Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {specsList.map((spec, idx) => {
          const Icon = spec.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-stone-50 hover:bg-brand-50/40 border border-stone-200/80 transition-colors space-y-2"
            >
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-brand-900 shadow-sm border border-stone-200/60">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-600 font-bold block">
                  {spec.label}
                </span>
                <p className="font-semibold text-stone-900 text-sm mt-0.5">{spec.value}</p>
                <p className="text-[11px] text-stone-600 mt-0.5">{spec.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
