import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    formatMoney,
    navigateToProduct,
    setActivePage
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#E7E7E7] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E7E7E7] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#111111] fill-[#111111]" />
              <h2 className="text-base font-bold text-[#111111]">
                My Saved Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-black rounded-lg"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F0F0EE]">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#F7F7F5] flex items-center justify-center text-neutral-400 mb-4">
                  <Heart className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="text-base font-bold text-[#111111] mb-1">Your wishlist is empty</h3>
                <p className="text-xs text-[#666666] max-w-xs mb-6 font-normal">
                  Tap the heart icon on any product to save items you love for later.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setActivePage('shop');
                  }}
                  className="px-6 py-3 bg-[#111111] text-white text-xs font-bold tracking-wider uppercase rounded-xl hover:bg-black transition-colors"
                >
                  DISCOVER PRODUCTS
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div key={product.id} className="py-4 flex gap-3.5 first:pt-0 last:pb-0">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    onClick={() => {
                      navigateToProduct(product);
                      setIsWishlistOpen(false);
                    }}
                    className="w-20 h-20 rounded-xl object-cover bg-[#F7F7F5] border border-[#E7E7E7] shrink-0 cursor-pointer"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            navigateToProduct(product);
                            setIsWishlistOpen(false);
                          }}
                          className="text-xs font-bold text-[#111111] line-clamp-1 hover:underline cursor-pointer"
                        >
                          {product.title}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-neutral-400 hover:text-[#C94C4C] p-0.5"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xs font-extrabold text-[#111111]">
                          {formatMoney(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-[10px] text-[#888888] line-through">
                            {formatMoney(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-2.5">
                      <button
                        onClick={() => {
                          addToCart(product, 1);
                          toggleWishlist(product);
                        }}
                        className="w-full py-2 px-3 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-4 border-t border-[#E7E7E7] bg-[#F7F7F5]">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => addToCart(p, 1));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3 bg-[#111111] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>MOVE ALL TO CART</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
