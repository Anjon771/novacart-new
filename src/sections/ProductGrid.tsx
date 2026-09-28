import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../snippets/ProductCard';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Flame } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { setActivePage } = useStore();

  // Grab the 8 best sellers specified in user prompt
  const bestSellers = PRODUCTS.slice(0, 8);

  return (
    <section id="best-sellers-section" className="py-16 md:py-24 bg-[#F7F7F5] border-b border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold tracking-wider uppercase mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Trending Worldwide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111111]">
              Customer Favorites
            </h2>
            <p className="text-sm text-[#666666] mt-1.5 font-normal max-w-lg">
              Products our customers keep coming back for. Tested for performance, reliability, and everyday delight.
            </p>
          </div>

          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#111111] hover:text-black hover:underline underline-offset-4 transition-all"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Columns Desktop, 3 Columns Tablet, 2 Columns Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-3 px-6 bg-white border border-[#E7E7E7] text-xs font-bold tracking-wider uppercase text-[#111111] rounded-xl shadow-2xs"
          >
            View All Bestsellers (12+)
          </button>
        </div>

      </div>
    </section>
  );
};
