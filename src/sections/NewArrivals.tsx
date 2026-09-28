import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../snippets/ProductCard';
import { Sparkles } from 'lucide-react';

export const NewArrivals: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Home' | 'Tech' | 'Beauty' | 'Lifestyle'>('All');

  const filterTabs = [
    { label: 'All', value: 'All' },
    { label: 'Home', value: 'Home' },
    { label: 'Tech', value: 'Tech' },
    { label: 'Beauty', value: 'Beauty' },
    { label: 'Lifestyle', value: 'Lifestyle' }
  ] as const;

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Home') return p.category.includes('Home');
    if (selectedFilter === 'Tech') return p.category.includes('Tech');
    if (selectedFilter === 'Beauty') return p.category.includes('Beauty');
    if (selectedFilter === 'Lifestyle') return p.category.includes('Lifestyle') || p.category.includes('Travel');
    return true;
  }).slice(0, 8);

  return (
    <section id="new-arrivals-section" className="py-16 md:py-24 bg-white border-b border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-[#111111] text-[11px] font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
            <span>FRESH DROPS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111111]">
            Just Landed
          </h2>
          <p className="text-sm text-[#666666] mt-2 font-normal">
            The newest innovations in daily utility, crafted with refined materials and thoughtful ergonomics.
          </p>
        </div>

        {/* Horizontal Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setSelectedFilter(tab.value)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'bg-[#F7F7F5] text-[#555555] hover:text-[#111111] hover:bg-[#EFEFEA]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={`new-${product.id}`} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
