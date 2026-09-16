import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`animate-pulse bg-stone-200/80 rounded-xl ${className}`} />;
};

export const HallCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm flex flex-col h-full">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-56 rounded-none" />

      {/* Body Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="h-4 w-12 rounded-full" />
          </div>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Specs Pills */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Price & Actions */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24 rounded-xl" />
            <Skeleton className="h-9 w-20 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const HallDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <Skeleton className="h-4 w-48" />

      {/* Title & Info */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-2/3 max-w-lg" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* Gallery Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="md:col-span-2 h-96 rounded-3xl" />
        <div className="space-y-4">
          <Skeleton className="h-[184px] rounded-3xl" />
          <Skeleton className="h-[184px] rounded-3xl" />
        </div>
      </div>

      {/* Main Content & Sticky Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Skeleton className="h-40 rounded-3xl" />
          <Skeleton className="h-64 rounded-3xl" />
        </div>
        <div>
          <Skeleton className="h-96 rounded-3xl" />
        </div>
      </div>
    </div>
  );
};

