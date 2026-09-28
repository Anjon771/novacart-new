import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartSubtotal,
    discountAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingFee,
    freeShippingRemainingUSD,
    freeShippingProgress,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    formatMoney,
    setIsCheckoutOpen,
    setActivePage
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);

  if (!isCartOpen) return null;

  const totalAmount = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#E7E7E7] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E7E7E7] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#111111]" />
              <h2 className="text-base font-bold text-[#111111]">
                Shopping Cart ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-black rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="p-4 bg-[#F7F7F5] border-b border-[#E7E7E7]">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#111111]">
              <Truck className="w-4 h-4 text-[#111111] shrink-0" />
              {freeShippingRemainingUSD > 0 ? (
                <span>
                  You are <strong className="text-[#111111]">{formatMoney(freeShippingRemainingUSD)}</strong> away from <strong className="text-[#1F7A4D]">FREE SHIPPING</strong>
                </span>
              ) : (
                <span className="text-[#1F7A4D] font-bold">
                  🎉 Congratulations! You have unlocked FREE SHIPPING
                </span>
              )}
            </div>

            {/* Progress meter */}
            <div className="w-full bg-[#E7E7E7] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#111111] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items Scrollable List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F0F0EE]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#F7F7F5] flex items-center justify-center text-neutral-400 mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="text-base font-bold text-[#111111] mb-1">Your cart is empty</h3>
                <p className="text-xs text-[#666666] max-w-xs mb-6 font-normal">
                  Explore our curated favorites and daily essentials designed to elevate your everyday.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('shop');
                  }}
                  className="px-6 py-3 bg-[#111111] text-white text-xs font-bold tracking-wider uppercase rounded-xl hover:bg-black transition-colors"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-3.5 first:pt-0 last:pb-0">
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 h-20 rounded-xl object-cover bg-[#F7F7F5] border border-[#E7E7E7] shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-[#111111] line-clamp-1 leading-snug">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-[#C94C4C] p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <p className="text-[11px] text-[#777777] mt-0.5">
                          {item.selectedVariant.name}: {item.selectedVariant.value}
                        </p>
                      )}

                      <div className="text-xs font-extrabold text-[#111111] mt-1">
                        {formatMoney(item.product.price)}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#E7E7E7] rounded-lg bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-l-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-r-lg transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#555555]">
                        Item total: {formatMoney(item.product.price * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E7E7E7] bg-white space-y-4">
              
              {/* Promo Code Accordion */}
              <div>
                {!showPromoInput && !appliedCoupon ? (
                  <button
                    onClick={() => setShowPromoInput(true)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#555555] hover:text-[#111111] transition-colors"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>Have a promo code? (Try WELCOME10)</span>
                  </button>
                ) : appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                    <span className="font-semibold">Coupon <strong>{appliedCoupon}</strong> (10% OFF) applied</span>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-emerald-900 underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E7E7E7] rounded-lg uppercase tracking-wider"
                    />
                    <button
                      onClick={() => {
                        if (applyCoupon(inputCoupon)) {
                          setShowPromoInput(false);
                          setInputCoupon('');
                        }
                      }}
                      className="px-3 py-1.5 bg-[#111111] text-white text-xs font-bold rounded-lg hover:bg-black"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Subtotal Calculations */}
              <div className="space-y-1.5 text-xs text-[#555555] border-t border-[#F0F0EE] pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#111111]">{formatMoney(cartSubtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount (10%)</span>
                    <span>-{formatMoney(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? (
                      <span className="text-[#1F7A4D] font-bold">FREE</span>
                    ) : (
                      formatMoney(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#111111] pt-2 border-t border-[#F0F0EE]">
                  <span>Estimated Total</span>
                  <span>{formatMoney(totalAmount)}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3.5 bg-[#111111] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>CHECKOUT NOW</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-[#777777] pt-1">
                  <div className="flex items-center gap-1.5 text-[#1F7A4D] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>256-bit Secure Checkout</span>
                  </div>
                  <button
                    onClick={clearCart}
                    className="hover:text-[#C94C4C] underline transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
