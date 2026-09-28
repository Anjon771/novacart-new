/**
 * NovaCart - Premium Shopify Dropshipping Storefront Prototype
 * 
 * Liquid Architecture Mapping:
 * - layout/theme.liquid (StoreProvider, AnnouncementBar, Header, Main, Footer, Modals)
 * - sections/announcement-bar.liquid
 * - sections/header.liquid
 * - sections/hero.liquid
 * - sections/trust-features.liquid
 * - sections/featured-categories.liquid
 * - sections/featured-products.liquid (Best Sellers)
 * - sections/promotional-banner.liquid
 * - sections/new-arrivals.liquid
 * - sections/brand-story.liquid
 * - sections/customer-reviews.liquid
 * - sections/social-gallery.liquid
 * - sections/newsletter.liquid
 * - sections/footer.liquid
 * - snippets/cart-drawer.liquid
 * - snippets/search-modal.liquid
 * - snippets/quick-view-modal.liquid
 * - snippets/wishlist-drawer.liquid
 * - templates/product.liquid
 * - templates/collection.liquid
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './sections/AnnouncementBar';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { TrustStrip } from './sections/TrustStrip';
import { FeaturedCategories } from './sections/FeaturedCategories';
import { ProductGrid } from './sections/ProductGrid';
import { PromoBanner } from './sections/PromoBanner';
import { NewArrivals } from './sections/NewArrivals';
import { EditorialStory } from './sections/EditorialStory';
import { CustomerReviews } from './sections/CustomerReviews';
import { SocialGallery } from './sections/SocialGallery';
import { Newsletter } from './sections/Newsletter';
import { Footer } from './sections/Footer';

import { ShopPage } from './snippets/ShopPage';
import { ProductPage } from './snippets/ProductPage';
import { AboutPage } from './snippets/AboutPage';
import { FaqPage } from './snippets/FaqPage';
import { ShippingPage } from './snippets/ShippingPage';

import { CartDrawer } from './snippets/CartDrawer';
import { SearchModal } from './snippets/SearchModal';
import { QuickViewModal } from './snippets/QuickViewModal';
import { WishlistDrawer } from './snippets/WishlistDrawer';
import { CheckoutModal } from './snippets/CheckoutModal';
import { ToastContainer } from './snippets/ToastContainer';

const StoreContent: React.FC = () => {
  const { activePage } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111] antialiased selection:bg-neutral-900 selection:text-white">
      {/* Top sticky announcement & multi-currency selector */}
      <AnnouncementBar />

      {/* Main navigation header */}
      <Header />

      {/* Dynamic Page Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <Hero />
            <TrustStrip />
            <FeaturedCategories />
            <ProductGrid />
            <PromoBanner />
            <NewArrivals />
            <EditorialStory />
            <CustomerReviews />
            <SocialGallery />
            <Newsletter />
          </>
        )}

        {activePage === 'shop' && <ShopPage />}
        {activePage === 'product' && <ProductPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'faq' && <FaqPage />}
        {activePage === 'shipping' && <ShippingPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out & Modal Overlays */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <WishlistDrawer />
      <CheckoutModal />

      {/* Floating Interactive Toast Feedback */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
