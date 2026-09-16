import React, { lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHall } from '../hooks/useHall';
import { Loader2, ArrowLeft, AlertCircle } from 'lucide-react';

// Code-split 3D bundle so it doesn't inflate initial bundle size
const Hall3DViewer = lazy(() => import('../components/viewer3d/Hall3DViewer'));

const Fullscreen3DLoader = () => (
  <div className="w-full h-screen bg-stone-950 flex flex-col items-center justify-center text-white space-y-4">
    <div className="w-14 h-14 rounded-full border-4 border-gold-500/20 border-t-gold-400 animate-spin flex items-center justify-center">
      <Loader2 className="w-7 h-7 text-gold-400 animate-spin" />
    </div>
    <div className="text-center space-y-1">
      <h3 className="font-serif font-bold text-xl text-cream-100">
        Loading 3D Venue Simulator...
      </h3>
      <p className="text-xs text-stone-400">
        Initializing WebGL engine, materials, and lighting
      </p>
    </div>
  </div>
);

export const Hall3DPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: hall, isLoading, isError } = useHall(id);

  if (isLoading) {
    return <Fullscreen3DLoader />;
  }

  if (isError || !hall) {
    return (
      <div className="w-full h-screen bg-stone-950 flex flex-col items-center justify-center text-white p-6 space-y-4 text-center">
        <AlertCircle className="w-12 h-12 text-rose-400" />
        <h2 className="font-serif font-bold text-2xl text-cream-100">
          Venue Not Found
        </h2>
        <p className="text-stone-400 text-xs sm:text-sm max-w-md">
          Unable to locate the 3D model data for the requested venue ID.
        </p>
        <Link
          to="/halls"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white text-xs font-semibold shadow-md transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Venues Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen z-50 bg-stone-950 overflow-hidden">
      <Suspense fallback={<Fullscreen3DLoader />}>
        <Hall3DViewer hall={hall} />
      </Suspense>
    </div>
  );
};

