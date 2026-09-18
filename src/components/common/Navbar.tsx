import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Building2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Venues', href: '/halls' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-wedding border-b border-stone-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-stone-200/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-900 to-brand-700 flex items-center justify-center text-gold-300 shadow-md group-hover:scale-105 transition-transform duration-300 border border-gold-500/40">
              <Sparkles className="w-5 h-5 text-gold-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl sm:text-2xl text-brand-950 tracking-tight leading-none group-hover:text-brand-800 transition-colors">
                Shaadi<span className="text-gold-600 font-sans font-extrabold">Spots</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-600 font-sans mt-0.5">
                Bengaluru Venues
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-brand-900 font-bold border-b-2 border-brand-700 pb-1'
                      : 'text-stone-600 hover:text-brand-800'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/halls"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-900 to-brand-800 hover:from-brand-950 hover:to-brand-900 text-white text-sm font-semibold shadow-wedding hover:shadow-wedding-lg transition-all duration-300 hover:-translate-y-0.5 border border-gold-500/30"
            >
              <Building2 className="w-4 h-4 text-gold-300" />
              <span>Explore Venues</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:text-brand-900 hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-wedding-lg animate-fade-in">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-900 font-bold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2">
            <Link
              to="/halls"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-900 text-white font-semibold shadow-wedding"
            >
              <Building2 className="w-4 h-4 text-gold-300" />
              <span>Explore All Venues</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
