export interface MenuItem {
  id: string;
  nameEn: string;
  nameUr: string;
  category: 'bbq' | 'karahi' | 'tandoor' | 'rice' | 'sides' | 'desserts';
  price: number;
  descriptionEn: string;
  descriptionUr: string;
  image: string;
  spiceLevel: 0 | 1 | 2 | 3;
  isPopular?: boolean;
  isAvailable: boolean;
  portion: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  authorUr: string;
  source: 'Google Maps' | 'Foodpanda';
  rating: number;
  date: string;
  contentEn: string;
  contentUr: string;
  verified: boolean;
}

export const RESTAURANT_INFO = {
  nameEn: "Al Kabab Restaurant",
  nameUr: "الکباب ریسٹورنٹ",
  taglineEn: "A Taste of Tradition",
  taglineUr: "روایت کا اصلی ذائقہ",
  subtaglineEn: "Authentic Pakistani Flavours, Crafted with Passion.",
  subtaglineUr: "خالص دیسی ذائقے، روایتی مہمان نوازی اور لذیذ کباب",
  addressEn: "Main Road Abbasia Town, opposite Railway Line, Rahim Yar Khan, Punjab, Pakistan",
  addressUr: "مین روڈ عباسیہ ٹاؤن، بالمقابل ریلوے لائن، رحیم یار خان، پنجاب، پاکستان",
  phonePrimary: "+92 336 7257900",
  phoneSecondary: "+92 308 7788987",
  landline: "068-5952016",
  whatsapp: "+923367257900",
  coordinates: {
    lat: 28.4268479,
    lng: 70.3060359,
  },
  googleMapsUrl: "https://www.google.com/maps/place/Al-Kabab+Restaurant/@28.4268479,70.3060359,17z/data=!3m1!4b1",
  foodpandaUrl: "https://www.foodpanda.pk/restaurant/s7vt/al-kabab-restaurant",
  foodpandaRating: "4.6",
  reviewCount: "2,000+",
  openingHoursEn: "Daily: 12:00 PM – 01:00 AM (BBQ Live after 6:00 PM)",
  openingHoursUr: "روزانہ: دوپہر 12:00 بجے تا رات 01:00 بجے (باربی کیو شام 6 بجے سے)",
};

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: "bbq-platter",
    nameEn: "Special Mixed BBQ Platter",
    nameUr: "الکباب اسپیشل مکس باربی کیو پلیٹر",
    category: "bbq",
    price: 2450,
    descriptionEn: "The signature grand feast: Beef Seekh Kababs, Chicken Tikka, Malai Boti, Mutton Chops, served with mint raita, podina chutney, and fresh Roghani Naan on a sizzling iron skillet.",
    descriptionUr: "ہمارا شاہی پلیٹر: بیف سیخ کباب، چکن تکہ، ملائی بوٹی اور مٹن چاپس، تازہ پودینہ چٹنی، زیرہ رائتہ اور گرم روغنی نان کے ساتھ۔",
    image: "/src/assets/images/hero_kabab_platter_1791650384918.jpg",
    spiceLevel: 2,
    isPopular: true,
    isAvailable: true,
    portion: "Serves 3-4 Persons"
  },
  {
    id: "seekh-kabab",
    nameEn: "Traditional Beef Seekh Kabab",
    nameUr: "روایتی بیف سیخ کباب",
    category: "bbq",
    price: 750,
    descriptionEn: "Finely minced prime beef infused with roasted cumin, coriander, ginger-garlic paste, and traditional aromatic spices, hand-pressed onto steel skewers and chargrilled over burning coals.",
    descriptionUr: "تازہ باریک قیمہ، بھنا ہوا زیرہ، دھنیا، ادرک لہسن اور دیسی مصالحوں سے تیار کردہ کوئلے پر سکھے ہوئے رسیلے سیخ کباب (4 سیخیں)۔",
    image: "/src/assets/images/seekh_kabab_skewers_1791650399734.jpg",
    spiceLevel: 2,
    isPopular: true,
    isAvailable: true,
    portion: "4 Skewers"
  },
  {
    id: "chicken-malai-boti",
    nameEn: "Velvety Chicken Malai Boti",
    nameUr: "چکن ملائی بوٹی",
    category: "bbq",
    price: 920,
    descriptionEn: "Tender boneless chicken morsels marinated in fresh thick cream, green cardamom, mild white pepper, and green chilies, slowly smoked over gentle charcoal.",
    descriptionUr: "نرم ریشمی بون لیس چکن، تازہ ملائی، چھوٹی الائچی اور سفید مرچ میں میرینیٹ کر کے ہلکی آنچ پر سینکا گیا۔",
    image: "/src/assets/images/chicken_malai_boti_1791650411207.jpg",
    spiceLevel: 1,
    isPopular: true,
    isAvailable: true,
    portion: "Full Plate / 8 Pcs"
  },
  {
    id: "chicken-tikka-chest",
    nameEn: "Charcoal Chicken Tikka (Chest)",
    nameUr: "چکن تکہ سینہ پیس",
    category: "bbq",
    price: 480,
    descriptionEn: "Quarter chicken breast cut deep-marinated in Kashmiri red chili, yogurt, lemon juice, and roasted spices, crisped to perfection on glowing charcoal.",
    descriptionUr: "کشمیری لال مرچ، دہی اور لیموں کے عرق میں میرینیٹ کیا ہوا چکن بریسٹ پیس، کوئلوں پر بھنا ہوا۔",
    image: "/src/assets/images/hero_kabab_platter_1791650384918.jpg",
    spiceLevel: 3,
    isPopular: true,
    isAvailable: true,
    portion: "1 Large Piece"
  },
  {
    id: "chicken-reshmi-kabab",
    nameEn: "Chicken Reshmi Kabab",
    nameUr: "چکن ریشمی کباب",
    category: "bbq",
    price: 850,
    descriptionEn: "Delicate chicken mince blended with creamy butter, crushed green chilies, and saffron-infused notes. Melt-in-the-mouth texture.",
    descriptionUr: "مکھن اور ہری مرچ سے تیار ریشم جیسا نرم چکن کباب جو منہ میں گھل جائے۔",
    image: "/src/assets/images/seekh_kabab_skewers_1791650399734.jpg",
    spiceLevel: 1,
    isPopular: false,
    isAvailable: true,
    portion: "4 Skewers"
  },
  {
    id: "mutton-shinwari-karahi",
    nameEn: "Mutton Shinwari Karahi (1/2 KG)",
    nameUr: "مٹن شنواری کڑاہی (آدھا کلو)",
    category: "karahi",
    price: 1650,
    descriptionEn: "Authentic Khyber-style preparation cooked in pure animal fat, sweet ripe tomatoes, slit green chilies, and coarse sea salt. No heavy spices, purely the rich taste of fresh mutton.",
    descriptionUr: "خالص شنواری انداز میں صرف تازہ ٹماٹر، ہری مرچ، ادرک اور نمک کے ساتھ لوہے کی کڑاہی میں پکا ہوا مٹن۔",
    image: "/src/assets/images/mutton_karahi_pot_1791650422813.jpg",
    spiceLevel: 1,
    isPopular: true,
    isAvailable: true,
    portion: "500g Fresh Meat"
  },
  {
    id: "chicken-white-handi",
    nameEn: "Special Chicken White Handi",
    nameUr: "اسپیشل چکن وائٹ ہانڈی",
    category: "karahi",
    price: 1450,
    descriptionEn: "Clay-pot cooked boneless chicken in a velvety sauce of dairy cream, blended almonds, black pepper, and fenugreek leaves (Kasuri Methi).",
    descriptionUr: "مٹی کی ہانڈی میں تازہ ملائی، بادام اور قصوری میتھی کی خوشبو سے تیار بون لیس چکن گریوی۔",
    image: "/src/assets/images/mutton_karahi_pot_1791650422813.jpg",
    spiceLevel: 1,
    isPopular: true,
    isAvailable: true,
    portion: "Full Handi (Serves 2-3)"
  },
  {
    id: "black-pepper-karahi",
    nameEn: "Desi Black Pepper Chicken Karahi",
    nameUr: "کالی مرچ چکن کڑاہی",
    category: "karahi",
    price: 1350,
    descriptionEn: "Tender chicken cooked over high flame with freshly crushed Telicherry black peppercorns, thick yogurt, and fresh ginger juliennes.",
    descriptionUr: "تازہ کٹی کالی مرچ، دہی اور ادرک کے لچھوں سے تیار خاص چکن کڑاہی۔",
    image: "/src/assets/images/mutton_karahi_pot_1791650422813.jpg",
    spiceLevel: 2,
    isPopular: false,
    isAvailable: true,
    portion: "Full Karahi"
  },
  {
    id: "roghani-naan",
    nameEn: "Clay-Oven Roghani Naan",
    nameUr: "تازہ تندوری روغنی نان",
    category: "tandoor",
    price: 110,
    descriptionEn: "Thick, pillowy leavened flatbread stamped with artisan impressions, brushed generously with pure butter and sprinkled with toasted sesame seeds.",
    descriptionUr: "مٹی کے تندور میں پکا ہوا گرم خمیری نان، اصلی مکھن اور سفید تلوں کے چھڑکاؤ کے ساتھ۔",
    image: "/src/assets/images/tandoori_roghani_naan_1791650436097.jpg",
    spiceLevel: 0,
    isPopular: true,
    isAvailable: true,
    portion: "1 Fresh Naan"
  },
  {
    id: "garlic-butter-naan",
    nameEn: "Garlic & Coriander Naan",
    nameUr: "گارلک بٹر نان",
    category: "tandoor",
    price: 140,
    descriptionEn: "Crispy tandoori naan studded with minced garlic cloves, fresh coriander leaves, and slathered with melted garlic butter.",
    descriptionUr: "لہسن اور ہرے دھنیے کے ساتھ مکھن میں لتھڑا ہوا خوشبودار نان۔",
    image: "/src/assets/images/tandoori_roghani_naan_1791650436097.jpg",
    spiceLevel: 0,
    isPopular: false,
    isAvailable: true,
    portion: "1 Fresh Naan"
  },
  {
    id: "tandoori-roti",
    nameEn: "Whole Wheat Tandoori Roti",
    nameUr: "سادہ تندوری روٹی",
    category: "tandoor",
    price: 40,
    descriptionEn: "Traditional wholesome whole wheat flatbread slapped against clay tandoor walls.",
    descriptionUr: "خالص گندم کی روایتی تندوری روٹی۔",
    image: "/src/assets/images/tandoori_roghani_naan_1791650436097.jpg",
    spiceLevel: 0,
    isPopular: false,
    isAvailable: true,
    portion: "1 Roti"
  },
  {
    id: "chicken-biryani",
    nameEn: "Dum Pukht Chicken Biryani",
    nameUr: "دم پخت چکن بریانی",
    category: "rice",
    price: 520,
    descriptionEn: "Aromatic long-grain basmati rice layered with spiced marinated chicken, saffron, dried plums (Aloo Bukhara), and golden fried onions.",
    descriptionUr: "خوشبودار باسمتی چاول، زعفران، آلو بخارا اور تلی پیاز کے ساتھ دم دی گئی لذیذ بریانی۔",
    image: "/src/assets/images/hero_kabab_platter_1791650384918.jpg",
    spiceLevel: 2,
    isPopular: true,
    isAvailable: true,
    portion: "Double Plate with Raita"
  },
  {
    id: "zeera-raita-salad",
    nameEn: "Mint Podina Raita & Kachumber",
    nameUr: "پودینہ زیرہ رائتہ اور کچومر سلاد",
    category: "sides",
    price: 120,
    descriptionEn: "Chilled whipped yogurt seasoned with roasted cumin and wild mint leaves, paired with crisp diced cucumber, tomato, and onion relish.",
    descriptionUr: "تازہ پودینے اور بھنے زیرے کا ٹھنڈا رائتہ، تازہ کچومر سلاد کے ساتھ۔",
    image: "/src/assets/images/seekh_kabab_skewers_1791650399734.jpg",
    spiceLevel: 0,
    isPopular: false,
    isAvailable: true,
    portion: "1 Bowl"
  },
  {
    id: "shahi-kheer",
    nameEn: "Traditional Matka Shahi Kheer",
    nameUr: "روایتی مٹکا شاہی کھیر",
    category: "desserts",
    price: 280,
    descriptionEn: "Slow-simmered rice pudding enriched with condensed buffalo milk, crushed green cardamoms, pistachios, and pure silver leaf (Chandi Warq).",
    descriptionUr: "مٹی کی چھوٹی پیالی میں پیش کی جانے والی گاڑھی زعفرانی کھیر، پستے اور چاندی کے ورق سے سجی ہوئی۔",
    image: "/src/assets/images/hero_kabab_platter_1791650384918.jpg",
    spiceLevel: 0,
    isPopular: true,
    isAvailable: true,
    portion: "Clay Matka Bowl"
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Malik Usman Tariq",
    authorUr: "ملک عثمان طارق",
    source: "Google Maps",
    rating: 5,
    date: "2 weeks ago",
    contentEn: "Hands down the best Seekh Kabab and Shinwari Karahi in Rahim Yar Khan! The meat is always tender, juicy, and smoky right off the coal. The family hall in Abbasia Town is spacious and welcoming.",
    contentUr: "رحیم یار خان میں سب سے لذیذ سیخ کباب اور شنواری کڑاہی! گوشت انتہائی نرم اور کوئلے کی خوشبو سے بھرپور ہوتا ہے۔ عباسیہ ٹاؤن میں فیملی کے ساتھ کھانا کھانے کی بہترین جگہ۔",
    verified: true
  },
  {
    id: "rev-2",
    author: "Dr. Ayesha Farooq",
    authorUr: "ڈاکٹر عائشہ فاروق",
    source: "Foodpanda",
    rating: 5,
    date: "1 month ago",
    contentEn: "Ordered via Foodpanda for our hospital team dinner. The mixed BBQ platter arrived piping hot with fluffy Roghani Naans and zesty podina chutney. Consistent 4.6 star quality every time.",
    contentUr: "فوڈ پانڈا سے ہسپتال کے عملے کے لیے آرڈر کیا تھا۔ مکس باربی کیو پلیٹر بالکل گرما گرم پہنچا، روغنی نان اور چٹنی لاجواب تھی۔ زبردست سروس!",
    verified: true
  },
  {
    id: "rev-3",
    author: "Chaudhry Bilal Warraich",
    authorUr: "چوہدری بلال وڑائچ",
    source: "Google Maps",
    rating: 5,
    date: "2 months ago",
    contentEn: "Chicken Malai Boti melts in your mouth! Authentic desi taste without unnecessary food colors. We drive all the way from Sadiqabad just to have dinner here. Highly recommended.",
    contentUr: "چکن ملائی بوٹی کا کوئی جواب نہیں، منہ میں گھل جاتی ہے۔ بغیر کسی مصنوعی رنگ کے خالص روایتی دیسی ذائقہ۔ صادق آباد سے خاص طور پر کھانا کھانے آتے ہیں۔",
    verified: true
  },
  {
    id: "rev-4",
    author: "Zubair Ahmad Qureshi",
    authorUr: "زبیر احمد قریشی",
    source: "Foodpanda",
    rating: 4.8,
    date: "3 months ago",
    contentEn: "Black Pepper Chicken Karahi and Dum Biryani were top-notch. Fresh meat, generous portion size, and reasonable pricing compared to other restaurants on Abu Dhabi Road.",
    contentUr: "کالی مرچ چکن کڑاہی اور دم بریانی کا الگ ہی مزہ ہے۔ تازہ گوشت اور مناسب قیمت۔ رحیم یار خان میں سب سے بھروسہ مند ریسٹورنٹ۔",
    verified: true
  }
];

