import React from 'react';
import { useStore } from '../context/StoreContext';
import { CURRENCIES } from '../data/currencies';
import { CurrencyCode } from '../types';
import {
  CreditCard,
  Globe,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, navigateToCategory, currency, setCurrencyCode } = useStore();

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Column 1: Brand & Bio (lg: 4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#111111] font-bold text-sm">
                N
              </div>
              <span className="text-xl font-bold tracking-tight text-white">NovaCart</span>
            </div>
            
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed max-w-sm font-normal">
              Thoughtfully selected products for modern everyday living. Engineered for function, simplicity, and understated elegance.
            </p>

            <div className="flex items-center gap-3 text-neutral-400">
              <a href="#instagram" className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:text-white hover:border-neutral-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:text-white hover:border-neutral-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:text-white hover:border-neutral-700 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:text-white hover:border-neutral-700 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: SHOP (lg: 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => {
                    setActivePage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('shop');
                    const el = document.getElementById('new-arrivals-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('home');
                    const el = document.getElementById('best-sellers-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCategory('home-living')}
                  className="hover:text-white transition-colors"
                >
                  Home & Living
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCategory('tech-accessories')}
                  className="hover:text-white transition-colors"
                >
                  Tech Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Sale & Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: HELP (lg: 3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4">
              HELP & SUPPORT
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => {
                    setActivePage('shipping');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('shipping');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Shipping Rates & Timelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('shipping');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Easy 30-Day Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Contact Support Team
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: COMPANY & REGION (lg: 3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4">
              COMPANY & POLICIES
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400 mb-6">
              <li>
                <button
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  About NovaCart
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Our Design Standard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy & Terms
                </button>
              </li>
            </ul>

            {/* Currency selector inside footer */}
            <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-xl">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                Region / Currency
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                  const item = CURRENCIES[code];
                  const isSelected = item.code === currency.code;
                  return (
                    <button
                      key={code}
                      onClick={() => setCurrencyCode(code)}
                      className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium border text-left transition-colors ${
                        isSelected
                          ? 'bg-neutral-800 border-neutral-700 text-white font-bold'
                          : 'border-transparent text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                      }`}
                    >
                      <span>{item.flag}</span>
                      <span>{item.code}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright, Trust Badges, Payment Icons */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>© 2026 NovaCart Inc. All rights reserved. Dedicated to USA, CA, UK & AU.</span>
          </div>

          {/* Realistic Payment Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-semibold text-neutral-300">
              VISA
            </span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-semibold text-neutral-300">
              Mastercard
            </span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-semibold text-neutral-300">
              AMEX
            </span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-semibold text-neutral-300">
              Apple Pay
            </span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-semibold text-neutral-300">
              Google Pay
            </span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-semibold text-neutral-300">
              PayPal
            </span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-semibold text-neutral-300">
              Shop Pay
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};
