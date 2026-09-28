import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CurrencyConfig, ProductVariant, ActivePage, FilterState } from '../types';
import { PRODUCTS, CategoryInfo, CATEGORIES } from '../data/products';
import { CURRENCIES, formatPrice } from '../data/currencies';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Navigation & Page State
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedCategory: CategoryInfo | null;
  setSelectedCategory: (cat: CategoryInfo | null) => void;
  navigateToProduct: (product: Product) => void;
  navigateToCategory: (categorySlug: string) => void;

  // Currency
  currency: CurrencyConfig;
  setCurrencyCode: (code: 'USD' | 'CAD' | 'GBP' | 'AUD') => void;
  formatMoney: (amountInUSD: number) => string;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  discountAmount: number;
  couponCode: string;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  shippingFee: number;
  freeShippingThresholdUSD: number;
  freeShippingRemainingUSD: number;
  freeShippingProgress: number; // 0 to 100
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Quick View
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Checkout Modal
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  // Shop Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Page routing
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryInfo | null>(CATEGORIES[0]);

  // Currency
  const [currency, setCurrency] = useState<CurrencyConfig>(CURRENCIES.USD);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Initial sample item for immediate UX warmth
    const initialProd = PRODUCTS[0];
    return [
      {
        id: `${initialProd.id}-default`,
        product: initialProd,
        quantity: 1,
        selectedVariant: initialProd.variants?.options[0]
      }
    ];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('WELCOME10');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(['prod-2', 'prod-6']);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Quick View
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Checkout Modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Shop Filters
  const initialFilters: FilterState = {
    category: 'all',
    minPrice: 0,
    maxPrice: 100,
    minRating: 0,
    sortBy: 'featured',
    searchQuery: ''
  };
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const resetFilters = () => setFilters(initialFilters);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const setCurrencyCode = (code: 'USD' | 'CAD' | 'GBP' | 'AUD') => {
    setCurrency(CURRENCIES[code]);
    showToast(`Currency set to ${CURRENCIES[code].name}`, 'info');
  };

  const formatMoney = (amountInUSD: number) => {
    return formatPrice(amountInUSD, currency);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);

  const freeShippingThresholdUSD = 50.00;
  const freeShippingRemainingUSD = Math.max(0, freeShippingThresholdUSD - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThresholdUSD) * 100);

  const discountAmount = appliedCoupon ? cartSubtotal * 0.10 : 0;
  const shippingFee = cartSubtotal >= freeShippingThresholdUSD || cartSubtotal === 0 ? 0 : 4.99;

  const applyCoupon = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'WELCOME10' || trimmed === 'NOVACART10') {
      setAppliedCoupon(trimmed);
      showToast('10% discount code applied successfully!', 'success');
      return true;
    } else {
      showToast('Invalid promo code. Try "WELCOME10"', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed', 'info');
  };

  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    const effectiveVariant = variant || (product.variants ? product.variants.options[0] : undefined);
    const cartItemId = effectiveVariant ? `${product.id}-${effectiveVariant.id}` : `${product.id}-standard`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex].quantity += quantity;
        return nextCart;
      } else {
        return [
          ...prevCart,
          {
            id: cartItemId,
            product,
            quantity,
            selectedVariant: effectiveVariant
          }
        ];
      }
    });

    setIsCartOpen(true);
    showToast(`Added "${product.title}" to cart`, 'success');
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity: newQty } : item));
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    if (wishlist.includes(product.id)) {
      setWishlist(prev => prev.filter(id => id !== product.id));
      showToast(`Removed "${product.title}" from wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, product.id]);
      showToast(`Saved "${product.title}" to wishlist`, 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (categorySlug: string) => {
    const found = CATEGORIES.find(c => c.slug === categorySlug || c.name.toLowerCase() === categorySlug.toLowerCase());
    if (found) {
      setSelectedCategory(found);
      setFilters(prev => ({ ...prev, category: found.name }));
      setActivePage('collection');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActivePage('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [activePage]);

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProduct,
        setSelectedProduct,
        selectedCategory,
        setSelectedCategory,
        navigateToProduct,
        navigateToCategory,

        currency,
        setCurrencyCode,
        formatMoney,

        cart,
        cartCount,
        cartSubtotal,
        discountAmount,
        couponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        shippingFee,
        freeShippingThresholdUSD,
        freeShippingRemainingUSD,
        freeShippingProgress,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,

        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,

        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,

        quickViewProduct,
        setQuickViewProduct,

        isCheckoutOpen,
        setIsCheckoutOpen,

        toasts,
        showToast,

        filters,
        setFilters,
        resetFilters,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
