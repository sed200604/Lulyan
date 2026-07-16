'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

interface DualRangeSliderProps {
  value: [number, number];
  min: number;
  max: number;
  step?: number;
  onValueChange: (value: [number, number]) => void;
  onValueCommit?: (value: [number, number]) => void;
  formatLabel?: (value: number) => string;
}

export function DualRangeSlider({
  value,
  min,
  max,
  step = 10,
  onValueChange,
  onValueCommit,
  formatLabel = (v) => `${v}€`,
}: DualRangeSliderProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        value={value}
        max={max}
        min={min}
        step={step}
        onValueChange={onValueChange as unknown as (value: number[]) => void}
        onValueCommit={onValueCommit as unknown as (value: number[]) => void}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-brand-cream-300">
          <SliderPrimitive.Range className="absolute h-full bg-brand-gold-500" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-brand-black-500 bg-brand-cream-50 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-brand-black-500 bg-brand-cream-50 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
      <div className="flex justify-between items-center text-body-sm font-sans text-brand-black-400">
        <span>{formatLabel(value[0])}</span>
        <span>{formatLabel(value[1])}</span>
      </div>
    </div>
  );
}
