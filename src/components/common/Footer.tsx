import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { POPULAR_AREAS } from '../../data/halls';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-900 to-brand-700 flex items-center justify-center text-gold-300 shadow-md border border-gold-500/40">
                <Sparkles className="w-5 h-5 text-gold-300" />
              </div>
              <span className="font-serif font-bold text-2xl text-white tracking-tight">
                Shaadi<span className="text-gold-400 font-sans">Spots</span>
              </span>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Discover the most prestigious wedding venues, banquet halls, and royal pavilions across Bengaluru. Browse verified photo galleries, genuine Google reviews, and direct management contacts.
            </p>
            <div className="space-y-2 pt-2 text-sm text-stone-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400" />
                <span>+91 98000 12345 (Concierge Desk)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400" />
                <span>concierge@shaadispots.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>Indiranagar, Bengaluru, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-white text-base mb-4 text-gold-300">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/halls" className="hover:text-gold-300 transition-colors">
                  All Wedding Venues
                </Link>
              </li>
              <li>
                <Link to="/halls?featured=true" className="hover:text-gold-300 transition-colors">
                  Featured Palaces
                </Link>
              </li>
              <li>
                <Link to="/halls?vegOnly=true" className="hover:text-gold-300 transition-colors">
                  Pure Veg Banquets
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-300 transition-colors">
                  About ShaadiSpots
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Areas */}
          <div>
            <h4 className="font-serif font-bold text-white text-base mb-4 text-gold-300">
              Popular Localities
            </h4>
            <ul className="space-y-2.5 text-sm">
              {POPULAR_AREAS.filter((a) => a !== 'All Areas').slice(0, 6).map((area) => (
                <li key={area}>
                  <Link
                    to={`/halls?area=${encodeURIComponent(area)}`}
                    className="hover:text-gold-300 transition-colors"
                  >
                    Banquets in {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Venue Owners */}
          <div>
            <h4 className="font-serif font-bold text-white text-base mb-4 text-gold-300">
              Venue Partners
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              Are you a marriage hall owner? Showcase your banquet with our proprietary 3D digital twin technology.
            </p>
            <Link
              to="/contact"
              className="inline-block px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-gold-400 border border-gold-500/30 text-xs font-semibold transition"
            >
              List Your Venue &rarr;
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} ShaadiSpots Technologies. All rights reserved.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for magical wedding celebrations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

