import React, { useState } from 'react';
import { MenuItem } from '../data/restaurantData';
import { Flame, Plus, Check } from 'lucide-react';

interface FeaturedDishesProps {
  items: MenuItem[];
  lang: 'en' | 'ur';
  onAddToCart: (item: MenuItem) => void;
}

export const FeaturedDishes: React.FC<FeaturedDishesProps> = ({
  items,
  lang,
  onAddToCart,
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);

  const featuredItems = items.filter((item) => item.isPopular).slice(0, 4);
  const isRtl = lang === 'ur';

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section 
      id="featured" 
      className="py-20 lg:py-28 bg-[#0D2E20] border-y border-[#F5E7C5]/10 relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Natural Editorial Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#C5A059] uppercase">
              <span>{lang === 'en' ? 'House Specialties' : 'خاص الکباب پکوان'}</span>
              <span aria-hidden="true">·</span>
              <span>{lang === 'en' ? 'Charcoal Fired' : 'کوئلوں کی خوشبو'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#F5E7C5] tracking-tight text-balance">
              {lang === 'en' ? 'Signature Charcoal Selections' : 'ہمارے خاص باربی کیو شاہکار'}
            </h2>
          </div>
          <p className="text-sm text-[#F5E7C5]/75 max-w-md text-left rtl:text-right">
            {lang === 'en' 
              ? 'Hand-crafted daily using traditional marinades of fresh coriander, stone-ground garam masala, and roasted cumin on live mangrove charcoal.' 
              : 'خالص دیسی مصالحہ جات میں تیار کردہ گوشت جو لکڑی کے دہکتے کوئلوں پر سنہرا بھونا جاتا ہے۔'}
          </p>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredItems.map((dish) => {
            const isAdded = addedId === dish.id;

            return (
              <div
                key={dish.id}
                className="group relative flex flex-col rounded-xl overflow-hidden bg-[#123D2B] border border-[#F5E7C5]/15 transition-all duration-300 hover:border-[#C5A059]/60 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40"
              >
                {/* Food Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A2419]">
                  <img
                    src={dish.image}
                    alt={lang === 'en' ? dish.nameEn : dish.nameUr}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#123D2B] via-transparent to-black/20" />

                  {/* Spice indicator with unboxed text */}
                  {dish.spiceLevel > 0 && (
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex items-center gap-1 text-[11px] font-medium text-[#F5E7C5]/90 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
                      <Flame className="w-3 h-3 text-[#FF6B4A]" />
                      <span>{dish.spiceLevel === 1 ? 'Mild' : dish.spiceLevel === 2 ? 'Medium' : 'Fiery'}</span>
                    </div>
                  )}

                  {/* Portion tag */}
                  <div className="absolute bottom-2 right-3 rtl:right-auto rtl:left-3 text-[11px] text-[#F5E7C5]/80 font-medium">
                    {dish.portion}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-1.5">
                    {/* Clean unboxed category label */}
                    <div className="text-[11px] uppercase tracking-wider text-[#C5A059] font-medium">
                      {dish.category === 'bbq' ? (lang === 'en' ? 'Charcoal BBQ' : 'باربی کیو') :
                       dish.category === 'karahi' ? (lang === 'en' ? 'Desi Karahi' : 'شنواری کڑاہی') :
                       dish.category === 'tandoor' ? (lang === 'en' ? 'Clay Tandoor' : 'تندور') : (lang === 'en' ? 'Specialty' : 'خاص')}
                    </div>

                    <h3 className="text-lg font-bold text-[#F5E7C5] group-hover:text-[#DFBE7B] transition-colors leading-snug">
                      {lang === 'en' ? dish.nameEn : dish.nameUr}
                    </h3>

                    <p className="text-xs text-[#F5E7C5]/70 line-clamp-2 leading-relaxed">
                      {lang === 'en' ? dish.descriptionEn : dish.descriptionUr}
                    </p>
                  </div>

                  {/* Bottom Strip: Price & Add Button */}
                  <div className="pt-3 border-t border-[#F5E7C5]/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#F5E7C5]/60 block leading-none">Price</span>
                      <span className="text-lg font-bold text-[#DFBE7B] tabular-nums">
                        Rs. {dish.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAdd(dish)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#C5A059] hover:bg-[#DFBE7B] text-[#123D2B]'
                      }`}
                      aria-label={`Add ${dish.nameEn} to bag`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{lang === 'en' ? 'Added' : 'شامل'}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>{lang === 'en' ? 'Add' : 'شامل کریں'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
