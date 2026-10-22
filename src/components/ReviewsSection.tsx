import React from 'react';
import { REVIEWS_DATA, RESTAURANT_INFO } from '../data/restaurantData';
import { Star, ShieldCheck, ExternalLink, MapPin } from 'lucide-react';

interface ReviewsSectionProps {
  lang: 'en' | 'ur';
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const isRtl = lang === 'ur';

  return (
    <section 
      id="reviews" 
      className="py-20 lg:py-28 bg-[#0D2E20] border-t border-[#F5E7C5]/10 relative"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Google / Foodpanda Real Proof Badges */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#C5A059] uppercase">
              <span>{lang === 'en' ? 'Verified Diners' : 'کسٹمرز کی آراء'}</span>
              <span aria-hidden="true">·</span>
              <span>{lang === 'en' ? '4.6★ Rated' : '4.6 ریٹنگ'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#F5E7C5] tracking-tight">
              {lang === 'en' ? 'Words From Our Guests' : 'ہمارے معزز مہمانوں کے تاثرات'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#123D2B] border border-[#C5A059]/40 text-xs font-semibold text-[#F5E7C5] hover:border-[#C5A059] transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>{lang === 'en' ? 'View on Google Maps' : 'گوگل میپس پر دیکھیں'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
            </a>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-[#123D2B] border border-[#F5E7C5]/15 flex flex-col justify-between space-y-4 hover:border-[#C5A059]/50 transition-all shadow-md"
            >
              <div className="space-y-3">
                {/* Source & Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(rev.rating)
                            ? 'fill-[#C5A059] text-[#C5A059]'
                            : 'text-[#C5A059]/40'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-[#F5E7C5] ml-1.5 tabular-nums">
                      {rev.rating}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#F5E7C5]/60">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{rev.source}</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#F5E7C5]/85 leading-relaxed italic">
                  "{lang === 'en' ? rev.contentEn : rev.contentUr}"
                </p>
              </div>

              {/* Reviewer Meta */}
              <div className="pt-3 border-t border-[#F5E7C5]/10 flex items-center justify-between text-xs text-[#F5E7C5]/60">
                <span className="font-semibold text-[#F5E7C5]">
                  {lang === 'en' ? rev.author : rev.authorUr}
                </span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Claim-to-Proof Metric adjacency box */}
        <div className="mt-12 p-6 rounded-xl bg-[#0A2419] border border-[#F5E7C5]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rtl:sm:text-right">
          <div>
            <h4 className="text-base font-bold text-[#F5E7C5]">
              {lang === 'en' ? 'Have you visited Al-Kabab recently?' : 'کیا آپ نے حال ہی میں الکباب کا دورہ کیا؟'}
            </h4>
            <p className="text-xs text-[#F5E7C5]/65 mt-0.5">
              {lang === 'en' 
                ? 'Your feedback helps us maintain the gold standard of Rahim Yar Khan hospitality.' 
                : 'آپ کی رائے ہمارے لیے مشعل راہ ہے اور سروس کو بہتر بنانے میں مدد دیتی ہے۔'}
            </p>
          </div>

          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#DFBE7B] text-[#123D2B] font-bold text-xs transition-colors shrink-0 whitespace-nowrap"
          >
            {lang === 'en' ? 'Leave a Google Review' : 'گوگل پر ریویو لکھیں'}
          </a>
        </div>

      </div>
    </section>
  );
};
