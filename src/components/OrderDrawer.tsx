import React, { useState } from 'react';
import { MenuItem, RESTAURANT_INFO } from '../data/restaurantData';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, PhoneCall, ExternalLink } from 'lucide-react';

export interface CartItem {
  dish: MenuItem;
  quantity: number;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  lang: 'en' | 'ur';
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  lang,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  if (!isOpen) return null;

  const isRtl = lang === 'ur';

  const subtotal = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' && subtotal > 0 ? 150 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSendWhatsAppOrder = () => {
    if (cart.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      alert(lang === 'en' ? 'Please enter your name and phone number.' : 'براہ کرم اپنا نام اور موبائل نمبر درج کریں۔');
      return;
    }

    let itemsSlip = '';
    cart.forEach((c) => {
      itemsSlip += `• ${c.dish.nameEn} x ${c.quantity} = Rs. ${(c.dish.price * c.quantity).toLocaleString()}%0A`;
    });

    const msg = `*NEW ORDER - AL KABAB RESTAURANT*%0A` +
      `*Type:* ${orderType.toUpperCase()}%0A` +
      `*Customer:* ${encodeURIComponent(customerName)}%0A` +
      `*Phone:* ${encodeURIComponent(customerPhone)}%0A` +
      (orderType === 'delivery' ? `*Address:* ${encodeURIComponent(deliveryAddress || 'Rahim Yar Khan City')}%0A` : `*Pickup:* Self Takeaway in Abbasia Town%0A`) +
      `------------------------%0A` +
      `*Items:*%0A${itemsSlip}` +
      `------------------------%0A` +
      `*Subtotal:* Rs. ${subtotal.toLocaleString()}%0A` +
      (deliveryFee > 0 ? `*Delivery Fee:* Rs. ${deliveryFee}%0A` : '') +
      `*Total Payable:* Rs. ${grandTotal.toLocaleString()}%0A%0A` +
      `_Please confirm availability and preparation time._`;

