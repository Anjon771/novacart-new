import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  User,
  ArrowRight,
  ShieldCheck,
  Package
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { CURRENCIES } from '../data/currencies';
import { CurrencyCode } from '../types';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    navigateToCategory,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    currency,
    setCurrencyCode
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-white/95 backdrop-blur-md ${
          isScrolled
            ? 'py-3 shadow-xs border-b border-[#E7E7E7]'
            : 'py-4 border-b border-[#E7E7E7]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Mobile: Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#111111] hover:text-black rounded-lg"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Logo: NovaCart */}
            <div className="flex items-center gap-8">
              <button
                onClick={() => {
                  setActivePage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 group text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-[#111111] flex items-center justify-center text-white font-bold text-sm tracking-tight transition-transform group-hover:scale-105">
                  N
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-[#111111] leading-none">
                    NovaCart
                  </span>
                  <span className="text-[9px] font-medium tracking-widest uppercase text-[#888888] mt-0.5">
                    Everyday Essentials
                  </span>
                </div>
              </button>

              {/* Desktop Nav Items */}
              <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
                <button
                  onClick={() => setActivePage('home')}
                  className={`transition-colors py-1 relative ${
                    activePage === 'home'
                      ? 'text-[#111111] font-semibold'
                      : 'text-[#555555] hover:text-[#111111]'
                  }`}
                >
                  Home
                  {activePage === 'home' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#111111] rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActivePage('shop')}
                  className={`transition-colors py-1 relative ${
                    activePage === 'shop'
                      ? 'text-[#111111] font-semibold'
                      : 'text-[#555555] hover:text-[#111111]'
                  }`}
                >
                  Shop
                  {activePage === 'shop' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#111111] rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => {
                    setActivePage('shop');
                    // filter or scroll to new arrivals
                    const el = document.getElementById('new-arrivals-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[#555555] hover:text-[#111111] transition-colors py-1"
                >
                  New Arrivals
                </button>

                <button
                  onClick={() => {
                    setActivePage('home');
                    const el = document.getElementById('best-sellers-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[#555555] hover:text-[#111111] transition-colors py-1"
                >
                  Best Sellers
                </button>

                {/* Collections Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsCollectionsDropdownOpen(true)}
                  onMouseLeave={() => setIsCollectionsDropdownOpen(false)}
                >
                  <button
                    onClick={() => setActivePage('shop')}
                    className="flex items-center gap-1 text-[#555555] hover:text-[#111111] transition-colors py-1"
                  >
                    <span>Collections</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCollectionsDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Flyout Menu */}
                  {isCollectionsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#E7E7E7] p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#888888] px-3 py-1.5 border-b border-[#F0F0EE]">
                        Product Categories
                      </div>
                      <div className="py-1">
                        {CATEGORIES.map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              navigateToCategory(cat.slug);
                              setIsCollectionsDropdownOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2 text-sm text-[#333333] hover:text-black hover:bg-[#F7F7F5] rounded-lg transition-colors group text-left"
                          >
                            <span className="font-medium">{cat.name}</span>
                            <span className="text-xs text-[#888888] group-hover:text-black transition-colors">
                              {cat.itemCount} items
                            </span>
                          </button>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-[#F0F0EE]">
                        <button
                          onClick={() => {
                            setActivePage('shop');
                            setIsCollectionsDropdownOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#111111] hover:bg-[#F7F7F5] rounded-lg transition-colors"
                        >
                          <span>View All Products</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setActivePage('about')}
                  className={`transition-colors py-1 relative ${
                    activePage === 'about'
                      ? 'text-[#111111] font-semibold'
                      : 'text-[#555555] hover:text-[#111111]'
                  }`}
                >
                  Our Story
                </button>
              </nav>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#222222] hover:text-black hover:bg-[#F7F7F5] rounded-full transition-colors"
                aria-label="Search products"
                title="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account icon */}
              <button
                onClick={() => setIsAccountModalOpen(true)}
                className="hidden sm:flex p-2 text-[#222222] hover:text-black hover:bg-[#F7F7F5] rounded-full transition-colors"
                aria-label="Customer Account"
                title="Customer Account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Wishlist button with count */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="p-2 text-[#222222] hover:text-black hover:bg-[#F7F7F5] rounded-full transition-colors relative"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#111111] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Drawer button with count */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 py-1.5 px-3 bg-[#111111] hover:bg-black text-white rounded-full transition-all duration-200 ml-1 shadow-xs group"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-xs font-semibold tracking-wide">
                  {cartCount}
                </span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm bg-white h-full flex flex-col z-10 shadow-2xl p-6 overflow-y-auto">
            
            {/* Top close bar */}
            <div className="flex items-center justify-between pb-5 border-b border-[#E7E7E7]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#111111] flex items-center justify-center text-white font-bold text-xs">
                  N
                </div>
                <span className="font-bold text-lg text-[#111111]">NovaCart</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-neutral-500 hover:text-black rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-2 py-6 text-base font-semibold text-[#111111]">
              <button
                onClick={() => {
                  setActivePage('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between p-2.5 rounded-lg text-left ${activePage === 'home' ? 'bg-[#F7F7F5]' : 'hover:bg-[#F7F7F5]'}`}
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </button>

              <button
                onClick={() => {
                  setActivePage('shop');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between p-2.5 rounded-lg text-left ${activePage === 'shop' ? 'bg-[#F7F7F5]' : 'hover:bg-[#F7F7F5]'}`}
              >
                <span>Shop All</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </button>

              {/* Categories Accordion inside mobile menu */}
              <div className="pt-2 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888] px-2.5 block mb-2">
                  Featured Collections
                </span>
                <div className="space-y-1 pl-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        navigateToCategory(cat.slug);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between py-2 px-2.5 text-sm font-medium text-[#444444] hover:text-black hover:bg-[#F7F7F5] rounded-lg text-left"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-neutral-400">{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setActivePage('about');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between p-2.5 rounded-lg text-left hover:bg-[#F7F7F5]"
              >
                <span>Our Story</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </button>

              <button
                onClick={() => {
                  setActivePage('shipping');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between p-2.5 rounded-lg text-left hover:bg-[#F7F7F5]"
              >
                <span>Shipping & Returns</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </button>

              <button
                onClick={() => {
                  setActivePage('faq');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between p-2.5 rounded-lg text-left hover:bg-[#F7F7F5]"
              >
                <span>FAQ & Help</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </button>
            </nav>

            {/* Currency selector inside mobile menu */}
            <div className="mt-auto pt-6 border-t border-[#E7E7E7]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#777777] block mb-2.5">
                Shipping Destination & Currency
              </span>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                  const item = CURRENCIES[code];
                  const isSelected = item.code === currency.code;
                  return (
                    <button
                      key={code}
                      onClick={() => setCurrencyCode(code)}
                      className={`flex items-center gap-2 p-2.5 text-xs rounded-lg border text-left transition-colors ${
                        isSelected
                          ? 'border-[#111111] bg-[#111111] text-white font-semibold'
                          : 'border-[#E7E7E7] text-[#333333] hover:bg-[#F7F7F5]'
                      }`}
                    >
                      <span className="text-sm">{item.flag}</span>
                      <span>{item.code} ({item.symbol})</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 p-3 bg-[#F7F7F5] rounded-xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#1F7A4D] shrink-0" />
                <div className="text-xs text-[#555555]">
                  <p className="font-semibold text-[#111111]">100% Guaranteed</p>
                  <p>30-Day Money Back Returns</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Account Info Modal */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsAccountModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E7E7E7] z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E7]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#F7F7F5] flex items-center justify-center text-[#111111]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#111111] text-base">NovaCart Member Account</h3>
                  <p className="text-xs text-[#666666]">Track orders & manage favorites</p>
                </div>
              </div>
              <button
                onClick={() => setIsAccountModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-black rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div className="p-3.5 bg-[#F7F7F5] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-[#111111]" />
                  <div>
                    <p className="text-xs font-semibold text-[#111111]">Order Tracking</p>
                    <p className="text-[11px] text-[#666666]">Instant lookup for US, CA, UK & AU</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsAccountModalOpen(false);
                    setActivePage('shipping');
                  }}
                  className="px-3 py-1.5 bg-white border border-[#E7E7E7] text-xs font-semibold text-[#111111] rounded-lg hover:bg-neutral-50"
                >
                  Lookup
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#333333] mb-1.5">
                  Sign in with Email
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  defaultValue="anjonbarua771@gmail.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E7E7E7] rounded-xl focus:outline-hidden focus:border-[#111111]"
                />
              </div>

              <button
                onClick={() => setIsAccountModalOpen(false)}
                className="w-full py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors"
              >
                Sign In / Access Account
              </button>

              <p className="text-center text-[11px] text-[#888888]">
                Prototype account mode enabled. All customer data remains client-side.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
