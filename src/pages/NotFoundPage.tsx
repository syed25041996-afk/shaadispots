import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-brand-50 border border-brand-200 text-brand-900 flex items-center justify-center shadow-wedding">
        <Sparkles className="w-10 h-10 text-gold-600 animate-pulse" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
          404 • Page Not Found
        </span>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-stone-900">
          Looks Like You Took A Wrong Turn
        </h1>
        <p className="text-stone-500 text-sm leading-relaxed">
          The wedding hall or page you were looking for doesn't exist or has been relocated to another palace ballroom.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-900 hover:bg-brand-950 text-white font-semibold text-xs shadow-md transition"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          to="/halls"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Venues</span>
        </Link>
      </div>
    </div>
  );
};

