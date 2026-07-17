import React from 'react';

export function SizeGuideIllustration({ className = '', style }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 400" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Silhouette */}
      <path 
        d="M100 20C110 20 118 28 118 38C118 48 110 56 100 56C90 56 82 48 82 38C82 28 90 20 100 20ZM75 70C85 65 115 65 125 70C135 75 140 85 140 100C140 120 135 150 125 180C115 210 125 240 130 270C135 300 130 350 120 380H80C70 350 65 300 70 270C75 240 85 210 75 180C65 150 60 120 60 100C60 85 65 75 75 70Z" 
        fill="#f5f5f5" 
        stroke="#e5e5e5" 
        strokeWidth="2" 
      />
      
      {/* 1. Poitrine */}
      <line x1="40" y1="110" x2="160" y2="110" stroke="#C8A558" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="100" cy="110" r="3" fill="#C8A558" />
      <text x="30" y="114" fontSize="12" fill="#666" textAnchor="end" fontFamily="sans-serif">1</text>
      
      {/* 2. Taille */}
      <line x1="40" y1="160" x2="160" y2="160" stroke="#C8A558" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="100" cy="160" r="3" fill="#C8A558" />
      <text x="30" y="164" fontSize="12" fill="#666" textAnchor="end" fontFamily="sans-serif">2</text>
      
      {/* 3. Hanches */}
      <line x1="40" y1="210" x2="160" y2="210" stroke="#C8A558" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="100" cy="210" r="3" fill="#C8A558" />
      <text x="30" y="214" fontSize="12" fill="#666" textAnchor="end" fontFamily="sans-serif">3</text>
    </svg>
  );
}
