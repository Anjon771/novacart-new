import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';
import { ProductVariant } from '../types';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatMoney,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateToProduct
  } = useStore();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(() => {
    return quickViewProduct?.variants ? quickViewProduct.variants.options[0] : undefined;
  });

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isInWishlist(product.id);

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-[#E7E7E7] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm text-neutral-500 hover:text-black hover:bg-white shadow-xs transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Gallery Left */}
            <div className="bg-[#F7F7F5] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E7E7E7]">
              <div className="aspect-square rounded-xl overflow-hidden bg-white border border-[#E7E7E7] relative">
                <img
                  src={product.images[selectedImgIndex] || product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                />
                {product.isSale && discountPercent > 0 && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#C94C4C] text-white">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-white ${
                        selectedImgIndex === idx ? 'border-[#111111] shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Right */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#777777]">
                  {product.category}
                </span>

                <h2 className="text-xl sm:text-2xl font-bold text-[#111111] mt-1 leading-snug">
                  {product.title}
                </h2>

                <div className="flex items-center gap-3 mt-2.5">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#111111]">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-4 pb-4 border-b border-[#F0F0EE]">
                  <span className="text-2xl font-extrabold text-[#111111]">
                    {formatMoney(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-[#888888] line-through font-medium">
                      {formatMoney(product.compareAtPrice)}
                    </span>
                  )}
                </div>

                {/* Short description */}
                <p className="text-xs text-[#555555] leading-relaxed mt-4">
                  {product.description}
                </p>

                {/* Variants Picker if available */}
                {product.variants && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#111111]">
                        {product.variants.type}: <span className="font-normal text-[#666666]">{selectedVariant?.value || product.variants.options[0].value}</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.options.map((opt) => {
                        const isSelected = (selectedVariant?.id || product.variants?.options[0].id) === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedVariant(opt)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                              isSelected
                                ? 'border-[#111111] bg-[#111111] text-white shadow-2xs'
                                : 'border-[#E7E7E7] text-[#333333] hover:border-black'
                            }`}
                          >
                            {opt.colorHex && (
                              <span
                                className="w-3 h-3 rounded-full border border-white/20"
                                style={{ backgroundColor: opt.colorHex }}
                              />
                            )}
                            <span>{opt.value}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity and Actions */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex items-center border border-[#E7E7E7] rounded-xl bg-white p-1">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-1.5 text-neutral-600 hover:text-black rounded-lg"
                      aria-label="Decrease"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-9 text-center text-xs font-bold text-[#111111]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="p-1.5 text-neutral-600 hover:text-black rounded-lg"
                      aria-label="Increase"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product, quantity, selectedVariant);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-3 px-6 bg-[#111111] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-xl border border-[#E7E7E7] transition-colors ${
                      inWishlist ? 'bg-[#111111] text-white' : 'hover:bg-[#F7F7F5] text-neutral-700'
                    }`}
                    title={inWishlist ? 'In wishlist' : 'Add to wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white text-white' : ''}`} />
                  </button>
                </div>

              </div>

              {/* View Full Product Details Link */}
              <div className="mt-6 pt-4 border-t border-[#F0F0EE] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-700 font-medium">
                  <Truck className="w-4 h-4" />
                  <span>Ships in 24 hours</span>
                </div>

                <button
                  onClick={() => {
                    navigateToProduct(product);
                    setQuickViewProduct(null);
                  }}
                  className="font-bold text-[#111111] hover:underline underline-offset-2 flex items-center gap-1"
                >
                  <span>Full Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
