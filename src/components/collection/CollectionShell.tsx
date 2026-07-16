'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { Collection, Product } from '@/types/product';
import CollectionFilters, { FilterState } from './CollectionFilters';
import { CollectionSort, SortOption } from './CollectionSort';
import { ActiveFilters } from './ActiveFilters';
import CollectionGrid from './CollectionGrid';
import { MobileFilterBar } from './MobileFilterBar';
import { MobileActiveFilters } from './MobileActiveFilters';

interface CollectionShellProps {
  collection: Collection;
  initialProducts: Product[];
}

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  sizes: [],
  colors: [],
  price: [39, 249],
  uv: false,
  inStock: false,
};

export function CollectionShell({ initialProducts }: CollectionShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Initialize filters from URL
  const initialFilters = useMemo(() => {
    const f = { ...DEFAULT_FILTERS };
    const spSize = searchParams.get('size');
    const spColor = searchParams.get('color');
    const spCat = searchParams.get('category');
    const spPrice = searchParams.get('price');
    const spUv = searchParams.get('uv');
    const spInStock = searchParams.get('inStock');

    if (spSize) f.sizes = spSize.split(',');
    if (spColor) f.colors = spColor.split(',');
    if (spCat) f.categories = spCat.split(',');
    if (spPrice) {
      const [min, max] = spPrice.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) f.price = [min, max];
    }
    if (spUv === 'true') f.uv = true;
    if (spInStock === 'true') f.inStock = true;

    return f;
  }, [searchParams]);

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState<SortOption>((searchParams.get('sort') as SortOption) || 'newest');

  // Sync state to URL
  const updateUrl = useCallback((newFilters: FilterState, newSort: SortOption) => {
    const params = new URLSearchParams();
    
    if (newFilters.sizes.length) params.set('size', newFilters.sizes.join(','));
    if (newFilters.colors.length) params.set('color', newFilters.colors.join(','));
    if (newFilters.categories.length) params.set('category', newFilters.categories.join(','));
    if (newFilters.price[0] > 39 || newFilters.price[1] < 249) {
      params.set('price', `${newFilters.price[0]}-${newFilters.price[1]}`);
    }
    if (newFilters.uv) params.set('uv', 'true');
    if (newFilters.inStock) params.set('inStock', 'true');
    if (newSort !== 'newest') params.set('sort', newSort);

    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
  }, [pathname, router]);

  const updateFilter = (key: keyof FilterState, value: unknown) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateUrl(newFilters, sort);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    updateUrl(DEFAULT_FILTERS, sort);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    updateUrl(filters, newSort);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // In a real app we might filter by the `collection.slug` explicitly if it's not pre-filtered
    // But assuming initialProducts is already the right collection set.

    if (filters.categories.length) {
      result = result.filter(p => p.category && filters.categories.some(c => p.category.includes(c) || c.includes(p.category)));
    }
    if (filters.colors.length) {
      result = result.filter(p => p.colors && p.colors.some(c => filters.colors.includes(c.name)));
    }
    if (filters.sizes.length) {
      result = result.filter(p => p.sizes && p.sizes.some(s => filters.sizes.includes(s.label) && (!filters.inStock || s.inStock)));
    }
    if (filters.uv) {
      result = result.filter(p => !!p.uvProtection);
    }
    if (filters.inStock) {
      result = result.filter(p => p.sizes && p.sizes.some(s => s.inStock));
    }
    
    // Price filter
    result = result.filter(p => p.price >= filters.price[0] && p.price <= filters.price[1]);

    // Sorting
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popular':
        result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [initialProducts, filters, sort]);

  const activeFilterCount = Object.values(filters).reduce((acc, val) => {
    if (Array.isArray(val)) return acc + val.length;
    if (typeof val === 'boolean') return acc + (val ? 1 : 0);
    // price array
    if (val === filters.price && (val[0] !== 39 || val[1] !== 249)) return acc + 1;
    return acc;
  }, 0) as number;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">
      <CollectionFilters
        filters={filters}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
        isMobile={false}
        productCount={filteredProducts.length}
      />
      <CollectionFilters
        filters={filters}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        isMobile={true}
        productCount={filteredProducts.length}
      />

      <div className="flex-1 w-full">
        {/* Desktop Top Bar */}
        <div className="hidden md:flex items-center justify-between mb-8 pb-4 border-b border-brand-cream-300 sticky top-24 bg-brand-cream-50/90 backdrop-blur-md z-30 pt-4">
          <span className="font-sans text-body-sm text-brand-black-400">
            {filteredProducts.length} produits
          </span>
          <CollectionSort value={sort} onChange={handleSortChange} />
        </div>

        {/* Mobile Filter Bar & Active Chips */}
        <MobileFilterBar 
          activeFilterCount={activeFilterCount}
          onOpenFilters={() => setIsMobileFilterOpen(true)}
          currentSort={sort}
          onSortChange={handleSortChange}
        />
        <MobileActiveFilters 
          filters={filters}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
        />

        <div className="hidden md:block">
          <ActiveFilters filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} />
        </div>

        <CollectionGrid products={filteredProducts} onReset={resetFilters} />
      </div>
    </div>
  );
}
