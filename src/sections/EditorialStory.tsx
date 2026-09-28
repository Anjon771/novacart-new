import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Compass, Shield, HeartHandshake } from 'lucide-react';

export const EditorialStory: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <section className="py-16 md:py-24 bg-[#F7F7F5] border-b border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Lifestyle Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/5 bg-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85"
                alt="Mindful Morning Routine and Coffee Warmth"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              {/* Subtle Quote Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 backdrop-blur-md rounded-xl border border-white/60 shadow-lg">
                <p className="text-xs text-[#555555] italic font-serif leading-relaxed">
                  "NovaCart exists at the intersection of utility, aesthetic calm, and everyday reliability. No gimmicks, just better living."
                </p>
                <div className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                  — The NovaCart Design Studio
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Why NovaCart? */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#777777] mb-2 block">
              OUR PHILOSOPHY
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] mb-6 leading-tight">
              Why NovaCart?
            </h2>

            <p className="text-base sm:text-lg text-[#555555] leading-relaxed mb-8 font-normal">
              We believe great products should be useful, beautiful and accessible. That's why we carefully select products that solve real everyday problems—delivering clean design, uncompromising quality, and zero unnecessary markups.
            </p>

            {/* 3 Editorial Pillars */}
            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E7E7] flex items-center justify-center text-[#111111] shrink-0 mt-0.5">
                  <Compass className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111111]">Thoughtfully Curated</h4>
                  <p className="text-xs text-[#666666] mt-0.5 leading-relaxed">
                    We rigorously test hundreds of manufactured goods and select only the top 2% that meet strict durability and aesthetic standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E7E7] flex items-center justify-center text-[#111111] shrink-0 mt-0.5">
                  <Shield className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111111]">Direct-to-Consumer Integrity</h4>
                  <p className="text-xs text-[#666666] mt-0.5 leading-relaxed">
                    By bypassing traditional retail chains, we provide industrial-grade materials at fair, transparent everyday pricing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E7E7] flex items-center justify-center text-[#111111] shrink-0 mt-0.5">
                  <HeartHandshake className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111111]">Guaranteed Customer Peace of Mind</h4>
                  <p className="text-xs text-[#666666] mt-0.5 leading-relaxed">
                    Every order is protected by our 30-day money-back trial and end-to-end tracked courier delivery across US, CA, UK, and AU.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  setActivePage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#111111] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-xs group"
              >
                <span>OUR STORY</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
