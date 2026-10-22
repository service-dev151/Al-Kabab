import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Phone, MapPin, Clock, ExternalLink, Heart, Lock } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'ur';
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenAdmin }) => {
  const isRtl = lang === 'ur';

  return (
    <footer 
      className="bg-[#0A2419] border-t border-[#F5E7C5]/15 pt-16 pb-12 relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#F5E7C5]/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4 text-left rtl:text-right">
            <a 
              href="#hero" 
              className="text-2xl font-bold font-editorial tracking-wider text-[#F5E7C5] inline-flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
              <span>AL KABAB</span>
            </a>
            <p className="text-xs text-[#F5E7C5]/70 leading-relaxed max-w-sm">
              {lang === 'en'
                ? 'Rahim Yar Khan’s premier authentic Pakistani charcoal barbecue destination. Fresh leavened tandoor flatbreads and slow-simmered handis crafted with timeless devotion.'
                : 'رحیم یار خان میں روایتی کوئلہ باربی کیو، تازہ خمیری روغنی نان اور خوشبودار شنواری کڑاہی کا بااعتماد نام۔'}
            </p>
            <p className="font-urdu text-sm text-[#DFBE7B]">
              ذائقہ جو نسلوں تک یاد رہے
            </p>
          </div>

          {/* Quick Nav Col */}
          <div className="lg:col-span-3 space-y-3 text-left rtl:text-right">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              {lang === 'en' ? 'Quick Links' : 'فوری روابط'}
            </h4>
            <ul className="space-y-2 text-xs text-[#F5E7C5]/75">
              <li>
                <a href="#hero" className="hover:text-[#DFBE7B] transition-colors">
                  {lang === 'en' ? 'Home' : 'صفحہ اول'}
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-[#DFBE7B] transition-colors">
                  {lang === 'en' ? 'Charcoal Specialties' : 'خاص باربی کیو'}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#DFBE7B] transition-colors">
                  {lang === 'en' ? 'Restaurant Menu' : 'مکمل مینو'}
                </a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-[#DFBE7B] transition-colors">
                  {lang === 'en' ? 'Heritage & Story' : 'روایت اور کہانی'}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#DFBE7B] transition-colors">
                  {lang === 'en' ? 'Table Reservation' : 'ٹیبل بکنگ'}
                </a>
              </li>
            </ul>
          </div>

          {/* Delivery & Ordering Links */}
          <div className="lg:col-span-2 space-y-3 text-left rtl:text-right">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              {lang === 'en' ? 'Order Channels' : 'آن لائن آرڈر'}
            </h4>
            <ul className="space-y-2 text-xs text-[#F5E7C5]/75">
              <li>
                <a 
                  href={RESTAURANT_INFO.foodpandaUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#DFBE7B] flex items-center gap-1.5"
                >
                  <span>Foodpanda (4.6★)</span>
                  <ExternalLink className="w-3 h-3 text-[#D70F64]" />
                </a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/923367257900`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#DFBE7B]"
                >
                  <span>WhatsApp Direct (+92 336 7257900)</span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${RESTAURANT_INFO.phonePrimary}`} 
                  className="hover:text-[#DFBE7B]"
                >
                  <span>Phone Takeaway (0336-7257900)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Contact Info */}
          <div className="lg:col-span-3 space-y-3 text-left rtl:text-right">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              {lang === 'en' ? 'Location & Timing' : 'پتہ اور اوقات'}
            </h4>
            <div className="space-y-2 text-xs text-[#F5E7C5]/75">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>{lang === 'en' ? RESTAURANT_INFO.addressEn : RESTAURANT_INFO.addressUr}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{lang === 'en' ? RESTAURANT_INFO.openingHoursEn : RESTAURANT_INFO.openingHoursUr}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="tabular-nums">0336-7257900 / 0308-7788987</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5E7C5]/50">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_INFO.nameEn} (Rahim Yar Khan). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-[#F5E7C5]/40 hover:text-[#DFBE7B] transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Manager Portal</span>
            </button>

            <span aria-hidden="true">·</span>

            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5E7C5] transition-colors"
            >
              Google Maps Profile
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
