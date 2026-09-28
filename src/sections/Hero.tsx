import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, ShieldCheck, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <section className="relative overflow-hidden bg-[#F7F7F5] border-b border-[#E7E7E7]">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-neutral-200/50 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl">
            
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E7E7E7] rounded-full w-fit mb-6 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F7A4D] animate-pulse" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#111111]">
                NEW SEASON 2026
              </span>
              <span className="text-neutral-300">|</span>
              <span className="text-[11px] font-medium text-[#666666]">
                Curated for USA, CA, UK & AU
              </span>
            </div>

            {/* Large Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-[1.08] mb-6">
              Better Products. <br />
              <span className="text-[#555555]">Better Everyday.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed mb-8 max-w-xl font-normal">
              Discover thoughtfully selected products designed to make everyday life simpler, smarter, and better. Engineered for longevity, aesthetic balance, and effortless utility.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                onClick={() => {
                  setActivePage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#111111] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('featured-categories-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActivePage('shop');
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-neutral-50 text-[#111111] text-xs font-bold tracking-wider uppercase border border-[#E7E7E7] rounded-xl transition-colors shadow-2xs"
              >
                <span>EXPLORE COLLECTION</span>
              </button>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="pt-6 border-t border-[#E7E7E7] grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-sm font-bold text-[#111111]">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0</span>
                </div>
                <span className="text-[11px] text-[#666666]">Over 12,000+ Reviews</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-sm font-bold text-[#111111]">
                  <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
                  <span>Zero-Risk</span>
                </div>
                <span className="text-[11px] text-[#666666]">30-Day Money Back</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-sm font-bold text-[#111111]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1F7A4D]" />
                  <span>Express Dispatch</span>
                </div>
                <span className="text-[11px] text-[#666666]">Ships within 24 Hours</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Product Photography Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Lifestyle Hero Photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/60 bg-white aspect-4/5 group">
                <img
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85"
                  alt="Modern Minimalist Lifestyle Desk and Architectural Light"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-103"
                  loading="eager"
                />
                
                {/* Floating Product Highlight Card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-white/60 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=150&q=80"
                      alt="Magnetic Stand"
                      className="w-12 h-12 rounded-lg object-cover bg-neutral-100 border border-neutral-200"
                    />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#777777]">Featured Pick</p>
                      <h4 className="text-xs font-bold text-[#111111] line-clamp-1">MagSafe Desk Dock</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-extrabold text-[#111111]">$24.99</span>
                        <span className="text-[10px] text-[#888888] line-through">$34.99</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActivePage('shop')}
                    className="p-2.5 rounded-lg bg-[#111111] text-white hover:bg-black transition-colors"
                    title="View item"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Decorative Subtle Accent Tag */}
              <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#111111] text-white rounded-lg text-xs font-semibold shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Verified Quality</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
