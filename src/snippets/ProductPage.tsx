import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, DEMO_REVIEWS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductVariant } from '../types';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  Plus,
  Minus,
  CheckCircle2,
  ChevronRight,
  Share2,
  Sparkles,
  HelpCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';

export const ProductPage: React.FC = () => {
  const {
    selectedProduct,
    setActivePage,
    formatMoney,
    addToCart,
    toggleWishlist,
    isInWishlist,
    showToast,
    setIsCheckoutOpen
  } = useStore();

  const product = selectedProduct || PRODUCTS[0];
  const inWishlist = isInWishlist(product.id);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.options[0]
  );
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'specs' | 'shipping' | 'reviews' | 'faq'>('description');

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Breadcrumbs Bar */}
      <div className="border-b border-[#E7E7E7] bg-[#F7F7F5]/50 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#777777]">
            <button
              onClick={() => setActivePage('home')}
              className="hover:text-black transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button
              onClick={() => setActivePage('shop')}
              className="hover:text-black transition-colors"
            >
              Shop
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-black transition-colors">
              {product.category}
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#111111] font-medium line-clamp-1 max-w-xs">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12">
        
        {/* Back to catalog button */}
        <button
          onClick={() => setActivePage('shop')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#666666] hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* LEFT: Product Gallery (lg: 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Primary Display Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F7F7F5] border border-[#E7E7E7] shadow-xs group">
              <img
                src={product.images[activeImgIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
              />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.isSale && discountPercent > 0 && (
                  <span className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-[#C94C4C] text-white shadow-sm">
                    Save {discountPercent}%
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-[#1F7A4D] text-white shadow-sm">
                    Best Seller
                  </span>
                )}
              </div>

              {/* Top Right Share & Wishlist */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-neutral-700 hover:text-black hover:bg-white shadow-sm transition-colors"
                  title="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-full shadow-sm transition-colors ${
                    inWishlist
                      ? 'bg-[#111111] text-white'
                      : 'bg-white/90 backdrop-blur-sm text-neutral-700 hover:text-[#C94C4C] hover:bg-white'
                  }`}
                  title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white text-white' : ''}`} />
                </button>
              </div>

            </div>

            {/* Thumbnails row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-[#F7F7F5] transition-all shrink-0 ${
                      activeImgIndex === idx
                        ? 'border-[#111111] shadow-sm ring-2 ring-black/5'
                        : 'border-[#E7E7E7] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Gallery Trust Highlights */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7] text-center mt-2">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-[#111111] mb-1" />
                <span className="text-[11px] font-bold text-[#111111]">Express Shipping</span>
                <span className="text-[10px] text-[#666666]">US, CA, UK & AU Tracked</span>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCw className="w-4 h-4 text-[#111111] mb-1" />
                <span className="text-[11px] font-bold text-[#111111]">30-Day Trial</span>
                <span className="text-[10px] text-[#666666]">Hassle-Free Returns</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-[#111111] mb-1" />
                <span className="text-[11px] font-bold text-[#111111]">1-Year Warranty</span>
                <span className="text-[10px] text-[#666666]">Replacement Guarantee</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Product Buy Box & Configuration (lg: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Category & Rating */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#777777]">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#111111]">{product.rating}</span>
                <span className="text-xs text-[#888888]">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] leading-tight mb-2">
              {product.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] font-normal leading-relaxed mb-6">
              {product.subtitle}
            </p>

            {/* Price Box */}
            <div className="p-4 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7] mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-[#111111]">
                  {formatMoney(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-[#888888] line-through font-medium">
                    {formatMoney(product.compareAtPrice)}
                  </span>
                )}
                {product.isSale && discountPercent > 0 && (
                  <span className="text-xs font-bold text-[#C94C4C] bg-[#C94C4C]/10 px-2 py-0.5 rounded">
                    Save {discountPercent}% OFF
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#666666] mt-1.5 flex items-center gap-1">
                <span>Tax included.</span>
                <strong className="text-[#1F7A4D]">Free Shipping</strong>
                <span>on orders over $50 USD.</span>
              </p>
            </div>

            {/* Color/Variant Selection */}
            {product.variants && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    {product.variants.type}: <strong className="text-neutral-600 font-normal">{selectedVariant?.value || product.variants.options[0].value}</strong>
                  </span>
                  <span className="text-xs text-neutral-400">In Stock</span>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.options.map((opt) => {
                    const isSelected = (selectedVariant?.id || product.variants?.options[0].id) === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedVariant(opt)}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'border-[#111111] bg-[#111111] text-white shadow-xs'
                            : 'border-[#E7E7E7] text-[#333333] hover:border-black bg-white'
                        }`}
                      >
                        {opt.colorHex && (
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20"
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

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                
                {/* Stepper */}
                <div className="flex items-center border border-[#E7E7E7] rounded-xl bg-white p-1 shrink-0">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 text-neutral-600 hover:text-black rounded-lg"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-[#111111]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2 text-neutral-600 hover:text-black rounded-lg"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <button
                  onClick={() => addToCart(product, quantity, selectedVariant)}
                  className="flex-1 py-3.5 px-6 bg-[#111111] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>

              </div>

              {/* Buy Now / Express Checkout */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 bg-[#5A31F4] hover:bg-[#4825cc] text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>BUY NOW WITH SHOP PAY</span>
              </button>
            </div>

            {/* Conversion Bullet Points */}
            <div className="space-y-3 pt-6 border-t border-[#E7E7E7] text-xs text-[#555555]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1F7A4D] shrink-0" />
                <span>Orders dispatched within 24 hours with full tracking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1F7A4D] shrink-0" />
                <span>Customs & import duties prepaid for USA, CA, UK & AU</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1F7A4D] shrink-0" />
                <span>30-Day risk-free money back guarantee on all orders</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed In-Depth Information Section */}
        <div className="mt-16 pt-10 border-t border-[#E7E7E7]">
          
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#E7E7E7] overflow-x-auto no-scrollbar pb-1">
            {[
              { id: 'description', label: 'Description' },
              { id: 'features', label: 'Key Features' },
              { id: 'specs', label: 'Specifications' },
              { id: 'shipping', label: 'Shipping & Delivery' },
              { id: 'reviews', label: `Reviews (${product.reviewCount})` },
              { id: 'faq', label: 'Item FAQ' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-5 text-xs font-bold uppercase tracking-wider transition-colors relative shrink-0 ${
                  activeTab === tab.id
                    ? 'text-[#111111] font-extrabold'
                    : 'text-[#777777] hover:text-[#111111]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#111111]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content Panes */}
          <div className="py-8 max-w-4xl">
            {activeTab === 'description' && (
              <div className="space-y-4 text-sm text-[#555555] leading-relaxed">
                <p>{product.description}</p>
                <p>
                  At NovaCart, our mission is to eliminate excessive complexity. Every contour, material choice, and finish has been scrutinized to deliver maximum everyday utility without visual clutter.
                </p>
                <div className="p-4 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7] mt-4">
                  <h4 className="font-bold text-[#111111] text-xs uppercase tracking-wider mb-1">
                    Quality Promise
                  </h4>
                  <p className="text-xs text-[#666666]">
                    Manufactured in ISO-certified partner facilities using environmentally responsible recyclable packaging and non-toxic materials.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-3">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#444444]">
                    <CheckCircle2 className="w-5 h-5 text-[#1F7A4D] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="border border-[#E7E7E7] rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-[#E7E7E7]">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <tr key={key} className="even:bg-[#F7F7F5]">
                        <th className="py-3 px-4 font-bold text-[#111111] w-1/3 bg-[#F7F7F5]/50">
                          {key}
                        </th>
                        <td className="py-3 px-4 text-[#555555]">
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 text-xs text-[#555555]">
                <h4 className="font-bold text-sm text-[#111111]">Estimated International Transit Times</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7]">
                    <span className="font-bold text-[#111111] block">🇺🇸 United States</span>
                    <span>3 - 6 Business Days via USPS Tracked</span>
                  </div>
                  <div className="p-3.5 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7]">
                    <span className="font-bold text-[#111111] block">🇨🇦 Canada</span>
                    <span>4 - 7 Business Days via Canada Post Tracked</span>
                  </div>
                  <div className="p-3.5 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7]">
                    <span className="font-bold text-[#111111] block">🇬🇧 United Kingdom</span>
                    <span>3 - 6 Business Days via Royal Mail 48</span>
                  </div>
                  <div className="p-3.5 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7]">
                    <span className="font-bold text-[#111111] block">🇦🇺 Australia</span>
                    <span>5 - 8 Business Days via Australia Post Express</span>
                  </div>
                </div>
                <p className="mt-2 text-[#777777]">
                  All shipments receive real-time tracking numbers sent straight to your email. Duties and taxes are pre-cleared with zero surprise fees on delivery.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7]">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-[#111111]">
                      {product.rating} out of 5 stars based on {product.reviewCount} customer ratings
                    </span>
                  </div>
                  <button
                    onClick={() => showToast('Review submission form opened (prototype mode)', 'info')}
                    className="px-4 py-2 bg-white border border-[#E7E7E7] text-xs font-bold uppercase rounded-lg hover:bg-neutral-50"
                  >
                    Write a Review
                  </button>
                </div>

                <div className="divide-y divide-[#E7E7E7]">
                  {DEMO_REVIEWS.map((rev) => (
                    <div key={rev.id} className="py-4 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#111111]">{rev.author}</span>
                          <span className="text-[10px] text-[#1F7A4D] font-semibold">Verified Buyer</span>
                        </div>
                        <span className="text-[11px] text-[#888888]">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <h5 className="text-xs font-bold text-[#111111]">"{rev.title}"</h5>
                      <p className="text-xs text-[#555555] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-3">
                <div className="p-4 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7]">
                  <h4 className="text-xs font-bold text-[#111111] mb-1">How do returns work?</h4>
                  <p className="text-xs text-[#666666]">
                    You have 30 days from delivery to request a refund. Contact our support with your order number and we will provide a prepaid return slip.
                  </p>
                </div>
                <div className="p-4 bg-[#F7F7F5] rounded-xl border border-[#E7E7E7]">
                  <h4 className="text-xs font-bold text-[#111111] mb-1">Does this include universal charging cables?</h4>
                  <p className="text-xs text-[#666666]">
                    Yes! All battery or electronics items include high-speed USB-C braided charging cables compatible with worldwide power adapters.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Related Products Recommendation Grid */}
        <div className="mt-16 pt-12 border-t border-[#E7E7E7]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#777777] block mb-1">
                Complementary Additions
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
                You May Also Like
              </h3>
            </div>
            <button
              onClick={() => setActivePage('shop')}
              className="text-xs font-bold uppercase tracking-wider text-[#111111] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Mobile Add to Cart Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E7E7E7] p-3 z-30 shadow-lg flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] text-[#777777] line-clamp-1">{product.title}</span>
          <span className="text-sm font-extrabold text-[#111111]">{formatMoney(product.price)}</span>
        </div>
        <button
          onClick={() => addToCart(product, quantity, selectedVariant)}
          className="flex-1 max-w-xs py-3 px-4 bg-[#111111] text-white text-xs font-bold tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>

    </div>
  );
};
