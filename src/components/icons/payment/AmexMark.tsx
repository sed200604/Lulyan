import React from 'react';

export function AmexMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="20" rx="2" fill="currentColor" fillOpacity="0.1"/>
      <path d="M4 14l3-8h2l3 8H9.5l-.5-2H6.5l-.5 2H4zm3-3.5h1.5L8 8l-.5 2.5zM13 14V6h2.5l1.5 5 1.5-5H21v8h-1.5V8.5l-1.5 4.5h-1L15.5 8.5V14H13zm9-8h5v1.5h-3v1.5h2.5v1.5H22V14h-1.5V6zm1-2h4v1h-4V4z" fill="currentColor"/>
    </svg>
  );
}
