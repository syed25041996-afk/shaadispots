import React, { useState } from 'react';
import { Camera, ImageOff } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  photoCount?: number;
  containerClassName?: string;
}

const DEFAULT_FALLBACK =
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80';

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Wedding hall photo',
  className = '',
  containerClassName = '',
  fallbackSrc = DEFAULT_FALLBACK,
  photoCount,
  ...rest
}) => {
  const [imageSrc, setImageSrc] = useState(src || fallbackSrc);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imageSrc !== fallbackSrc) {
      setHasError(true);
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${containerClassName}`}>
      {/* Shimmer Placeholder while loading */}
      {!loaded && !hasError && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
          <Camera className="w-6 h-6 text-stone-300" />
        </div>
      )}

      {/* Main Image */}
      <img
        {...rest}
        src={imageSrc}
        alt={alt}
        loading={rest.loading || 'lazy'}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`${className} transition-opacity duration-500 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Photo Count Pill */}
      {photoCount && photoCount > 1 ? (
        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-stone-950/75 backdrop-blur-md text-[11px] font-semibold text-white/95 flex items-center gap-1.5 border border-white/10 shadow-sm pointer-events-none">
          <Camera className="w-3 h-3 text-gold-400" />
          <span>{photoCount} Photos</span>
        </div>
      ) : null}

      {/* Fallback indicator */}
      {hasError && (
        <div className="absolute top-2.5 right-2.5 p-1 rounded-md bg-stone-900/60 text-white/80 text-[10px] flex items-center gap-1 pointer-events-none">
          <ImageOff className="w-3 h-3 text-stone-300" />
        </div>
      )}
    </div>
  );
};

