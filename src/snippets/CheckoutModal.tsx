import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShieldCheck,
  Lock,
  Truck,
  CheckCircle,
  CreditCard,
  ArrowRight,
  ShoppingBag,
  Sparkles
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    appliedCoupon,
    clearCart,
    formatMoney,
    currency,
    showToast
  } = useStore();

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    email: 'alex.morgan@example.com',
    firstName: 'Alex',
    lastName: 'Morgan',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zip: '97477',
    country: currency.country,
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '•••'
  });

  if (!isCheckoutOpen) return null;

  const total = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    clearCart();
    showToast('Order confirmed! Check your email for tracking updates.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => {
          if (step === 'success') {
            setStep('details');
          }
          setIsCheckoutOpen(false);
        }}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-[#E7E7E7] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Top Brand Bar */}
          <div className="bg-[#111111] text-white p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white text-[#111111] font-bold flex items-center justify-center text-xs">
                N
              </div>
              <span className="text-base font-bold tracking-tight">NovaCart Checkout</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-300">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>SSL Encrypted Checkout</span>
              </div>
              <button
                onClick={() => {
                  setStep('details');
                  setIsCheckoutOpen(false);
                }}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {step === 'success' ? (
            /* Order Success View */
            <div className="p-8 sm:p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#1F7A4D] flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1F7A4D] mb-1">
                ORDER #NC-89240 CONFIRMED
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-3">
                Thank you for your order, {formData.firstName}!
              </h2>
              <p className="text-sm text-[#666666] max-w-md mb-8 leading-relaxed">
                We've sent an order confirmation and international courier tracking details to <strong className="text-[#111111]">{formData.email}</strong>.
              </p>

              <div className="w-full max-w-md p-4 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7] text-left text-xs space-y-2 mb-8">
                <div className="flex justify-between">
                  <span className="text-[#777777]">Delivery To:</span>
                  <span className="font-semibold text-[#111111]">{formData.address}, {formData.city}, {formData.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">Estimated Delivery:</span>
                  <span className="font-semibold text-[#1F7A4D]">3–5 Business Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">Payment Method:</span>
                  <span className="font-semibold text-[#111111]">Card ending in 4242</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setStep('details');
                  setIsCheckoutOpen(false);
                }}
                className="px-8 py-3.5 bg-[#111111] text-white text-xs font-bold tracking-wider uppercase rounded-xl hover:bg-black transition-colors"
              >
                RETURN TO STORE
              </button>
            </div>
          ) : (
            /* Checkout Flow */
            <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Left Form: Express Pay & Inputs (md: 7 cols) */}
              <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
                
                {/* Express Checkout Options */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888] block text-center mb-2.5">
                    Express Checkout
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setStep('success')}
                      className="py-2.5 bg-[#5A31F4] text-white rounded-xl text-xs font-bold hover:opacity-95 shadow-2xs"
                    >
                      Shop Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep('success')}
                      className="py-2.5 bg-black text-white rounded-xl text-xs font-bold hover:opacity-95 shadow-2xs"
                    >
                      Apple Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep('success')}
                      className="py-2.5 bg-[#FFC439] text-[#111111] rounded-xl text-xs font-bold hover:opacity-95 shadow-2xs"
                    >
                      PayPal
                    </button>
                  </div>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-[#E7E7E7] w-full" />
                  <span className="bg-white px-3 text-[11px] font-semibold uppercase tracking-wider text-[#888888] absolute">
                    Or pay with card
                  </span>
                </div>

                {/* Form fields */}
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1">
                      Email address for order tracking
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E7E7E7] rounded-xl text-xs text-[#111111] focus:outline-hidden focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        First name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E7E7E7] rounded-xl text-xs text-[#111111] focus:outline-hidden focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        Last name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E7E7E7] rounded-xl text-xs text-[#111111] focus:outline-hidden focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E7E7E7] rounded-xl text-xs text-[#111111] focus:outline-hidden focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#E7E7E7] rounded-xl text-xs text-[#111111]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">State / Prov</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#E7E7E7] rounded-xl text-xs text-[#111111]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#E7E7E7] rounded-xl text-xs text-[#111111]"
                      />
                    </div>
                  </div>

                  {/* Payment Mock */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-[#111111] mb-1">
                      Payment Details
                    </label>
                    <div className="p-3 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#111111]">Credit / Debit Card</span>
                        <div className="flex items-center gap-1.5 text-neutral-500">
                          <CreditCard className="w-4 h-4 text-[#111111]" />
                          <span>Encrypted</span>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        readOnly
                        className="w-full px-3 py-2 bg-white border border-[#E7E7E7] rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#111111] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-4"
                  >
                    <Lock className="w-4 h-4" />
                    <span>PAY {formatMoney(total)} SECURELY</span>
                  </button>
                </form>

              </div>

              {/* Right Order Summary (md: 5 cols) */}
              <div className="md:col-span-5 bg-[#F7F7F5] p-6 sm:p-8 border-t md:border-t-0 md:border-l border-[#E7E7E7] flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-4">
                    Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                  </h3>

                  {/* Mini item list */}
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.title}
                            className="w-12 h-12 rounded-lg object-cover bg-white border border-[#E7E7E7]"
                          />
                          <div>
                            <p className="font-bold text-[#111111] line-clamp-1">{item.product.title}</p>
                            <p className="text-[11px] text-[#777777]">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-extrabold text-[#111111]">
                          {formatMoney(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Price Calculations */}
                  <div className="mt-6 pt-4 border-t border-[#E7E7E7] space-y-2 text-xs text-[#555555]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#111111]">{formatMoney(cartSubtotal)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Discount ({appliedCoupon})</span>
                        <span>-{formatMoney(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Tracked Shipping</span>
                      <span className="font-semibold text-[#111111]">
                        {shippingFee === 0 ? <span className="text-[#1F7A4D]">FREE</span> : formatMoney(shippingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-[#111111] pt-3 border-t border-[#E7E7E7]">
                      <span>Total ({currency.code})</span>
                      <span>{formatMoney(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Trust guarantee badge */}
                <div className="mt-6 pt-4 border-t border-[#E7E7E7] flex items-center gap-2 text-[11px] text-[#666666]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>30-Day Money Back Guarantee on all international deliveries.</span>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
