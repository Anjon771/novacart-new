import React from 'react';
import { SOCIAL_GALLERY_IMAGES } from '../data/products';
import { Instagram } from 'lucide-react';

export const SocialGallery: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-[#F7F7F5] border-b border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#777777] mb-2">
            <Instagram className="w-3.5 h-3.5 text-[#111111]" />
            <span>COMMUNITY SPOTLIGHT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            @novacart
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-1.5 font-normal">
            See how our community uses their favorite finds. Tag #NovaCartLiving to be featured.
          </p>
        </div>

        {/* 6 Square Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SOCIAL_GALLERY_IMAGES.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-200 cursor-pointer shadow-2xs"
            >
              <img
                src={item.image}
                alt={item.product}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Dark subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-white">
                <Instagram className="w-6 h-6 mb-2 text-white" />
                <span className="text-xs font-bold">{item.handle}</span>
                <span className="text-[10px] text-neutral-300 line-clamp-1 mt-0.5">{item.product}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
