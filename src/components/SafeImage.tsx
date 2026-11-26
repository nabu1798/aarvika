import React, { useState } from 'react';
import { Mountain } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-deep-teal via-primary-container to-charcoal flex flex-col items-center justify-center p-4 text-center text-pure-white/90 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Mountain className="w-8 h-8 text-antique-gold mb-2 opacity-90" aria-hidden="true" />
        <span className="font-headline text-sm tracking-wide">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
