import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatMoney,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateToProduct,
    setQuickViewProduct
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || primaryImage;

  return (
    <div
      className="group relative flex flex-col bg-white rounded-xl transition-all duration-300 hover:shadow-md border border-[#E7E7E7]/80 hover:border-[#E7E7E7] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F7F7F5] cursor-pointer" onClick={() => navigateToProduct(product)}>
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isSale && discountPercent > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-[#C94C4C] text-white shadow-sm">
              Save {discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-[#111111] text-white shadow-sm">
              New
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-[#1F7A4D] text-white shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Top Right Actions: Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
            inWishlist
              ? 'bg-[#111111] text-white'
              : 'bg-white/90 backdrop-blur-sm text-[#111111] hover:bg-white hover:text-[#C94C4C]'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white text-white' : ''}`} />
        </button>

        {/* Quick View Button (Desktop Overlay) */}
        <div className="absolute inset-x-3 bottom-3 hidden md:flex items-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2.5 px-3 bg-white/95 backdrop-blur-sm hover:bg-white text-[#111111] text-xs font-semibold tracking-wide uppercase rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="py-2.5 px-3 bg-[#111111] hover:bg-black text-white text-xs font-semibold tracking-wide uppercase rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
            title="Quick Add"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col p-4 flex-1">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-[#777777]">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-medium text-[#111111]">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-[#888888]">({product.reviewCount})</span>
          </div>
        </div>

        <h3
          onClick={() => navigateToProduct(product)}
          className="text-sm font-semibold text-[#111111] line-clamp-1 group-hover:text-black cursor-pointer hover:underline underline-offset-2 mb-1"
        >
          {product.title}
        </h3>

        <p className="text-xs text-[#666666] line-clamp-1 mb-2.5">
          {product.subtitle}
        </p>

        {/* Variant Swatches Preview */}
        {product.variants && product.variants.options.length > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            {product.variants.options.map((opt) => (
              <span
                key={opt.id}
                title={opt.name}
                className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
                style={{ backgroundColor: opt.colorHex || '#ddd' }}
              />
            ))}
            <span className="text-[10px] text-[#888888] ml-1">
              {product.variants.options.length} colors
            </span>
          </div>
        )}

        {/* Pricing & Mobile Quick Add */}
        <div className="mt-auto pt-2 flex items-center justify-between border-t border-[#F0F0EE]">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-[#111111]">
              {formatMoney(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#888888] line-through">
                {formatMoney(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Mobile Direct Add Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="md:hidden p-2 rounded-lg bg-[#F7F7F5] hover:bg-[#111111] text-[#111111] hover:text-white transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
