import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface HallGalleryProps {
  images: string[];
  hallName: string;
  hallId: string;
}

export const HallGallery: React.FC<HallGalleryProps> = ({
  images,
  hallName,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prevImage = () => {
    setSelectedIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelectedIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const activeImage = images[selectedIdx] || images[0];

  return (
    <div className="space-y-3">
      {/* Main Image Banner */}
      <div className="relative h-80 sm:h-[420px] md:h-[480px] w-full rounded-3xl overflow-hidden shadow-wedding border border-stone-200/90 group bg-stone-900">
        <SafeImage
          key={activeImage}
          src={activeImage}
          alt={`${hallName} venue view ${selectedIdx + 1}`}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover transition-all duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Right Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {/* Lightbox Trigger */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-stone-950/80 hover:bg-stone-900 text-white backdrop-blur-md border border-white/20 transition-transform hover:scale-105 shadow-md text-xs font-semibold"
            title="Expand Fullscreen Photo Lightbox"
            aria-label="Expand Photo Lightbox"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="hidden sm:inline">View Photos</span>
          </button>
        </div>

        {/* Navigation Arrows for Main Image */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-950/70 hover:bg-stone-950 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-105"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-950/70 hover:bg-stone-950 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-105"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Bottom Image Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-stone-950/75 backdrop-blur-md text-[11px] font-semibold text-white/90 border border-white/10 flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-gold-400" />
          <span>{selectedIdx + 1} / {images.length} Photos</span>
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`relative flex-shrink-0 w-24 h-16 sm:w-28 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                selectedIdx === idx
                  ? 'border-brand-800 scale-102 ring-2 ring-brand-800/30'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <SafeImage
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Fullscreen Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <span className="font-serif font-bold text-lg text-cream-100">{hallName}</span>
              <span className="text-xs text-stone-400">
                ({selectedIdx + 1} of {images.length})
              </span>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Image Container */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <SafeImage
              src={activeImage}
              alt={`${hallName} full view`}
              containerClassName="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl overflow-hidden"
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-6 p-3 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white transition border border-stone-700"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-6 p-3 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white transition border border-stone-700"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex justify-center gap-2 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition ${
                  selectedIdx === idx ? 'border-gold-400 scale-105' : 'border-transparent opacity-50'
                }`}
              >
                <SafeImage src={img} alt="" containerClassName="w-full h-full" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
