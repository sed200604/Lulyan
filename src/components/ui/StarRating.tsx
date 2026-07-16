'use client';

import { useId } from 'react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, maxStars = 5, size = 16, className = '' }: StarRatingProps) {
  const gradientId = useId();

  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`Note: ${rating} sur ${maxStars}`}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const fillPercentage = Math.max(0, Math.min(100, (rating - index) * 100));
        const isPartiallyFilled = fillPercentage > 0 && fillPercentage < 100;

        return (
          <div key={index} className="relative leading-none" style={{ width: size, height: size }}>
            {isPartiallyFilled && (
              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient id={`${gradientId}-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset={`${fillPercentage}%`} stopColor="#C8A558" />
                    <stop offset={`${fillPercentage}%`} stopColor="#E5E7EB" /> {/* Gray-200 */}
                  </linearGradient>
                </defs>
              </svg>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={fillPercentage === 100 ? '#C8A558' : isPartiallyFilled ? `url(#${gradientId}-${index})` : '#E5E7EB'}
              stroke={fillPercentage === 100 ? '#C8A558' : isPartiallyFilled ? `url(#${gradientId}-${index})` : '#E5E7EB'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-star"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
