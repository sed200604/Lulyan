'use client';

import React from 'react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  className?: string;
  fillColor?: string;
  emptyColor?: string;
}

export function StarRating({ 
  rating, 
  maxStars = 5, 
  size = 16, 
  className = '',
  fillColor = '#C8A558', // brand-gold-500
  emptyColor = '#E5E7EB' // gray-200
}: StarRatingProps) {
  const StarPath = () => (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  );

  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`Note: ${rating} sur ${maxStars}`}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const fillPercentage = Math.max(0, Math.min(100, (rating - index) * 100));

        return (
          <div key={index} className="relative flex-shrink-0" style={{ width: size, height: size }}>
            {/* Background (Empty) Star */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={emptyColor}
              stroke={emptyColor}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute inset-0"
            >
              <StarPath />
            </svg>

            {/* Foreground (Filled) Star with clipping */}
            {fillPercentage > 0 && (
              <div 
                className="absolute inset-0 overflow-hidden" 
                style={{ width: `${fillPercentage}%` }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={size}
                  height={size}
                  viewBox="0 0 24 24"
                  fill={fillColor}
                  stroke={fillColor}
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <StarPath />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
