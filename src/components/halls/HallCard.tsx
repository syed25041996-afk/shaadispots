import React from 'react';
import { Link } from 'react-router-dom';
import { Hall } from '../../types/hall';
import {
  Users,
  Star,
  MapPin,
  Compass,
  Sparkles,
  ArrowRight,
  Leaf
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface HallCardProps {
  hall: Hall;
}

export const HallCard: React.FC<HallCardProps> = ({ hall }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-wedding hover:shadow-wedding-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Cover Image Container */}
      <div className="relative h-60 w-full overflow-hidden bg-stone-100">
        <img
          src={hall.images[0] || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'}
          alt={`${hall.name} wedding hall`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
          {/* 3D Available Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-stone-950/80 backdrop-blur-md text-gold-300 border border-gold-500/40 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
            3D Tour
          </span>

          {/* Featured / Veg Badges */}
          <div className="flex items-center gap-1.5">
            {hall.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-900/90 backdrop-blur-md text-white border border-brand-500/40">
                <Sparkles className="w-3 h-3 text-gold-300" />
                Featured
              </span>
            )}
            {hall.vegOnly && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/40" title="Pure Vegetarian Venue">
                <Leaf className="w-3 h-3 text-emerald-400" />
                Pure Veg
              </span>
            )}
          </div>
        </div>

        {/* Bottom Cover Overlay Info */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
          <div className="flex items-center gap-1.5 text-xs font-medium text-cream-200">
            <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="truncate">{hall.area}, {hall.city}</span>
          </div>
          {/* Rating Pill */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-stone-900/80 backdrop-blur-sm text-xs font-bold text-amber-300 border border-amber-500/30">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{hall.rating}</span>
            <span className="text-[10px] text-stone-300 font-normal">({hall.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Venue Name */}
          <Link to={`/halls/${hall.id}`}>
            <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-brand-900 transition-colors line-clamp-1">
              {hall.name}
            </h3>
          </Link>
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {hall.description}
          </p>

          {/* Quick Spec Pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <Badge variant="maroon">
              <Users className="w-3 h-3" />
              {hall.capacityMin} - {hall.capacityMax} guests
            </Badge>
            {hall.isAC && <Badge variant="stone">Air Conditioned</Badge>}
            {hall.hasParking && <Badge variant="stone">Valet Parking</Badge>}
            {hall.hasRooms && <Badge variant="gold">Rooms Available</Badge>}
          </div>
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-600 font-medium block">
              Rental from
            </span>
            <span className="text-base font-bold text-stone-900">
              {formatCurrency(hall.pricePerDay)}
              <span className="text-xs font-normal text-stone-600"> /day</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View in 3D Button */}
            <Link
              to={`/halls/${hall.id}/3d`}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-gold-300 hover:text-white border border-gold-500/40 shadow-sm transition-all hover:scale-102"
              title="Launch interactive 3D spatial walkthrough"
            >
              <Compass className="w-3.5 h-3.5 text-gold-400" />
              <span>View in 3D</span>
            </Link>

            {/* Details Button */}
            <Link
              to={`/halls/${hall.id}`}
              className="inline-flex items-center justify-center p-2 rounded-xl text-xs font-semibold bg-brand-50 hover:bg-brand-100 text-brand-900 border border-brand-200 transition-colors"
              title="View Hall Specifications & Booking"
              aria-label={`View details for ${hall.name}`}
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
