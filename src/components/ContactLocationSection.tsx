import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Phone, MessageSquare, MapPin, Clock, Calendar, CheckCircle2, Navigation, Send } from 'lucide-react';

interface ContactLocationProps {
  lang: 'en' | 'ur';
}

export const ContactLocationSection: React.FC<ContactLocationProps> = ({ lang }) => {
  const isRtl = lang === 'ur';

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: '',
    time: '20:00',
    specialRequests: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage(lang === 'en' ? 'Please provide your name and phone number.' : 'براہ کرم اپنا نام اور فون نمبر درج کریں۔');
      return;
    }

    // Prepare WhatsApp reservation message
    const msg = `*Table Reservation / Inquiry - Al Kabab Restaurant*%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Guests:* ${formData.guests}%0A*Date:* ${formData.date || 'Today'}%0A*Time:* ${formData.time}%0A*Notes:* ${encodeURIComponent(formData.specialRequests || 'Standard dining')}`;

    setIsSubmitted(true);
    setErrorMessage('');

    // Open WhatsApp directly for confirmed communication
    setTimeout(() => {
      window.open(`https://wa.me/923367257900?text=${msg}`, '_blank');
    }, 1000);
  };

  return (
    <section 
      id="location" 
      className="py-20 lg:py-28 bg-[#123D2B] bg-moroccan-stars relative"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#C5A059] uppercase">
            <span>{lang === 'en' ? 'Hospitality & Reservations' : 'مہمان نوازی اور رابطہ'}</span>
            <span aria-hidden="true">·</span>
            <span>{lang === 'en' ? 'Abbasia Town, Rahim Yar Khan' : 'عباسیہ ٹاؤن، رحیم یار خان'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#F5E7C5] tracking-tight">
            {lang === 'en' ? 'Visit Us or Reserve a Table' : 'تشریف لائیں یا ٹیبل بک کروائیں'}
          </h2>

          <p className="text-sm sm:text-base text-[#F5E7C5]/75">
            {lang === 'en'
              ? 'Join us with family and friends for an unforgettable barbecue evening, or order directly for takeaway.'
              : 'اپنے اہل خانہ اور دوستوں کے ساتھ تشریف لائیں اور کوئلوں پر تیار تازہ کھانوں کا لطف اٹھائیں۔'}
          </p>
        </div>

        {/* 2-Column Responsive Layout: Left Info & Map, Right Reservation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Essential Contacts, Hours & Directions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Primary Call */}
              <div className="p-5 rounded-xl bg-[#0A2419] border border-[#F5E7C5]/15 space-y-2">
                <div className="flex items-center gap-2 text-[#C5A059]">
                  <Phone className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {lang === 'en' ? 'Call Directly' : 'براہ راست کال کریں'}
                  </span>
                </div>
                <div className="space-y-1">
                  <a 
                    href={`tel:${RESTAURANT_INFO.phonePrimary}`} 
                    className="block text-base font-bold text-[#F5E7C5] hover:text-[#DFBE7B] transition-colors tabular-nums"
                  >
                    {RESTAURANT_INFO.phonePrimary}
                  </a>
                  <a 
                    href={`tel:${RESTAURANT_INFO.phoneSecondary}`} 
                    className="block text-xs text-[#F5E7C5]/70 hover:text-[#F5E7C5] tabular-nums"
                  >
                    {RESTAURANT_INFO.phoneSecondary}
                  </a>
                  <p className="text-[11px] text-[#F5E7C5]/50">
                    {RESTAURANT_INFO.landline} (PTCL)
                  </p>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="p-5 rounded-xl bg-[#0A2419] border border-[#F5E7C5]/15 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {lang === 'en' ? 'WhatsApp Order' : 'واٹس ایپ رابطہ'}
                  </span>
                </div>
                <div className="space-y-1">
                  <a 
                    href={`https://wa.me/923367257900?text=Hello%20Al%20Kabab%20Restaurant,%20I%20would%20like%20to%20place%20an%20order`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-base font-bold text-[#F5E7C5] hover:text-emerald-300 transition-colors tabular-nums"
                  >
                    +92 336 7257900
                  </a>
                  <p className="text-xs text-[#F5E7C5]/70">
                    {lang === 'en' ? 'Instant menu & takeout support' : 'فوری مینو اور ٹیک اوے معلومات'}
                  </p>
                </div>
              </div>

            </div>

            {/* Address & Hours */}
            <div className="p-6 rounded-xl bg-[#0A2419] border border-[#F5E7C5]/15 space-y-4">
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#F5E7C5]">
                    {lang === 'en' ? 'Physical Address' : 'ریسٹورنٹ کا پتہ'}
                  </h4>
                  <p className="text-xs text-[#F5E7C5]/80 mt-1 leading-relaxed">
                    {lang === 'en' ? RESTAURANT_INFO.addressEn : RESTAURANT_INFO.addressUr}
                  </p>
                  <p className="text-[11px] text-[#F5E7C5]/50 mt-1">
                    Coordinates: 28.4268479, 70.3060359
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F5E7C5]/10 flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#F5E7C5]">
                    {lang === 'en' ? 'Opening Hours' : 'اوقات کار'}
                  </h4>
                  <p className="text-xs text-[#F5E7C5]/80 mt-1">
                    {lang === 'en' ? RESTAURANT_INFO.openingHoursEn : RESTAURANT_INFO.openingHoursUr}
                  </p>
                </div>
              </div>

              {/* Navigation Button */}
              <div className="pt-2">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg bg-[#194E38] hover:bg-[#206348] text-[#F5E7C5] font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-[#C5A059]/30"
                >
                  <Navigation className="w-4 h-4 text-[#C5A059]" />
                  <span>{lang === 'en' ? 'Get Directions on Google Maps' : 'گوگل میپس پر لوکیشن اور راستے دیکھیں'}</span>
                </a>
              </div>
            </div>

            {/* Embedded Live Map Frame */}
            <div className="rounded-xl overflow-hidden border border-[#F5E7C5]/15 h-64 bg-[#0A2419]">
              <iframe
                title="Al Kabab Restaurant Location"
                src="https://maps.google.com/maps?q=28.4268479,70.3060359&hl=en&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.1) brightness(0.9)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right Column: Table Reservation Form */}
          <div className="lg:col-span-6 bg-[#0A2419] border border-[#F5E7C5]/20 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            
            <div className="space-y-2 mb-6">
              <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#F5E7C5]">
                {lang === 'en' ? 'Reserve a Dining Table' : 'فیملی یا دوستوں کے لیے ٹیبل بک کریں'}
              </h3>
              <p className="text-xs text-[#F5E7C5]/70">
                {lang === 'en'
                  ? 'Submit your details to reserve your spot. We will confirm via phone or WhatsApp in real-time.'
                  : 'اپنی تفصیلات درج کریں۔ ہماری ٹیم آپ کے واٹس ایپ یا فون پر فوری تصدیق کرے گی۔'}
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-[#F5E7C5]">
                  {lang === 'en' ? 'Reservation Request Sent!' : 'درخواست کامیابی سے موصول ہوئی!'}
                </h4>
                <p className="text-xs text-[#F5E7C5]/75 max-w-sm mx-auto leading-relaxed">
                  {lang === 'en'
                    ? 'Opening WhatsApp to complete direct confirmation with our reservation manager in Rahim Yar Khan.'
                    : 'ہماری ٹیم آپ کی بکنگ کی تصدیق کے لیے رابطہ کر رہی ہے۔'}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-[#C5A059] hover:underline pt-2 inline-block"
                >
                  {lang === 'en' ? 'Make another booking' : 'ایک اور بکنگ درج کریں'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left rtl:text-right">
                {errorMessage && (
                  <div className="p-3 bg-red-900/40 border border-red-500/50 rounded-lg text-xs text-red-200">
                    {errorMessage}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#F5E7C5]/80 mb-1">
                    {lang === 'en' ? 'Full Name *' : 'مکمل نام *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'en' ? 'e.g. Tariq Mehmood' : 'مثلاً طارق محمود'}
                    className="w-full bg-[#123D2B] border border-[#F5E7C5]/20 focus:border-[#C5A059] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#F5E7C5] placeholder-[#F5E7C5]/30 outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-[#F5E7C5]/80 mb-1">
                    {lang === 'en' ? 'Contact Number (WhatsApp/Mobile) *' : 'موبائل نمبر یا واٹس ایپ *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0336-XXXXXXX"
                    className="w-full bg-[#123D2B] border border-[#F5E7C5]/20 focus:border-[#C5A059] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#F5E7C5] placeholder-[#F5E7C5]/30 outline-none tabular-nums"
                  />
                </div>

                {/* Guests & Date/Time Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#F5E7C5]/80 mb-1">
                      {lang === 'en' ? 'Guests' : 'مہمان'}
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-[#123D2B] border border-[#F5E7C5]/20 focus:border-[#C5A059] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#F5E7C5] outline-none"
                    >
                      <option value="1-2">1-2 Persons</option>
                      <option value="3-4">3-4 Persons</option>
                      <option value="5-8">5-8 (Family)</option>
                      <option value="10+">10+ (Party / Event)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#F5E7C5]/80 mb-1">
                      {lang === 'en' ? 'Date' : 'تاریخ'}
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#123D2B] border border-[#F5E7C5]/20 focus:border-[#C5A059] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#F5E7C5] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#F5E7C5]/80 mb-1">
                      {lang === 'en' ? 'Preferred Time' : 'وقت'}
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#123D2B] border border-[#F5E7C5]/20 focus:border-[#C5A059] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#F5E7C5] outline-none"
                    >
                      <option value="13:00">1:00 PM (Lunch)</option>
                      <option value="19:00">7:00 PM (Dinner)</option>
                      <option value="20:30">8:30 PM (Rush Hour)</option>
                      <option value="22:00">10:00 PM (Late Night BBQ)</option>
                      <option value="23:30">11:30 PM</option>
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-semibold text-[#F5E7C5]/80 mb-1">
                    {lang === 'en' ? 'Special Notes (Family Hall / Outdoor / Spice Preference)' : 'اضافی ہدایات (فیملی ہال، اوپن ائیر، مصالحے کی ترجیح)'}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder={lang === 'en' ? 'e.g. Need family partition seating...' : 'مثلاً فیملی ہال میں بیٹھنے کی جگہ درکار ہے...'}
                    className="w-full bg-[#123D2B] border border-[#F5E7C5]/20 focus:border-[#C5A059] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#F5E7C5] placeholder-[#F5E7C5]/30 outline-none resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-[#C5A059] hover:bg-[#DFBE7B] text-[#123D2B] font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Confirm Reservation via WhatsApp' : 'واٹس ایپ پر بکنگ کنفرم کریں'}</span>
                </button>

                <p className="text-[11px] text-[#F5E7C5]/45 text-center">
                  {lang === 'en'
                    ? 'No advance payment required. Direct real-time confirmation.'
                    : 'کسی ایڈوانس رقم کی ضرورت نہیں، فوری دستیابی کی تصدیق کی جائے گی۔'}
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
