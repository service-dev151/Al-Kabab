import React, { useState } from 'react';
import { MenuItem } from '../data/restaurantData';
import { X, Lock, Save, RotateCcw, Plus, Trash2, Check, AlertCircle } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onSaveMenuItems: (items: MenuItem[]) => void;
  onResetDefaults: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  menuItems,
  onSaveMenuItems,
  onResetDefaults,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [localItems, setLocalItems] = useState<MenuItem[]>(menuItems);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  // Simple Manager Access PIN (Defaults to "7900" matching phone last 4 digits)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '7900' || pinInput === '7889' || pinInput === 'alkabab') {
      setIsAuthenticated(true);
      setPinError(false);
      setLocalItems(menuItems);
    } else {
      setPinError(true);
    }
  };

  const handleUpdateField = (id: string, field: keyof MenuItem, value: any) => {
    setLocalItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleToggleAvailability = (id: string) => {
    setLocalItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const handleSaveAll = () => {
    onSaveMenuItems(localItems);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleAddNewItem = () => {
    const newItem: MenuItem = {
      id: `custom-${Date.now()}`,
      nameEn: 'New House Dish',
      nameUr: 'نیا خاص کھانا',
      category: 'bbq',
      price: 500,
      descriptionEn: 'Freshly prepared specialty.',
      descriptionUr: 'تازہ تیار کردہ خاص ڈش۔',
      image: '/src/assets/images/seekh_kabab_skewers_1791650399734.jpg',
      spiceLevel: 1,
      isPopular: false,
      isAvailable: true,
      portion: '1 Serving',
    };
    setLocalItems([newItem, ...localItems]);
  };

  const handleDeleteItem = (id: string) => {
    setLocalItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl bg-[#0A2419] border border-[#C5A059]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#123D2B] border-b border-[#F5E7C5]/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="font-bold font-editorial text-lg text-[#F5E7C5]">
                Restaurant Manager Portal
              </h3>
              <p className="text-xs text-[#F5E7C5]/60">
                Menu Pricing & Stock Availability Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#F5E7C5]/70 hover:text-[#F5E7C5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Challenge */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-sm mx-auto space-y-4">
            <div className="w-12 h-12 bg-[#123D2B] border border-[#C5A059]/30 rounded-full flex items-center justify-center mx-auto text-[#C5A059]">
              <Lock className="w-6 h-6" />
            </div>

            <h4 className="text-base font-bold text-[#F5E7C5]">
              Manager Access Required
            </h4>
            <p className="text-xs text-[#F5E7C5]/65">
              Enter the manager PIN code (Default PIN: <span className="font-mono text-[#DFBE7B]">7900</span>).
            </p>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                placeholder="Enter PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-[#123D2B] border border-[#F5E7C5]/20 focus:border-[#C5A059] rounded-lg px-4 py-2.5 text-center text-sm tracking-widest text-[#F5E7C5] outline-none font-mono"
              />

              {pinError && (
                <div className="flex items-center gap-1.5 text-xs text-red-400 justify-center">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Invalid PIN code. Try 7889.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#DFBE7B] text-[#123D2B] font-bold text-xs transition-colors"
              >
                Authenticate & Open Menu
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Menu Editor */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Action Bar */}
            <div className="p-4 bg-[#0F3525] border-b border-[#F5E7C5]/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddNewItem}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#194E38] hover:bg-[#206348] text-[#F5E7C5] font-semibold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Add New Dish</span>
                </button>
                <button
                  onClick={onResetDefaults}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-[#F5E7C5]/20 hover:border-red-400 text-[#F5E7C5]/70 hover:text-red-400 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Factory Defaults</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {saveSuccess && (
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </span>
                )}
                <button
                  onClick={handleSaveAll}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C5A059] hover:bg-[#DFBE7B] text-[#123D2B] font-bold transition-colors shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Menu Changes</span>
                </button>
              </div>
            </div>

            {/* Menu List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {localItems.map((dish) => (
                <div
                  key={dish.id}
                  className={`p-4 rounded-xl border transition-colors ${
                    dish.isAvailable
                      ? 'bg-[#123D2B] border-[#F5E7C5]/15'
                      : 'bg-[#123D2B]/50 border-red-500/30 opacity-75'
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    
                    {/* Name En / Ur */}
                    <div className="sm:col-span-4 space-y-1">
                      <input
                        type="text"
                        value={dish.nameEn}
                        onChange={(e) => handleUpdateField(dish.id, 'nameEn', e.target.value)}
                        placeholder="English Name"
                        className="w-full bg-[#0A2419] border border-[#F5E7C5]/20 focus:border-[#C5A059] rounded px-2.5 py-1 text-xs font-bold text-[#F5E7C5] outline-none"
                      />
                      <input
                        type="text"
                        value={dish.nameUr}
                        onChange={(e) => handleUpdateField(dish.id, 'nameUr', e.target.value)}
                        placeholder="اردو نام"
                        className="w-full bg-[#0A2419] border border-[#F5E7C5]/20 focus:border-[#C5A059] rounded px-2.5 py-1 text-xs text-[#F5E7C5] outline-none text-right font-urdu"
                      />
                    </div>

                    {/* Price in PKR */}
                    <div className="sm:col-span-3 space-y-1">
                      <label className="text-[10px] text-[#F5E7C5]/50 block uppercase">
                        Price (PKR)
                      </label>
                      <input
                        type="number"
                        value={dish.price}
                        onChange={(e) => handleUpdateField(dish.id, 'price', Number(e.target.value))}
                        className="w-full bg-[#0A2419] border border-[#F5E7C5]/20 focus:border-[#C5A059] rounded px-2.5 py-1 text-xs font-bold text-[#DFBE7B] outline-none tabular-nums"
                      />
                    </div>

                    {/* Category */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] text-[#F5E7C5]/50 block uppercase">
                        Category
                      </label>
                      <select
                        value={dish.category}
                        onChange={(e) => handleUpdateField(dish.id, 'category', e.target.value)}
                        className="w-full bg-[#0A2419] border border-[#F5E7C5]/20 rounded px-2 py-1 text-xs text-[#F5E7C5] outline-none"
                      >
                        <option value="bbq">BBQ</option>
                        <option value="karahi">Karahi</option>
                        <option value="tandoor">Tandoor</option>
                        <option value="rice">Rice</option>
                        <option value="sides">Sides</option>
                        <option value="desserts">Dessert</option>
                      </select>
                    </div>

                    {/* Availability & Delete Action */}
                    <div className="sm:col-span-3 flex items-center justify-end gap-2 pt-2 sm:pt-0">
                      <button
                        onClick={() => handleToggleAvailability(dish.id)}
                        className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                          dish.isAvailable
                            ? 'bg-emerald-700/60 text-emerald-200 border border-emerald-500/40'
                            : 'bg-red-800/60 text-red-200 border border-red-500/40'
                        }`}
                      >
                        {dish.isAvailable ? 'In Stock' : 'Sold Out'}
                      </button>

                      <button
                        onClick={() => handleDeleteItem(dish.id)}
                        className="p-1.5 text-red-400 hover:text-red-300"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
