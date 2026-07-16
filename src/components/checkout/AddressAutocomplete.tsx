'use client';

import { useState, useEffect, useRef } from 'react';
import { useCheckoutStore } from '@/stores/checkoutStore';

interface Suggestion {
  label: string;
  line1: string;
  city: string;
  postalCode: string;
  context: string;
}

export function AddressAutocomplete() {
  const { shippingAddress, setShippingAddress } = useCheckoutStore();
  const [query, setQuery] = useState(shippingAddress.address1);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync internal query state if store changes externally
  useEffect(() => {
    setQuery(shippingAddress.address1);
  }, [shippingAddress.address1]);

  useEffect(() => {
    const searchBAN = async (q: string) => {
      if (q.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&limit=5&type=housenumber`
        );
        const data = await res.json();
        
        if (data && data.features) {
          const formatted = data.features.map((f: any) => ({
            label: f.properties.label,
            line1: `${f.properties.housenumber || ''} ${f.properties.street || f.properties.name}`.trim(),
            city: f.properties.city,
            postalCode: f.properties.postcode,
            context: f.properties.context,
          }));
          setSuggestions(formatted);
          setIsOpen(true);
        }
      } catch (err) {
        console.error("Failed to fetch address from BAN:", err);
      }
    };

    const timer = setTimeout(() => {
      // Don't search if the query exactly matches the selected address line1 to prevent re-opening on select
      if (query && query !== shippingAddress.address1) {
        searchBAN(query);
      }
    }, 250); // Debounce by 250ms

    return () => clearTimeout(timer);
  }, [query, shippingAddress.address1]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleSelect = (s: Suggestion) => {
    setQuery(s.line1);
    setShippingAddress({
      address1: s.line1,
      zipCode: s.postalCode,
      city: s.city,
    });
    setIsOpen(false);
    
    // Attempt to focus phone input automatically
    const phoneInput = document.getElementById('phone-input');
    if (phoneInput) {
      phoneInput.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setShippingAddress({ address1: val });
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        placeholder="Adresse"
        required
        value={query}
        onChange={handleChange}
        onFocus={() => {
          if (suggestions.length > 0) setIsOpen(true);
        }}
        className="w-full bg-transparent border-b border-brand-black-100/50 pb-2 text-[14px] text-brand-black-500 placeholder:text-brand-black-300 focus:outline-none focus:border-brand-gold-500 transition-colors"
      />
      
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-[#EEE] rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((s, idx) => (
            <div 
              key={idx}
              className="px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
              onClick={() => handleSelect(s)}
            >
              <div className="text-[14px] text-brand-black-500 font-medium">
                {s.line1}
              </div>
              <div className="text-[12px] text-brand-black-300">
                {s.postalCode} {s.city}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
