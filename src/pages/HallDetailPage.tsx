import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHall } from '../hooks/useHall';
import { HallGallery } from '../components/halls/HallGallery';
import { HallSpecs } from '../components/halls/HallSpecs';
import { HallReviews } from '../components/halls/HallReviews';
import { EnquiryForm } from '../components/halls/EnquiryForm';
import { HallDetailSkeleton } from '../components/common/Skeleton';
import { Badge } from '../components/common/Badge';
import {
  MapPin,
  Star,
  Users,
  Compass,
  Sparkles,
  Phone,
  Mail,
  ChevronRight,
  Leaf,
  CheckCircle2
} from 'lucide-react';

export const HallDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: hall, isLoading, isError } = useHall(id);

  if (isLoading) {
    return <HallDetailSkeleton />;
  }

  if (isError || !hall) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-stone-900">
          Venue Not Found
        </h2>
        <p className="text-stone-500 text-sm">
          The wedding hall you are looking for might have been moved or does not exist.
        </p>
        <Link
          to="/halls"
          className="inline-block px-6 py-2.5 rounded-full bg-brand-900 text-white font-semibold text-xs shadow-md"
        >
          Browse All Wedding Venues
        </Link>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-stone-600">
        <Link to="/" className="hover:text-brand-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <Link to="/halls" className="hover:text-brand-900 transition-colors">
          Venues
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <span className="text-stone-800 line-clamp-1">{hall.name}</span>
      </nav>

      {/* Header Info Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-stone-200/80">
        <div className="space-y-2">
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold">
              <Sparkles className="w-3 h-3 text-gold-700" />
              Verified Banquet Twin
            </Badge>
            {hall.vegOnly && (
              <Badge variant="emerald">
                <Leaf className="w-3 h-3 text-emerald-700" />
                Pure Vegetarian Venue
              </Badge>
            )}
            <Badge variant="stone">
              <MapPin className="w-3 h-3" />
              {hall.area}, {hall.city}
            </Badge>
          </div>

          <h1 className="font-serif font-extrabold text-2xl sm:text-4xl text-stone-900 tracking-tight">
            {hall.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-stone-600">
            <div className="flex items-center gap-1 font-bold text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{hall.rating}</span>
              <span className="text-stone-600 font-normal">({hall.reviewCount} reviews)</span>
            </div>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-stone-600" />
              {hall.capacityMin} to {hall.capacityMax} Guests
            </span>
            <span>•</span>
            <span className="text-stone-600 font-medium truncate">{hall.address}</span>
          </div>
        </div>

        {/* Pricing Summary & 3D Tour CTA */}
        <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider block">
              Daily Rental Starting At
            </span>
            <div className="text-xl sm:text-2xl font-serif font-extrabold text-brand-950">
              {formatCurrency(hall.pricePerDay)}
            </div>
            <span className="text-[11px] text-stone-600">
              + Food from {formatCurrency(hall.pricePerPlate)}/plate
            </span>
          </div>

          <Link
            to={`/halls/${hall.id}/3d`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-950 hover:bg-stone-900 text-gold-300 hover:text-white border border-gold-500/40 font-bold text-xs sm:text-sm shadow-wedding transition-all hover:scale-102"
          >
            <Compass className="w-4 h-4 text-gold-400 animate-spin-slow" />
            <span>Open 3D Virtual Tour</span>
          </Link>
        </div>
      </div>

      {/* Image Gallery */}
      <HallGallery images={hall.images} hallName={hall.name} hallId={hall.id} />

      {/* Prominent 3D Walkthrough Banner */}
      <div className="bg-gradient-to-r from-stone-950 via-brand-950 to-stone-950 text-white p-6 sm:p-8 rounded-3xl border border-gold-500/40 shadow-wedding-lg flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-[11px] font-semibold tracking-wide border border-gold-400/30">
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            Interactive 3D Digital Twin
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-cream-100">
            Take a 3D Spatial Walkthrough of {hall.name}
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Inspect the {hall.dimensions.width}m × {hall.dimensions.length}m floor plan, {hall.tableCount} banquet tables, and stage view in full-screen 3D with Orbit and First-Person Walkthrough modes.
          </p>
        </div>

        <Link
          to={`/halls/${hall.id}/3d`}
          className="relative z-10 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-stone-950 font-bold text-sm shadow-gold-glow transition-all shrink-0 hover:scale-105"
        >
          <Compass className="w-5 h-5 text-stone-950" />
          <span>Launch 3D Viewer</span>
        </Link>
      </div>

      {/* Main Content: Left Details vs Right Sticky Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description & Overview */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-wedding space-y-4">
            <h3 className="font-serif font-bold text-xl text-stone-900">
              About The Venue
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              {hall.description}
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Located in prestigious {hall.area}, {hall.name} offers magnificent architecture tuned for memorable Indian weddings. The venue features an elevated mandap stage, crystal chandelier lighting, sound-isolated banquet partitions, and dedicated bridal suites.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-800" />
                <span>Contact Desk: {hall.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-800" />
                <span>Official Email: {hall.contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <HallSpecs hall={hall} />

          {/* Amenities Badges */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-wedding space-y-4">
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Key Amenities & Facilities
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {hall.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 hover:border-brand-300 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ratings Breakdown & Embedded Map */}
          <HallReviews hall={hall} />
        </div>

        {/* Right Column (1 Col Sticky Enquiry Form) */}
        <div className="lg:col-span-1">
          <EnquiryForm hall={hall} />
        </div>
      </div>
    </div>
  );
};
