import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Compass, Heart, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Editorial Header */}
      <div className="bg-[#F7F7F5] border-b border-[#E7E7E7] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#777777] mb-3 block">
            ABOUT NOVACART
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight mb-4">
            Designed for Purpose.<br />Crafted for Everyday Life.
          </h1>
          <p className="text-base sm:text-lg text-[#555555] max-w-2xl mx-auto font-normal leading-relaxed">
            NovaCart was born out of a desire for simplicity. In a world flooded with disposable novelty items, we curate everyday essentials that earn their place in your home.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 space-y-16">
        
        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden aspect-4/3 bg-neutral-100 border border-[#E7E7E7]">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
              alt="Design Studio workspace"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-4/3 bg-neutral-100 border border-[#E7E7E7]">
            <img
              src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80"
              alt="Artisan crafted modern interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Narrative */}
        <div className="prose max-w-none text-[#444444] space-y-6 text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-[#111111] tracking-tight">
            Our Curation Standard
          </h2>
          <p>
            Every product in our catalog goes through an uncompromising 4-week testing protocol. We evaluate ergonomics, material durability under daily stress, battery longevity, and visual harmony in living spaces. If an item fails on even one dimension, it doesn’t make the cut.
          </p>
          <p>
            By working directly with certified manufacturing partners worldwide, we circumvent conventional middleman markups. This direct model enables us to offer industrial-grade alloys, premium silicones, and ultra-durable braided textiles at straightforward, honest prices.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 bg-[#F7F7F5] rounded-2xl border border-[#E7E7E7]">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E7E7] flex items-center justify-center text-[#111111] mb-4">
              <Compass className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-bold text-sm text-[#111111] mb-1.5">Intelligent Utility</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              We focus on objects that solve concrete daily friction points without requiring lengthy manuals.
            </p>
          </div>

          <div className="p-6 bg-[#F7F7F5] rounded-2xl border border-[#E7E7E7]">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E7E7] flex items-center justify-center text-[#111111] mb-4">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-bold text-sm text-[#111111] mb-1.5">Tested Longevity</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Backed by our 30-day trial and 1-year product warranty with hassle-free replacements.
            </p>
          </div>

          <div className="p-6 bg-[#F7F7F5] rounded-2xl border border-[#E7E7E7]">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E7E7] flex items-center justify-center text-[#111111] mb-4">
              <Heart className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-bold text-sm text-[#111111] mb-1.5">Human Support</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Real support agents stationed in North America, the UK, and Australia ready to resolve questions.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#111111] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-sm"
          >
            <span>EXPLORE THE COLLECTION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
