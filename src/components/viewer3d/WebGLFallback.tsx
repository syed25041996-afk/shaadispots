import React from 'react';
import { AlertTriangle, Compass, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Hall } from '../../types/hall';

interface WebGLFallbackProps {
  hall?: Hall | null;
  message?: string;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({
  hall,
  message = '3D Hardware Acceleration is not enabled or supported in your browser.'
}) => {
  return (
    <div className="min-h-[500px] h-full w-full flex flex-col items-center justify-center p-8 bg-stone-900 text-white rounded-2xl border border-stone-800 text-center">
      <div className="w-16 h-16 rounded-full bg-brand-900/60 border border-brand-500/40 flex items-center justify-center mb-6 text-gold-400">
        <Compass className="w-8 h-8 animate-pulse" />
      </div>

      <h3 className="text-2xl font-serif font-bold text-cream-100 mb-2">
        {hall ? `${hall.name} - 3D Preview` : '3D Venue Preview Unavailable'}
      </h3>

      <div className="flex items-center gap-2 text-amber-300 text-sm bg-amber-950/40 border border-amber-800/60 px-4 py-2 rounded-lg max-w-md mb-6">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span>{message}</span>
      </div>

      <p className="text-stone-300 text-sm max-w-lg mb-8 leading-relaxed">
        To experience interactive 3D virtual walkthroughs, please ensure WebGL and Hardware Acceleration are turned ON in your browser settings (Chrome &gt; Settings &gt; System &gt; Use graphics acceleration).
      </p>

      {hall && (
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to={`/halls/${hall.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-700 hover:bg-brand-600 text-white font-medium transition shadow-wedding"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Venue Details
          </Link>
          <a
            href={hall.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-cream-200 border border-stone-700 font-medium transition"
          >
            View Venue on Google Maps
          </a>
        </div>
      )}
    </div>
  );
};

