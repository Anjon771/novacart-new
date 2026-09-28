import React from 'react';
import { useStore } from '../context/StoreContext';
import { CURRENCIES } from '../data/currencies';
import { CurrencyCode } from '../types';
import { ChevronDown, Globe } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { currency, setCurrencyCode } = useStore();

  return (
    <div className="bg-[#111111] text-white text-xs font-medium border-b border-neutral-800 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        
        {/* Desktop Left Hint */}
        <div className="hidden lg:flex items-center gap-2 text-neutral-400 text-[11px] tracking-wide">
          <span>Official Store for USA, Canada, UK & Australia</span>
        </div>

        {/* Center Announcement - Mobile Animated Marquee / Desktop Centered */}
        <div className="flex-1 overflow-hidden lg:flex lg:justify-center">
          <div className="lg:hidden animate-marquee whitespace-nowrap py-1">
            <span className="mx-6 tracking-wide">
              ✦ FREE SHIPPING ON ORDERS OVER $50 ✦ EASY 30-DAY RETURNS ✦ 10% OFF FIRST ORDER WITH CODE: <strong className="text-white underline">WELCOME10</strong>
            </span>
            <span className="mx-6 tracking-wide">
              ✦ FREE SHIPPING ON ORDERS OVER $50 ✦ EASY 30-DAY RETURNS ✦ 10% OFF FIRST ORDER WITH CODE: <strong className="text-white underline">WELCOME10</strong>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 tracking-wider text-[11px] font-semibold uppercase text-neutral-200">
            <span>FREE SHIPPING ON ORDERS OVER $50</span>
            <span className="text-neutral-500">•</span>
            <span>EASY 30-DAY RETURNS</span>
            <span className="text-neutral-500">•</span>
            <span>USE CODE <strong className="text-white underline decoration-neutral-500">WELCOME10</strong> FOR 10% OFF</span>
          </div>
        </div>

        {/* Currency Switcher Dropdown */}
        <div className="relative group shrink-0 ml-3">
          <button
            className="flex items-center gap-1.5 py-1 px-2 text-[11px] font-medium text-neutral-300 hover:text-white rounded transition-colors"
            aria-label="Select currency"
          >
            <Globe className="w-3 h-3 text-neutral-400" />
            <span>{currency.flag} {currency.code}</span>
            <ChevronDown className="w-3 h-3 text-neutral-400 group-hover:rotate-180 transition-transform" />
          </button>

          {/* Currency Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1 w-44 bg-[#181818] border border-neutral-700 rounded-lg shadow-xl py-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
              const item = CURRENCIES[code];
              const isSelected = item.code === currency.code;
              return (
                <button
                  key={code}
                  onClick={() => setCurrencyCode(code)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors ${
                    isSelected ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{item.flag}</span>
                    <span>{item.code}</span>
                  </span>
                  <span className="text-neutral-400 text-[11px]">{item.symbol}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
