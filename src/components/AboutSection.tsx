import React from 'react';
import { Flame, Heart, Utensils, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface AboutSectionProps {
  lang: 'en' | 'ur';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const isRtl = lang === 'ur';

  return (
    <section 
      id="heritage" 
      className="py-20 lg:py-28 bg-[#0A2419] border-t border-[#F5E7C5]/10 relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase (2 Staggered Editorial Photos) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#F5E7C5]/15 shadow-xl">
                <img
                  src="/src/assets/images/seekh_kabab_skewers_1791650399734.jpg"
                  alt="Live Charcoal Skewers at Al Kabab"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="p-4 rounded-xl bg-[#123D2B] border border-[#F5E7C5]/10 text-center">
                <span className="text-2xl font-bold text-[#DFBE7B] tabular-nums block">100%</span>
                <span className="text-xs text-[#F5E7C5]/70 uppercase tracking-wider">
                  {lang === 'en' ? 'Fresh Halal Cuts' : 'تازہ حلال گوشت'}
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 rounded-xl bg-[#123D2B] border border-[#F5E7C5]/10 text-center">
                <span className="text-2xl font-bold text-[#DFBE7B] tabular-nums block">2,000+</span>
                <span className="text-xs text-[#F5E7C5]/70 uppercase tracking-wider">
                  {lang === 'en' ? 'Happy Diners' : 'مطمئن مہمان'}
                </span>
              </div>
              <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#F5E7C5]/15 shadow-xl">
                <img
                  src="/src/assets/images/tandoori_roghani_naan_1791650436097.jpg"
                  alt="Clay Tandoor Roghani Naan"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#C5A059] uppercase">
              <span>{lang === 'en' ? 'Our Heritage & Philosophy' : 'ہماری روایت اور پہچان'}</span>
              <span aria-hidden="true">·</span>
              <span>{lang === 'en' ? 'Abbasia Town, Rahim Yar Khan' : 'عباسیہ ٹاؤن، رحیم یار خان'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#F5E7C5] tracking-tight leading-tight text-balance">
              {lang === 'en' ? (
                <>
                  Born from Coal, Shaped by <span className="text-[#DFBE7B] italic">Generations</span>
                </>
              ) : (
                <span className="font-urdu leading-tight">
                  کوئلوں کی تپش اور نسلوں کی <span className="text-[#DFBE7B]">مہارت</span>
                </span>
              )}
            </h2>

            <p className="text-sm sm:text-base text-[#F5E7C5]/80 leading-relaxed">
              {lang === 'en'
                ? 'Located on Main Road Abbasia Town opposite the Railway Line in Rahim Yar Khan, Al-Kabab Restaurant is synonymous with authentic Pakistani barbecue. We reject shortcuts, commercial powders, and pre-packaged sauces.'
                : 'رحیم یار خان میں عباسیہ ٹاؤن مین روڈ پر واقع الکباب ریسٹورنٹ روایتی باربی کیو کا باوقار نام ہے۔ ہم پیکٹ کے مصالحوں کے بجائے ہاتھ سے پسے ہوئے ثابت مصالحے اور دیسی ترکیبوں کو ترجیح دیتے ہیں۔'}
            </p>

            <p className="text-sm sm:text-base text-[#F5E7C5]/80 leading-relaxed">
              {lang === 'en'
                ? 'Every skewer is pressed fresh by our ustads (master grillers), marinated with whole cumin, raw papaya, wild mint, and black pepper, then kissed by open wood embers. Accompanied by steaming Roghani Naans pulled straight from blazing clay tandoors, this is dining the way our ancestors celebrated it.'
                : 'ہر سیخ ہمارے تجربہ کار استادوں کے ہاتھوں سے تیار ہوتی ہے، جس میں کچے پپیتے کا عرق، بھنا زیرہ اور پودینے کی چٹنی شامل ہے۔ دہکتے تندور سے نکلنے والے گرم نان کے ساتھ یہ ایک یادگار ذائقہ بن جاتا ہے۔'}
            </p>

            {/* Pillar highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F5E7C5]/10">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#123D2B] text-[#C5A059] shrink-0 border border-[#C5A059]/20">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#F5E7C5]">
                    {lang === 'en' ? 'Natural Charcoal Grilling' : 'اصلی کوئلے کی بھٹی'}
                  </h4>
                  <p className="text-xs text-[#F5E7C5]/65 mt-0.5">
                    {lang === 'en' ? 'Smoky aromatic crust with tender, succulent centers.' : 'کوئلے کی خاص خوشبو اور اندر سے رسیلا گوشت۔'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#123D2B] text-[#C5A059] shrink-0 border border-[#C5A059]/20">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#F5E7C5]">
                    {lang === 'en' ? 'Traditional Clay Tandoor' : 'مٹی کا روایتی تندور'}
                  </h4>
                  <p className="text-xs text-[#F5E7C5]/65 mt-0.5">
                    {lang === 'en' ? 'Freshly stamped Roghani and Garlic Naans with desi butter.' : 'اصلی مکھن اور تلوں سے سجے گرما گرم نان۔'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
