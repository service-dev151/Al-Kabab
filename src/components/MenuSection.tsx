import React, { useState, useMemo } from 'react';
import { MenuItem } from '../data/restaurantData';
import { Search, Plus, Check, Flame, Sparkles } from 'lucide-react';

interface MenuSectionProps {
  items: MenuItem[];
  lang: 'en' | 'ur';
  onAddToCart: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  lang,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedId, setAddedId] = useState<string | null>(null);

  const isRtl = lang === 'ur';

  const categories = [
    { id: 'all', labelEn: 'All Dishes', labelUr: 'تمام پکوان' },
    { id: 'bbq', labelEn: 'Charcoal BBQ', labelUr: 'باربی کیو' },
    { id: 'karahi', labelEn: 'Karahi & Handi', labelUr: 'کڑاہی اور ہانڈی' },
    { id: 'tandoor', labelEn: 'Clay Tandoor', labelUr: 'تندور اور نان' },
    { id: 'rice', labelEn: 'Biryani & Rice', labelUr: 'بریانی اور چاول' },
    { id: 'sides', labelEn: 'Sides & Raita', labelUr: 'رائتہ اور سلاد' },
    { id: 'desserts', labelEn: 'Desserts', labelUr: 'میٹھے' },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((dish) => {
      const matchesCategory =
        selectedCategory === 'all' || dish.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        dish.nameEn.toLowerCase().includes(q) ||
        dish.nameUr.includes(q) ||
        dish.descriptionEn.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const handleAdd = (dish: MenuItem) => {
    onAddToCart(dish);
    setAddedId(dish.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section 
      id="menu" 
      className="py-20 lg:py-28 bg-[#123D2B] bg-jali-pattern relative"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#C5A059] uppercase">
            <span>{lang === 'en' ? 'Authentic Flavours' : 'روایتی دسترخوان'}</span>
            <span aria-hidden="true">·</span>
            <span>{lang === 'en' ? 'Cooked Fresh to Order' : 'تازہ تیار شدہ'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#F5E7C5] tracking-tight">
            {lang === 'en' ? 'Our Complete Restaurant Menu' : 'الکباب مکمل ریسٹورنٹ مینو'}
          </h2>

          <p className="text-sm sm:text-base text-[#F5E7C5]/75">
            {lang === 'en'
              ? 'Every cut is seasoned with hand-pounded spices, charbroiled to juicy perfection, and served steaming hot.'
              : 'ہر ڈش کو روایتی نسخوں، اصلی مکھن اور خالص مصالحوں کے ساتھ تیار کیا جاتا ہے۔'}
          </p>
        </div>

        {/* Filter Toolbar: Categories Tabs + Search Input */}
        <div className="space-y-6 mb-12">
          
          {/* Functional Segmented Button Tabs (Permitted under Anti-Slop Rule 0/1A) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#C5A059] text-[#123D2B] shadow-md'
                    : 'bg-[#194E38]/80 text-[#F5E7C5]/80 hover:bg-[#194E38] hover:text-[#F5E7C5]'
                }`}
              >
                {lang === 'en' ? cat.labelEn : cat.labelUr}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#C5A059] absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search dishes (e.g. Seekh, Karahi, Naan)...' : 'کھانا تلاش کریں (مثلاً سیخ کباب، کڑاہی، روغنی نان)...'}
              className="w-full bg-[#0A2419]/90 border border-[#F5E7C5]/20 focus:border-[#C5A059] rounded-lg pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 text-sm text-[#F5E7C5] placeholder-[#F5E7C5]/40 outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-xs text-[#F5E7C5]/60 hover:text-[#F5E7C5]"
              >
                {lang === 'en' ? 'Clear' : 'صاف'}
              </button>
            )}
          </div>
        </div>

        {/* Menu Items Grid: Clean Editorial 2-Column Desktop Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#0A2419]/50 rounded-xl border border-[#F5E7C5]/10">
            <p className="text-[#F5E7C5]/70 text-sm">
              {lang === 'en' ? 'No dishes matched your search criteria.' : 'آپ کی تلاش کے مطابق کوئی کھانا نہیں ملا۔'}
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-3 text-xs text-[#C5A059] hover:underline"
            >
              {lang === 'en' ? 'Reset filters' : 'فلٹرز دوبارہ ترتیب دیں'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredItems.map((dish) => {
              const isAdded = addedId === dish.id;

              return (
                <div
                  key={dish.id}
                  className="flex flex-col sm:flex-row items-stretch gap-4 p-4 rounded-xl bg-[#0F3525] border border-[#F5E7C5]/15 hover:border-[#C5A059]/50 transition-all hover:bg-[#123E2C] group"
                >
                  {/* Thumbnail */}
                  <div className="w-full sm:w-36 sm:h-36 h-48 rounded-lg overflow-hidden shrink-0 relative bg-[#0A2419]">
                    <img
                      src={dish.image}
                      alt={lang === 'en' ? dish.nameEn : dish.nameUr}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    {dish.isPopular && (
                      <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2 bg-[#C5A059] text-[#123D2B] text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        POPULAR
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-between flex-1 space-y-2">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold text-base sm:text-lg text-[#F5E7C5] group-hover:text-[#DFBE7B] transition-colors leading-snug">
                          {lang === 'en' ? dish.nameEn : dish.nameUr}
                        </h3>
                        <span className="text-base font-bold text-[#DFBE7B] tabular-nums whitespace-nowrap">
                          Rs. {dish.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Unboxed Metadata with · separator */}
                      <div className="flex items-center gap-2 text-xs text-[#F5E7C5]/60 mt-1">
                        <span>{dish.portion}</span>
                        {dish.spiceLevel > 0 && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-0.5 text-[#FF6B4A]">
                              <Flame className="w-3 h-3" />
                              <span>{dish.spiceLevel === 1 ? 'Mild' : dish.spiceLevel === 2 ? 'Medium' : 'Hot'}</span>
                            </span>
                          </>
                        )}
                      </div>

                      <p className="text-xs text-[#F5E7C5]/75 mt-2 line-clamp-2 leading-relaxed">
                        {lang === 'en' ? dish.descriptionEn : dish.descriptionUr}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end pt-2 border-t border-[#F5E7C5]/10">
                      <button
                        onClick={() => handleAdd(dish)}
                        disabled={!dish.isAvailable}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                          !dish.isAvailable
                            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                            : isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#C5A059] hover:bg-[#DFBE7B] text-[#123D2B]'
                        }`}
                      >
                        {!dish.isAvailable ? (
                          <span>{lang === 'en' ? 'Sold Out' : 'ختم ہو چکا'}</span>
                        ) : isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{lang === 'en' ? 'Added' : 'شامل کیا گیا'}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>{lang === 'en' ? 'Add to Order' : 'آرڈر میں شامل کریں'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
