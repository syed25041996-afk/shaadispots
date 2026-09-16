import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Users, Sparkles, Compass, ArrowRight } from 'lucide-react';
import { POPULAR_AREAS } from '../../data/halls';

export const HeroSearch: React.FC = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [area, setArea] = useState('All Areas');
  const [capacity, setCapacity] = useState('any');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.append('search', keyword.trim());
    if (area && area !== 'All Areas') params.append('area', area);
    if (capacity !== 'any') params.append('minCapacity', capacity);

    navigate(`/halls?${params.toString()}`);
  };

  return (
    <div className="relative overflow-hidden bg-brand-950 text-white min-h-[580px] lg:min-h-[640px] flex items-center justify-center">
      {/* Background Image with Warm Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury wedding ballroom setup"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-brand-950/80 to-stone-950/60" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/40 backdrop-blur-md text-gold-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm animate-fade-in">
          <Sparkles className="w-4 h-4 text-gold-300" />
          <span>India’s First 3D Virtual Wedding Hall Directory</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-cream-100 tracking-tight leading-tight sm:leading-tight">
          Find & Walk Through Your Dream{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-200 to-amber-300">
            Wedding Venue in 3D
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-stone-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Explore the finest marriage palaces, luxury hotel ballrooms, and heritage lawns. Inspect tables, stage backdrops, and spatial proportions interactively before booking.
        </p>

        {/* Search Box Bar */}
        <form
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl sm:rounded-full shadow-wedding-lg border border-gold-500/30 max-w-4xl mx-auto text-stone-900 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
        >
          {/* Keyword Search */}
          <div className="sm:col-span-5 flex items-center gap-3 px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-stone-200">
            <Search className="w-5 h-5 text-brand-900 shrink-0" />
            <input
              type="text"
              placeholder="Search hall name or vibe..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-transparent text-sm placeholder:text-stone-400 focus:outline-none font-medium"
            />
          </div>

          {/* Area Selector */}
          <div className="sm:col-span-3 flex items-center gap-2 px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-stone-200">
            <MapPin className="w-4 h-4 text-brand-900 shrink-0" />
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-stone-700 focus:outline-none cursor-pointer"
            >
              {POPULAR_AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Capacity Selector */}
          <div className="sm:col-span-2 flex items-center gap-2 px-3 py-1.5">
            <Users className="w-4 h-4 text-brand-900 shrink-0" />
            <select
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-stone-700 focus:outline-none cursor-pointer"
            >
              <option value="any">Guests (Any)</option>
              <option value="200">200+ Guests</option>
              <option value="500">500+ Guests</option>
              <option value="1000">1000+ Guests</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-3 sm:py-3.5 px-4 rounded-full bg-gradient-to-r from-brand-900 to-brand-800 hover:from-brand-950 hover:to-brand-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4 text-gold-300 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>

        {/* Quick Highlights underneath */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-300 pt-2 font-medium">
          <span className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-gold-400" />
            First-Person & Orbit 3D Previews
          </span>
          <span className="hidden sm:inline text-stone-600">•</span>
          <span>Verified Floor Dimensions</span>
          <span className="hidden sm:inline text-stone-600">•</span>
          <span>Zero Commission Direct Booking</span>
        </div>
      </div>
    </div>
  );
};

