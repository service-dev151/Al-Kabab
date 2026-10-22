/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero3DExperience } from './components/Hero3DExperience';
import { FeaturedDishes } from './components/FeaturedDishes';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { FoodpandaBanner } from './components/FoodpandaBanner';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactLocationSection } from './components/ContactLocationSection';
import { OrderDrawer, CartItem } from './components/OrderDrawer';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';
import { INITIAL_MENU_ITEMS, MenuItem, RESTAURANT_INFO } from './data/restaurantData';

export default function App() {
  // Language State: 'en' | 'ur'
  const [lang, setLang] = useState<'en' | 'ur'>(() => {
    const saved = localStorage.getItem('alkabab_lang');
    return (saved === 'ur' || saved === 'en') ? saved : 'en';
  });

  // Menu items state (allows manager editing & persistence)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('alkabab_menu');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_MENU_ITEMS;
  });

  // Order Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('alkabab_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync language with HTML dir and title
  useEffect(() => {
    localStorage.setItem('alkabab_lang', lang);
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.title = lang === 'en' 
      ? "Al Kabab Restaurant | Authentic Pakistani Cuisine" 
      : "الکباب ریسٹورنٹ | خالص روایتی پاکستانی ذائقہ";
  }, [lang]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('alkabab_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart operations
  const handleAddToCart = (dish: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (dishId: string) => {
    setCart((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Menu Admin Operations
  const handleSaveMenuItems = (newItems: MenuItem[]) => {
    setMenuItems(newItems);
    localStorage.setItem('alkabab_menu', JSON.stringify(newItems));
  };

  const handleResetDefaults = () => {
    setMenuItems(INITIAL_MENU_ITEMS);
    localStorage.removeItem('alkabab_menu');
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#123D2B] text-[#F5E7C5] selection:bg-[#C5A059] selection:text-[#123D2B]">
      {/* Top Bar Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section — Cinematic 3D Experience */}
        <Hero3DExperience
          lang={lang}
          onExploreMenu={scrollToMenu}
          onOrderNow={() => setIsCartOpen(true)}
        />

        {/* 2. Featured Dishes / Specialties */}
        <FeaturedDishes
          items={menuItems}
          lang={lang}
          onAddToCart={handleAddToCart}
        />

        {/* 3. Full Searchable Restaurant Menu */}
        <MenuSection
          items={menuItems}
          lang={lang}
          onAddToCart={handleAddToCart}
        />

        {/* 4. Heritage & Culinary Traditions */}
        <AboutSection lang={lang} />

        {/* 5. Foodpanda Delivery Integration Banner */}
        <FoodpandaBanner lang={lang} />

        {/* 6. Food & Ambiance Gallery */}
        <GallerySection lang={lang} />

        {/* 7. Genuine Customer Reviews (Google Maps & Foodpanda) */}
        <ReviewsSection lang={lang} />

        {/* 8. Contact, Directions, Hours & WhatsApp Booking */}
        <ContactLocationSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Cart Order Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        lang={lang}
      />

      {/* Secure Manager Portal Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        menuItems={menuItems}
        onSaveMenuItems={handleSaveMenuItems}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
