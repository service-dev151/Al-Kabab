import React, { useState } from 'react';
import { ShoppingBag, Globe, Menu, X, PhoneCall } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  lang: 'en' | 'ur';
  setLang: (lang: 'en' | 'ur') => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  cartCount,
  onOpenCart,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRtl = lang === 'ur';

  const navLinks = [
    { href: '#hero', labelEn: 'Home', labelUr: 'صفحہ اول' },
    { href: '#featured', labelEn: 'Specialties', labelUr: 'خاص ڈشز' },
    { href: '#menu', labelEn: 'Menu', labelUr: 'مکمل مینو' },
    { href: '#heritage', labelEn: 'Heritage', labelUr: 'روایت' },
    { href: '#reviews', labelEn: 'Reviews', labelUr: 'رائے' },
    { href: '#location', labelEn: 'Location', labelUr: 'پتہ اور رابطہ' },
  ];

  return (
    <header 
      className="sticky top-0 z-50 bg-[#123D2B]/95 backdrop-blur-md border-b border-[#F5E7C5]/15 transition-all"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#hero" 
          className="text-xl sm:text-2xl font-bold font-editorial tracking-wider text-[#F5E7C5] hover:text-[#DFBE7B] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
          <span>AL KABAB</span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#F5E7C5]/80">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#DFBE7B] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#C5A059]"
            >
              {lang === 'en' ? link.labelEn : link.labelUr}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + Language Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#F5E7C5]/20 hover:border-[#C5A059] text-xs font-semibold text-[#F5E7C5] transition-colors whitespace-nowrap shrink-0"
            title="Switch Language / زبان تبدیل کریں"
          >
            <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="tabular-nums">{lang === 'en' ? 'اردو' : 'English'}</span>
          </button>

          {/* Cart Bag Primary Action */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#C5A059] hover:bg-[#DFBE7B] text-[#123D2B] font-semibold text-xs transition-all whitespace-nowrap shrink-0 shadow-md active:scale-95"
            aria-label="View Order Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">
              {lang === 'en' ? 'Your Order' : 'آپ کا آرڈر'}
            </span>
            {cartCount > 0 && (
              <span className="bg-[#123D2B] text-[#F5E7C5] text-[11px] font-bold px-1.5 py-0.5 rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F5E7C5] hover:text-[#C5A059] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A2419] border-b border-[#F5E7C5]/15 px-4 pt-3 pb-5 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-[#F5E7C5] hover:text-[#C5A059] rounded-md transition-colors"
              >
                {lang === 'en' ? link.labelEn : link.labelUr}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#F5E7C5]/10 flex items-center justify-between">
            <a
              href={`tel:${RESTAURANT_INFO.phonePrimary}`}
              className="flex items-center gap-2 text-xs font-medium text-[#C5A059]"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{RESTAURANT_INFO.phonePrimary}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-xs text-[#F5E7C5]/50 hover:text-[#F5E7C5] underline"
            >
              Staff Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
