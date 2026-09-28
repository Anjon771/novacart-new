import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import {
  ChevronRight,
  Filter,
  SlidersHorizontal,
  X,
  Search,
  Check,
  Star,
  RefreshCw
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    filters,
    setFilters,
    resetFilters,
    setActivePage,
    formatMoney
  } = useStore();

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);

  // Categories list for filter
  const categoryNames = ['All', ...CATEGORIES.map(c => c.name)];

  // Filter and sort products dynamically
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (filters.category && filters.category.toLowerCase() !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Search query filter
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Price range filter
    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // Rating filter
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'best-selling':
        result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case 'featured':
      default:
        // default sequence
        break;
    }

    return result;
  }, [filters]);

  const visibleProducts = filteredProducts.slice(0, displayCount);

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* Breadcrumb Header Bar */}
      <div className="border-b border-[#E7E7E7] bg-[#F7F7F5]/60 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-2 text-xs text-[#777777]">
              <button
                onClick={() => setActivePage('home')}
                className="hover:text-black transition-colors"
              >
                Home
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#111111] font-semibold">
                Shop All Collections
              </span>
            </nav>
            <span className="text-xs text-[#666666]">
              Showing <strong>{filteredProducts.length}</strong> Products
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Title & Toolbar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E7E7E7] mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#111111] tracking-tight">
              {filters.category && filters.category !== 'all' ? filters.category : 'All Products'}
            </h1>
            <p className="text-xs sm:text-sm text-[#666666] mt-1 font-normal">
              Thoughtfully engineered everyday items designed for maximum daily utility.
            </p>
          </div>

          {/* Controls: Search, Sort & Mobile Filter Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Search Input Filter */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="pl-8 pr-3 py-2 bg-[#F7F7F5] border border-[#E7E7E7] rounded-xl text-xs text-[#111111] focus:outline-hidden focus:border-black w-44 sm:w-56"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="shop-sort" className="text-xs font-semibold text-[#777777] hidden sm:block">
                Sort:
              </label>
              <select
                id="shop-sort"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="py-2 px-3 bg-white border border-[#E7E7E7] rounded-xl text-xs font-semibold text-[#111111] focus:outline-hidden focus:border-black cursor-pointer shadow-2xs"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="best-selling">Best Selling</option>
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 py-2 px-3.5 bg-[#111111] text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

          </div>
        </div>

        {/* Layout: Sidebar Filter (Desktop) + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Left Sidebar Filters (lg: 3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="p-5 bg-[#F7F7F5] rounded-2xl border border-[#E7E7E7] space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E7]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#111111]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Filters
                  </span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#888888] hover:text-[#111111] underline transition-colors"
                >
                  Reset All
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2.5">
                  Category
                </h4>
                <div className="space-y-1">
                  {categoryNames.map((name) => {
                    const isSelected = (filters.category.toLowerCase() === name.toLowerCase()) || (name === 'All' && filters.category === 'all');
                    return (
                      <button
                        key={name}
                        onClick={() => setFilters(prev => ({ ...prev, category: name === 'All' ? 'all' : name }))}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          isSelected
                            ? 'bg-[#111111] text-white font-bold'
                            : 'text-[#555555] hover:bg-[#EFEFEA] hover:text-black font-medium'
                        }`}
                      >
                        <span>{name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter Slider */}
              <div className="pt-3 border-t border-[#E7E7E7]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Max Price
                  </h4>
                  <span className="text-xs font-bold text-[#111111]">
                    {formatMoney(filters.maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-[#111111] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#888888] mt-1">
                  <span>{formatMoney(20)}</span>
                  <span>{formatMoney(100)}</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="pt-3 border-t border-[#E7E7E7]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2.5">
                  Minimum Rating
                </h4>
                <div className="space-y-1.5">
                  {[4.8, 4.5, 4.0, 0].map((rating) => {
                    const isSelected = filters.minRating === rating;
                    return (
                      <button
                        key={rating}
                        onClick={() => setFilters(prev => ({ ...prev, minRating: rating }))}
                        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          isSelected
                            ? 'bg-[#111111] text-white font-bold'
                            : 'text-[#555555] hover:bg-[#EFEFEA] hover:text-black'
                        }`}
                      >
                        {rating > 0 ? (
                          <>
                            <div className="flex text-amber-400">
                              <Star className="w-3 h-3 fill-amber-400" />
                            </div>
                            <span>{rating} stars & up</span>
                          </>
                        ) : (
                          <span>All ratings</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </aside>

          {/* Products Grid (lg: 9 cols) */}
          <main className="lg:col-span-9">
            
            {/* Active Filter Chips */}
            {(filters.category !== 'all' || filters.minRating > 0 || filters.searchQuery || filters.maxPrice < 100) && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#777777]">
                  Active:
                </span>
                {filters.category !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E7E7E7] text-xs font-semibold text-[#111111]">
                    {filters.category}
                    <button onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}>×</button>
                  </span>
                )}
                {filters.searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E7E7E7] text-xs font-semibold text-[#111111]">
                    "{filters.searchQuery}"
                    <button onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}>×</button>
                  </span>
                )}
                {filters.maxPrice < 100 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E7E7E7] text-xs font-semibold text-[#111111]">
                    Under {formatMoney(filters.maxPrice)}
                    <button onClick={() => setFilters(prev => ({ ...prev, maxPrice: 100 }))}>×</button>
                  </span>
                )}
                {filters.minRating > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E7E7E7] text-xs font-semibold text-[#111111]">
                    ★ {filters.minRating}+
                    <button onClick={() => setFilters(prev => ({ ...prev, minRating: 0 }))}>×</button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[#C94C4C] hover:underline ml-auto"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Grid: 2 Cols Mobile, 3 Cols Desktop */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-[#F7F7F5] rounded-2xl border border-[#E7E7E7] p-8">
                <p className="text-base font-bold text-[#111111] mb-1">No products match your criteria</p>
                <p className="text-xs text-[#666666] mb-6">
                  Try adjusting or resetting your filter selections to see more results.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#111111] text-white text-xs font-bold rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination / Load More */}
                {visibleProducts.length < filteredProducts.length && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setDisplayCount(c => c + 6)}
                      className="px-8 py-3.5 bg-white hover:bg-[#F7F7F5] text-[#111111] border border-[#E7E7E7] text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-xs inline-flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>LOAD MORE PRODUCTS</span>
                    </button>
                    <p className="text-[11px] text-[#888888] mt-2">
                      Showing {visibleProducts.length} of {filteredProducts.length} items
                    </p>
                  </div>
                )}
              </>
            )}

          </main>

        </div>

      </div>

      {/* Mobile Filters Slide-Over Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full flex flex-col z-10 shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E7] mb-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#111111]" />
                <h3 className="font-bold text-sm text-[#111111]">Refine Products</h3>
              </div>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 text-neutral-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">Category</h4>
                <div className="space-y-1">
                  {categoryNames.map((name) => (
                    <button
                      key={name}
                      onClick={() => {
                        setFilters(prev => ({ ...prev, category: name === 'All' ? 'all' : name }));
                        setIsMobileFiltersOpen(false);
                      }}
                      className={`w-full text-left py-2 px-3 text-xs rounded-lg ${
                        filters.category.toLowerCase() === name.toLowerCase() || (name === 'All' && filters.category === 'all')
                          ? 'bg-[#111111] text-white font-bold'
                          : 'text-[#444444] hover:bg-[#F7F7F5]'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-[#E7E7E7]">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>Max Price:</span>
                  <span>{formatMoney(filters.maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-[#111111]"
                />
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full py-3 bg-[#111111] text-white text-xs font-bold rounded-xl"
                >
                  View {filteredProducts.length} Results
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