    window.open(`https://wa.me/923367257900?text=${msg}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end"
      dir={isRtl ? 'rtl' : 'ltr'}
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-[#0A2419] border-l border-[#F5E7C5]/20 h-full flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#F5E7C5]/15 flex items-center justify-between bg-[#123D2B]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-bold font-editorial text-lg text-[#F5E7C5]">
              {lang === 'en' ? 'Your Barbecue Feast' : 'آپ کا آرڈر بیگ'}
            </h3>
            <span className="text-xs text-[#F5E7C5]/60 tabular-nums">
              ({cart.reduce((c, i) => c + i.quantity, 0)})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#F5E7C5]/70 hover:text-[#F5E7C5] hover:bg-[#F5E7C5]/10 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#123D2B] border border-[#F5E7C5]/20 flex items-center justify-center text-[#C5A059]">
              <ShoppingBag className="w-8 h-8 opacity-60" />
            </div>
            <p className="text-sm text-[#F5E7C5]/80 font-medium">
              {lang === 'en' ? 'Your order bag is currently empty.' : 'آپ کا آرڈر بیگ ابھی خالی ہے۔'}
            </p>
            <p className="text-xs text-[#F5E7C5]/50 max-w-xs">
              {lang === 'en'
                ? 'Select our authentic Seekh Kababs, Malai Boti, or Shinwari Karahi to get started.'
                : 'مینو سے لذیذ سیخ کباب، ملائی بوٹی یا شنواری کڑاہی منتخب کریں۔'}
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-[#C5A059] text-[#123D2B] font-bold text-xs"
            >
              {lang === 'en' ? 'Browse Menu' : 'مینو دیکھیں'}
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            
            {/* Itemized List */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.dish.id}
                  className="p-3 rounded-lg bg-[#123D2B] border border-[#F5E7C5]/15 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[#F5E7C5] truncate">
                      {lang === 'en' ? item.dish.nameEn : item.dish.nameUr}
                    </h4>
                    <span className="text-xs text-[#DFBE7B] font-semibold tabular-nums block">
                      Rs. {(item.dish.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 bg-[#0A2419] border border-[#F5E7C5]/20 rounded-md p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.dish.id, -1)}
                      className="p-1 text-[#F5E7C5]/70 hover:text-[#F5E7C5]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-[#F5E7C5] px-1 tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.dish.id, 1)}
                      className="p-1 text-[#F5E7C5]/70 hover:text-[#F5E7C5]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.dish.id)}
                    className="p-1.5 text-red-400/70 hover:text-red-400"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Clear Cart Link */}
            <div className="flex justify-end">
              <button
                onClick={onClearCart}
                className="text-[11px] text-[#F5E7C5]/50 hover:text-red-400 transition-colors"
              >
                {lang === 'en' ? 'Clear all items' : 'تمام اشیاء ہٹائیں'}
              </button>
            </div>

            {/* Order Fulfillment Type */}
            <div className="pt-2 space-y-3">
              <label className="text-xs font-semibold text-[#F5E7C5] block">
                {lang === 'en' ? 'Fulfillment Method' : 'آرڈر وصول کرنے کا طریقہ'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    orderType === 'delivery'
                      ? 'bg-[#C5A059] text-[#123D2B] border-[#C5A059]'
                      : 'bg-[#123D2B] text-[#F5E7C5]/70 border-[#F5E7C5]/15'
                  }`}
                >
                  {lang === 'en' ? 'Home Delivery' : 'ہوم ڈیلیوری'}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    orderType === 'takeaway'
                      ? 'bg-[#C5A059] text-[#123D2B] border-[#C5A059]'
                      : 'bg-[#123D2B] text-[#F5E7C5]/70 border-[#F5E7C5]/15'
                  }`}
                >
                  {lang === 'en' ? 'Takeaway Pickup' : 'ٹیک اوے'}
                </button>
              </div>

              {/* Delivery Details */}
              <div className="space-y-2 pt-1 text-left rtl:text-right">
                <input
                  type="text"
                  placeholder={lang === 'en' ? 'Your Name *' : 'آپ کا نام *'}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#123D2B] border border-[#F5E7C5]/20 focus:border-[#C5A059] rounded-lg px-3 py-2 text-xs text-[#F5E7C5] placeholder-[#F5E7C5]/30 outline-none"
                />

                <input
                  type="tel"
                  placeholder={lang === 'en' ? 'Phone Number (0336-XXXXXXX) *' : 'موبائل نمبر *'}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#123D2B] border border-[#F5E7C5]/20 focus:border-[#C5A059] rounded-lg px-3 py-2 text-xs text-[#F5E7C5] placeholder-[#F5E7C5]/30 outline-none tabular-nums"
                />

                {orderType === 'delivery' && (
                  <textarea
                    rows={2}
                    placeholder={lang === 'en' ? 'Delivery Address in Rahim Yar Khan...' : 'رحیم یار خان میں ڈیلیوری کا مکمل پتہ...'}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-[#123D2B] border border-[#F5E7C5]/20 focus:border-[#C5A059] rounded-lg px-3 py-2 text-xs text-[#F5E7C5] placeholder-[#F5E7C5]/30 outline-none resize-none"
                  />
                )}
              </div>
            </div>

          </div>
        )}

        {/* Drawer Footer / Sticky Action */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#F5E7C5]/15 bg-[#123D2B] space-y-3">
            {/* Pricing Summary */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#F5E7C5]/70">
                <span>{lang === 'en' ? 'Subtotal' : 'سب ٹوٹل'}</span>
                <span className="tabular-nums">Rs. {subtotal.toLocaleString()}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between text-[#F5E7C5]/70">
                  <span>{lang === 'en' ? 'Estimated Delivery' : 'ڈیلیوری چارجز'}</span>
                  <span className="tabular-nums">Rs. {deliveryFee}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#DFBE7B] pt-1 border-t border-[#F5E7C5]/10">
                <span>{lang === 'en' ? 'Total (COD / Cash)' : 'کل رقم'}</span>
                <span className="text-base tabular-nums">Rs. {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Direct WhatsApp Ordering */}
            <button
              onClick={handleSendWhatsAppOrder}
              className="w-full py-3.5 rounded-lg bg-[#C5A059] hover:bg-[#DFBE7B] text-[#123D2B] font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>{lang === 'en' ? 'Place Order via WhatsApp' : 'واٹس ایپ پر آرڈر بھیجیں'}</span>
            </button>

            {/* Alternative Foodpanda Link */}
            <a
              href={RESTAURANT_INFO.foodpandaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg border border-[#D70F64]/40 hover:border-[#D70F64] text-xs font-semibold text-[#FFF] hover:bg-[#D70F64]/10 transition-colors flex items-center justify-center gap-2"
            >
              <span>{lang === 'en' ? 'Or Order with Foodpanda App' : 'یا فوڈ پانڈا ایپ سے منگوائیں'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D70F64]" />
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