export const GALLERY_ITEMS = [
  {
    titleEn: "Master Grill Station",
    titleUr: "لائیو کوئلہ باربی کیو",
    descEn: "Live coal grilling in Abbasia Town",
    descUr: "عباسیہ ٹاؤن میں لائیو سیخوں پر کباب",
    image: "/src/assets/images/seekh_kabab_skewers_1791650399734.jpg"
  },
  {
    titleEn: "Signature BBQ Sizzler",
    titleUr: "شاہی سزلر پلیٹر",
    descEn: "Steaming hot cast-iron feast",
    descUr: "گرما گرم لوہے کی پلیٹ پر پیشکش",
    image: "/src/assets/images/hero_kabab_platter_1791650384918.jpg"
  },
  {
    titleEn: "Creamy Malai Skewers",
    titleUr: "ریشمی ملائی بوٹی",
    descEn: "Velvety chicken infused with cream & green cardamom",
    descUr: "تازہ کریم اور الائچی کے عرق میں تیار",
    image: "/src/assets/images/chicken_malai_boti_1791650411207.jpg"
  },
  {
    titleEn: "Clay Tandoor Bakery",
    titleUr: "روایتی مٹی کا تندور",
    descEn: "Artisan Roghani Naan with sesame and desi butter",
    descUr: "روغنی نان اور تازہ تندوری روٹی",
    image: "/src/assets/images/tandoori_roghani_naan_1791650436097.jpg"
  },
  {
    titleEn: "Shinwari Wok Specialties",
    titleUr: "شنواری کڑاہی",
    descEn: "High-flame iron karahi cooking with fresh tomatoes",
    descUr: "تیز آنچ پر ٹماٹر اور ہری مرچ میں تیار",
    image: "/src/assets/images/mutton_karahi_pot_1791650422813.jpg"
  }
];
