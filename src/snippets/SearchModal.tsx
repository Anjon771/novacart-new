import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight, ShoppingBag, Star } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    navigateToProduct,
    addToCart,
    formatMoney
  } = useStore();

  const [inputVal, setInputVal] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularTags = [
    'Mini Blender',
    'Desk Lamp',
    'MagSafe Stand',
    'Neck Fan',
    'Tech Organizer',
    'Wireless Charger',
    'Aroma Diffuser',
    'Motion Light'
  ];

  const trimmed = inputVal.trim().toLowerCase();
  const searchResults = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(trimmed) ||
          p.subtitle.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.tags.some((t) => t.toLowerCase().includes(trimmed))
      )
    : PRODUCTS.slice(0, 4); // show trending when empty

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="min-h-full flex items-start justify-center p-4 sm:p-6 lg:p-8 pt-12 sm:pt-20">
        <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E7E7E7] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
          
          {/* Search Header Bar */}
          <div className="p-4 sm:p-5 border-b border-[#E7E7E7] flex items-center gap-3">
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search products, categories, or essentials..."
              className="flex-1 text-base text-[#111111] placeholder:text-neutral-400 bg-transparent focus:outline-hidden"
            />
            {inputVal && (
              <button
                onClick={() => setInputVal('')}
                className="text-xs text-neutral-400 hover:text-black px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-black rounded-lg"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Popular searches suggestions */}
          <div className="px-5 py-3 bg-[#F7F7F5] border-b border-[#E7E7E7] flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888] shrink-0">
              Popular:
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setInputVal(tag)}
                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-white border border-[#E7E7E7] text-[#444444] hover:text-black hover:border-black transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Area */}
          <div className="p-5 max-h-96 overflow-y-auto divide-y divide-[#F0F0EE]">
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#777777]">
                {trimmed ? `Search Results (${searchResults.length})` : 'Trending Recommendations'}
              </span>
              {trimmed && (
                <span className="text-xs text-[#888888]">
                  for "{inputVal}"
                </span>
              )}
            </div>

            {searchResults.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm font-bold text-[#111111]">No products found</p>
                <p className="text-xs text-[#666666] mt-1">
                  Try searching for "blender", "stand", "lamp", or "diffuser"
                </p>
              </div>
            ) : (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    navigateToProduct(product);
                    setIsSearchOpen(false);
                  }}
                  className="py-3 flex items-center justify-between gap-4 group cursor-pointer hover:bg-[#F7F7F5] -mx-5 px-5 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-14 h-14 rounded-lg object-cover bg-neutral-100 border border-[#E7E7E7] shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#777777]">
                        {product.category}
                      </span>
                      <h4 className="text-sm font-semibold text-[#111111] group-hover:underline underline-offset-2">
                        {product.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex items-center text-[10px] font-bold text-amber-500">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400 mr-0.5" />
                          {product.rating}
                        </div>
                        <span className="text-xs font-bold text-[#111111]">
                          {formatMoney(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-[11px] text-[#888888] line-through">
                            {formatMoney(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="p-2 rounded-lg bg-[#111111] text-white hover:bg-black transition-colors"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="p-3 bg-[#F7F7F5] border-t border-[#E7E7E7] text-center text-[11px] text-[#888888]">
            Press <strong>ESC</strong> to close search or select any product to inspect details.
          </div>

        </div>
      </div>
    </div>
  );
};
