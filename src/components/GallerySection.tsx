import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { Eye, X } from 'lucide-react';

interface GallerySectionProps {
  lang: 'en' | 'ur';
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const [activePhoto, setActivePhoto] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const isRtl = lang === 'ur';

  return (
    <section 
      id="gallery" 
      className="py-20 lg:py-28 bg-[#123D2B] relative"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#C5A059] uppercase">
              <span>{lang === 'en' ? 'Visual Chronicle' : 'الکباب کی تصویری جھلکیاں'}</span>
              <span aria-hidden="true">·</span>
              <span>{lang === 'en' ? 'Kitchen & Atmosphere' : 'باورچی خانہ اور ماحول'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#F5E7C5] tracking-tight">
              {lang === 'en' ? 'The Craft Behind Every Skewer' : 'ہر سیخ کے پیچھے استادوں کا فن'}
            </h2>
          </div>
          <p className="text-sm text-[#F5E7C5]/75 max-w-md">
            {lang === 'en'
              ? 'A glimpse into our open-flame kitchen, where clay tandoors meet glowing mangrove coal every single night.'
              : 'کھلی فضا میں دہکتے کوئلے، مٹی کے تندور اور ہمارے استادوں کی مہارت۔'}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActivePhoto(item)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#0A2419] border border-[#F5E7C5]/15 cursor-pointer shadow-lg hover:border-[#C5A059] transition-all"
            >
              <img
                src={item.image}
                alt={lang === 'en' ? item.titleEn : item.titleUr}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2419]/90 via-[#0A2419]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Text Tag */}
              <div className="absolute bottom-4 left-4 right-4 text-left rtl:text-right">
                <span className="text-[11px] text-[#C5A059] uppercase tracking-wider font-semibold block">
                  {lang === 'en' ? 'Al Kabab Experience' : 'الکباب کی خاص پیشکش'}
                </span>
                <h3 className="text-base font-bold text-[#F5E7C5]">
                  {lang === 'en' ? item.titleEn : item.titleUr}
                </h3>
                <p className="text-xs text-[#F5E7C5]/70 mt-0.5 line-clamp-1">
                  {lang === 'en' ? item.descEn : item.descUr}
                </p>
              </div>

              {/* Hover Eye Icon */}
              <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 p-2 rounded-full bg-black/60 text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            <div 
              className="relative max-w-4xl w-full bg-[#0A2419] rounded-2xl overflow-hidden border border-[#C5A059]/40 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-[#F5E7C5] hover:text-[#C5A059] transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="aspect-[16/10] w-full bg-black">
                <img
                  src={activePhoto.image}
                  alt={lang === 'en' ? activePhoto.titleEn : activePhoto.titleUr}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 text-left rtl:text-right">
                <h3 className="text-xl font-bold font-editorial text-[#F5E7C5]">
                  {lang === 'en' ? activePhoto.titleEn : activePhoto.titleUr}
                </h3>
                <p className="text-sm text-[#F5E7C5]/70 mt-1">
                  {lang === 'en' ? activePhoto.descEn : activePhoto.descUr}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
