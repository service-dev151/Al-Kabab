import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ShoppingBag, Star, Clock, Truck, ShieldCheck, ExternalLink } from 'lucide-react';

interface FoodpandaBannerProps {
  lang: 'en' | 'ur';
}

export const FoodpandaBanner: React.FC<FoodpandaBannerProps> = ({ lang }) => {
  const isRtl = lang === 'ur';

  return (
    <section 
      className="py-16 bg-gradient-to-r from-[#210512] via-[#2D0B1C] to-[#140810] border-y border-[#D70F64]/30 relative overflow-hidden text-white"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Decorative Foodpanda Ambient Glow */}
      <div 
        className="absolute -right-20 -top-20 w-80 h-80 bg-[#D70F64]/20 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#D70F64]/15 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Column: Brand & Trust Details */}
          <div className="space-y-4 max-w-2xl text-left rtl:text-right">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#FF6397] uppercase">
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#FF6397] text-[#FF6397]" />
                <span className="tabular-nums">4.6 / 5.0</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>{lang === 'en' ? '2,000+ Foodpanda Reviews in Rahim Yar Khan' : 'رحیم یار خان میں 2000+ تصدیق شدہ ریویوز'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-white tracking-tight">
              {lang === 'en' 
                ? 'Get Sizzling BBQ Delivered to Your Doorstep' 
                : 'گھر بیٹھے گرما گرم باربی کیو کا لطف اٹھائیں'}
            </h2>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              {lang === 'en'
                ? 'Enjoy the authentic smoky taste of Al-Kabab with express doorstep delivery across Rahim Yar Khan via Foodpanda. Packed fresh in thermal insulation boxes to preserve sizzling heat.'
                : 'فوڈ پانڈا کے ذریعے رحیم یار خان کے کسی بھی کونے میں الکباب ریسٹورنٹ کے لذیذ پکوان گرما گرم منگوائیں۔'}
            </p>

            {/* Micro Delivery Metrics */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/70 pt-1">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#FF6397]" />
                <span>{lang === 'en' ? 'City-wide Delivery' : 'پورے شہر میں ترسیل'}</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#FF6397]" />
                <span>{lang === 'en' ? 'Avg. 30–45 Mins' : '30 تا 45 منٹ'}</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FF6397]" />
                <span>{lang === 'en' ? 'Contactless Delivery Available' : 'محفوظ اور حفظان صحت کے مطابق'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Order Button & Configuration Notice */}
          <div className="flex flex-col items-center lg:items-end space-y-3 shrink-0">
            <a
              href={RESTAURANT_INFO.foodpandaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-[#D70F64] hover:bg-[#B50B53] text-white font-bold text-base shadow-xl hover:shadow-[#D70F64]/30 transition-all flex items-center gap-3 active:scale-95 group"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              <span>{lang === 'en' ? 'Order on Foodpanda' : 'فوڈ پانڈا پر آرڈر کریں'}</span>
              <ExternalLink className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" />
            </a>

            <span className="text-[11px] text-white/50 text-center lg:text-right">
              {lang === 'en' 
                ? 'Direct verified link to New Al-Kabab Restaurant on Foodpanda Pakistan' 
                : 'فوڈ پانڈا پاکستان پر نیو الکباب ریسٹورنٹ کا تصدیق شدہ لنک'}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
