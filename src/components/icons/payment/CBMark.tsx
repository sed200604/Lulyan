import React from 'react';

export function CBMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6c-3 0-5 2-5 5s2 5 5 5c2 0 4-1 4.5-3h-2c-.5 1-1.5 1.5-2.5 1.5-1.5 0-2.5-1-2.5-3.5S10.5 7.5 12 7.5c1 0 2 .5 2.5 1.5h2C16 7 14 6 12 6zm5 0v10h4c2 0 4-1 4-2.5 0-1-.5-1.5-1.5-2 .5-.5 1-1 1-2C24.5 7.5 23 6 21 6h-4zm2.5 4V7.5H21c1 0 1.5.5 1.5 1.25S22 10 21 10h-1.5zm0 4.5v-3H21c1.5 0 2 .5 2 1.5s-.5 1.5-2 1.5h-1.5z" fill="currentColor"/>
    </svg>
  );
}
