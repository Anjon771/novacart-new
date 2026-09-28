import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: Truck,
      title: 'FREE SHIPPING',
      description: 'Fast delivery on qualifying orders over $50'
    },
    {
      icon: ShieldCheck,
      title: 'SECURE CHECKOUT',
      description: 'Protected 256-bit encrypted payments'
    },
    {
      icon: RefreshCw,
      title: '30-DAY RETURNS',
      description: 'Shop with total confidence and easy refunds'
    },
    {
      icon: Headphones,
      title: 'CUSTOMER SUPPORT',
      description: 'Dedicated 24/7 care team for US, CA, UK & AU'
    }
  ];

  return (
    <section className="bg-white border-b border-[#E7E7E7] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-xl transition-colors hover:bg-[#F7F7F5]"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F7F7F5] border border-[#E7E7E7] flex items-center justify-center text-[#111111] shrink-0">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#666666] leading-normal mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
