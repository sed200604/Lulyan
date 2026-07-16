import React from 'react';

export function MastercardMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.8"/>
      <circle cx="22" cy="10" r="10" fill="currentColor" fillOpacity="0.8"/>
    </svg>
  );
}
