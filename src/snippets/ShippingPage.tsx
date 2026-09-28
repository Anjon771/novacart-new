import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Truck,
  Package,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Globe,
  MapPin
} from 'lucide-react';

export const ShippingPage: React.FC = () => {
  const { showToast } = useStore();
  const [orderId, setOrderId] = useState('NC-89240');
  const [trackingResult, setTrackingResult] = useState<boolean>(true);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setTrackingResult(true);
    showToast(`Live status retrieved for order ${orderId.toUpperCase()}`, 'info');
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#F7F7F5] border-b border-[#E7E7E7] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#E7E7E7] flex items-center justify-center text-[#111111] mx-auto mb-4">
            <Truck className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] mb-3">
            Track Order & Shipping Guide
          </h1>
          <p className="text-sm sm:text-base text-[#666666] max-w-xl mx-auto font-normal">
            Real-time courier telemetry for orders shipping to the USA, Canada, United Kingdom, and Australia.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 space-y-12">
        
        {/* Track Order Tool */}
        <div className="bg-[#F7F7F5] rounded-3xl p-6 sm:p-8 border border-[#E7E7E7] shadow-xs">
          <h2 className="text-lg font-bold text-[#111111] mb-2">Track Your Package</h2>
          <p className="text-xs text-[#666666] mb-5">
            Enter your 7-character order ID (e.g. NC-89240) to inspect real-time courier checkpoints:
          </p>

          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-2.5 mb-8">
            <div className="relative flex-1">
              <Package className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. NC-89240"
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#E7E7E7] rounded-xl text-xs font-mono uppercase text-[#111111] focus:outline-hidden focus:border-black"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3 bg-[#111111] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-2"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Status</span>
            </button>
          </form>

          {/* Timeline visualization */}
          {trackingResult && (
            <div className="p-5 bg-white rounded-2xl border border-[#E7E7E7] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F0F0EE]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F7A4D]">
                    ● In Transit — On Schedule
                  </span>
                  <h3 className="text-sm font-bold text-[#111111] mt-0.5">
                    Order {orderId.toUpperCase()} (Air Courier Express)
                  </h3>
                </div>
                <div className="text-xs text-[#666666]">
                  Estimated Delivery: <strong className="text-[#111111]">In 2 Business Days</strong>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#E7E7E7] before:-z-0">
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-[#1F7A4D] text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#111111]">Order Verified & Packaged</span>
                      <span className="text-[11px] text-[#888888]">Oct 12, 09:30 AM</span>
                    </div>
                    <p className="text-xs text-[#666666] mt-0.5">Quality control passed. Packed in biodegradable bubble buffer.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-[#1F7A4D] text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#111111]">International Air Waybill Dispatched</span>
                      <span className="text-[11px] text-[#888888]">Oct 12, 04:15 PM</span>
                    </div>
                    <p className="text-xs text-[#666666] mt-0.5">Departed regional fulfillment terminal via Express Freight.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center shrink-0 ring-4 ring-neutral-100">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#111111]">Customs Clearance Completed</span>
                      <span className="text-[11px] text-[#888888]">Today, 08:20 AM</span>
                    </div>
                    <p className="text-xs text-[#666666] mt-0.5">Import documentation accepted with prepaid duties. Handed to local courier.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10 opacity-50">
                  <div className="w-7 h-7 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#111111]">Out for Final Delivery</span>
                      <span className="text-[11px] text-[#888888]">Expected in 48 hours</span>
                    </div>
                    <p className="text-xs text-[#666666] mt-0.5">Carrier driver will deposit safely at doorstep with signature option.</p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Global Delivery Matrix */}
        <div>
          <h2 className="text-xl font-bold text-[#111111] mb-4">
            Destination Shipping Times & Carriers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#111111]">🇺🇸 United States</span>
                <span className="text-xs font-bold text-[#1F7A4D]">FREE over $50</span>
              </div>
              <p className="text-xs text-[#666666]">Transit: 3–6 business days via USPS Tracked Delivery.</p>
            </div>

            <div className="p-4 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#111111]">🇨🇦 Canada</span>
                <span className="text-xs font-bold text-[#1F7A4D]">FREE over $50</span>
              </div>
              <p className="text-xs text-[#666666]">Transit: 4–7 business days via Canada Post Expedited.</p>
            </div>

            <div className="p-4 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#111111]">🇬🇧 United Kingdom</span>
                <span className="text-xs font-bold text-[#1F7A4D]">FREE over £40</span>
              </div>
              <p className="text-xs text-[#666666]">Transit: 3–6 business days via Royal Mail 48 Tracked.</p>
            </div>

            <div className="p-4 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#111111]">🇦🇺 Australia</span>
                <span className="text-xs font-bold text-[#1F7A4D]">FREE over A$75</span>
              </div>
              <p className="text-xs text-[#666666]">Transit: 5–8 business days via Australia Post Express.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
