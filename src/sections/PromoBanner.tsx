import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#E7E7E7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#111111] text-white shadow-xl">
          
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=85"
              alt="Editorial Interior with Warm Ambient Light"
              className="w-full h-full object-cover object-center opacity-35 scale-102"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/85 to-transparent" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-bold tracking-widest uppercase text-white/90 mb-6 border border-white/15">
              <span>SPECIAL PROMOTION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Upgrade Your Everyday
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 mb-8 font-normal leading-relaxed">
              Smart, useful and beautifully designed products selected for modern living. Elevate your morning routine, workspace productivity, and evening tranquility.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-sm text-neutral-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero middlemen pricing</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Worldwide express tracking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Strict quality inspection</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hassle-free 30-day refunds</span>
              </div>
            </div>

            <button
              onClick={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#111111] hover:bg-neutral-100 text-xs font-bold tracking-wider uppercase rounded-xl transition-all duration-200 shadow-lg group"
            >
              <span>SHOP THE COLLECTION</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
