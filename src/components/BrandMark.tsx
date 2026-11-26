import React from 'react';

interface BrandMarkProps {
  compact?: boolean;
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ compact = false, className = '' }) => {
  return (
    <span className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        className={compact ? 'w-20 h-6 mb-0.5' : 'w-24 h-7 mb-0.5'}
        viewBox="0 0 120 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10 32L38 14L50 22L66 4L84 21L94 15L112 32H88L66 13L48 27L38 20L20 32H10Z"
          fill="#D8A64E"
        />
        <path d="M66 4L74 16L66 13L56 21L66 4Z" fill="#FFEED9" opacity="0.65" />
        <path d="M38 14L44 21L38 20L29 26L38 14Z" fill="#FFEED9" opacity="0.45" />
      </svg>
      <span
        className={`font-headline text-pure-white leading-none ${
          compact ? 'text-[16px] tracking-[0.18em]' : 'text-[18px] tracking-[0.18em]'
        } font-semibold`}
      >
        AARVIKA
      </span>
      <span
        className={`font-body text-pure-white/85 uppercase ${
          compact ? 'text-[8px] tracking-[0.24em] mt-0.5' : 'text-[9px] tracking-[0.26em] mt-1'
        }`}
      >
        TRAVEL · EXPLORE · EXPERIENCE
      </span>
    </span>
  );
};
