import React from 'react';
import { CATEGORIES } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';

export const FeaturedCategories: React.FC = () => {
  const { navigateToCategory } = useStore();

  return (
    <section id="featured-categories-section" className="py-16 md:py-20 bg-white border-b border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E7E7E7]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#777777] block mb-1">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666666] max-w-md mt-2 sm:mt-0 font-normal">
            Explore focused edits designed to bring harmony, function, and refined minimalism into your space.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateToCategory(cat.slug)}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer bg-[#F7F7F5] border border-[#E7E7E7] shadow-xs"
            >
              {/* Category Background Image with Hover Scale */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/45" />

              {/* Category Info Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
                  
                  {/* Top category meta */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-300">
                      {cat.itemCount} Essentials
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#111111] transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold tracking-tight text-white mb-1.5 transition-colors">
                    {cat.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed font-normal opacity-90 group-hover:opacity-100 transition-opacity">
                    {cat.description}
                  </p>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
