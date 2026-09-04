/* =========================================================
   Vape One Shop — Oujda, Maroc
   Configuration boutique + catalogue (FR / AR)
   ========================================================= */

const SHOP = {
  name: 'Vape One Shop',
  city: 'Oujda',

  /* Numéro WhatsApp de la boutique (format international, sans « + ») */
  whatsapp: '212708002430',
  phoneDisplay: '+212 708 002 430',

  email: 'Isam7073@gmail.com',
  address: 'Rte Tayret, quartier Médina — Oujda, Maroc',
  addressAr: 'طريق تايرت، حي المدينة — وجدة، المغرب',
  mapsUrl: 'https://maps.app.goo.gl/XPb42uW88PPybPNv5',

  /* Réseaux sociaux : retirer une ligne ou vider son url pour la masquer */
  socials: [
    { type: 'instagram', label: '@vapeone.ma',  url: 'https://www.instagram.com/vapeone.ma/' },
    { type: 'facebook',  label: 'Vapeone Oujda', url: 'https://www.facebook.com/p/Vapeone-oujda-61551052121428/' },
    { type: 'tiktok',    label: '',              url: '' }
  ],

  /* Photos de la boutique (section « La boutique »).
     Déposez les fichiers dans assets/img/shop/ ; une photo absente
     est simplement ignorée, la galerie s'adapte. */
  photos: [
    { src: 'assets/img/shop/interieur.jpg', fr: 'Les rayons : e-liquides, puffs et matériel', ar: 'الرفوف: سوائل، بوف وأجهزة' },
    { src: 'assets/img/shop/devanture.jpg', pos: '50% 26%', fr: 'La devanture, ouverte 24 h/24', ar: 'واجهة المحل، مفتوح 24 ساعة' },
    { src: 'assets/img/shop/comptoir.jpg',  fr: 'Le comptoir et les nouveautés', ar: 'المنضدة والمنتجات الجديدة' }
  ],
  open247: true,

  /* Programme de fidélité — retour d'environ 3,3 % du montant dépensé */
  loyalty: {
    ratio:  { fr: '1 point par tranche de 10 DH dépensés',
              ar: 'نقطة واحدة عن كل 10 دراهم' },
    reward: { fr: '150 points = 50 DH de réduction',
              ar: '150 نقطة = تخفيض 50 درهم' }
  },

  currency: 'DH',
  currencyAr: 'درهم',
  freeShipping: 300,
  shipCost: 35
};

const CATEGORIES = [
  { id: 'all',          fr: 'Tout le catalogue',   ar: 'كل المنتجات' },
  { id: 'jetable',      fr: 'Puffs jetables',      ar: 'بوف للاستعمال الواحد' },
  { id: 'rechargeable', fr: 'Kits rechargeables',  ar: 'أجهزة قابلة للشحن' },
  { id: 'eliquide',     fr: 'E-liquides',          ar: 'سوائل إلكترونية' },
  { id: 'pod',          fr: 'Pods & résistances',  ar: 'بودات ومقاومات' },
  { id: 'accessoire',   fr: 'Accessoires',         ar: 'إكسسوارات' }
];

const BADGES = {
  'Best-seller': 'الأكثر مبيعاً',
  'Promo':       'تخفيض',
  'Nouveau':     'جديد',
  'Économique':  'اقتصادي',
  'Expert':      'للمحترفين',
  'Sevrage':     'للإقلاع',
  'Pack malin':  'عرض مجموعة'
};

const PRODUCTS = [
  {
    id: 'crown-bar-sound-12k-mango', category: 'jetable',
    price: 230, oldPrice: 280, puffs: 12000, nic: 20, stock: 30,
    badge: null, colors: ['#d99a3c', '#7a4b12'],
    image: 'assets/img/products/crown-bar-sound-12k-mango-ice.webp', fit: 'cover',
    fr: {
      name: 'Al Fakher Crown Bar Sound 12K · Mango Ice', flavor: 'Mangue glacée',
      notes: ['Hookah Soundwaves', 'Écran LED', 'Recharge USB-C', 'DTL · 20 mg/ml'],
      desc: "Crown Bar Sound : 12 000 bouffées, son de narguilé intégré à l'inhalation, écran LED indiquant batterie et niveau de liquide, recharge USB-C et tirage direct. Saveur mangue glacée, 20 mg/ml."
    },
    ar: {
      name: 'الفاخر كراون بار ساوند 12K · مانجو آيس', flavor: 'مانجو بارد',
      notes: ['صوت الشيشة', 'شاشة LED', 'شحن USB-C', 'سحب مباشر · 20 ملغ/مل'],
      desc: 'كراون بار ساوند: 12000 نفس، صوت الشيشة عند السحب، شاشة LED تبيّن البطارية ومستوى السائل، شحن USB-C وسحب مباشر. نكهة مانجو باردة بتركيز 20 ملغ/مل.'
    }
  },
  {
    id: 'crown-bar-sound-12k-two-apple', category: 'jetable',
    price: 230, oldPrice: null, puffs: 12000, nic: 20, stock: 26,
    badge: 'Nouveau', colors: ['#e0324a', '#8fae4a'],
    image: 'assets/img/products/crown-bar-sound-12k-two-apple.webp', fit: 'cover',
    fr: {
      name: 'Al Fakher Crown Bar Sound 12K · Two Apple', flavor: 'Double pomme',
      notes: ['Hookah Soundwaves', 'Écran LED', 'Recharge USB-C', 'DTL · 20 mg/ml'],
      desc: "La double pomme du narguilé, en version jetable : 12 000 bouffées, son de narguilé à l'inhalation, écran LED, recharge USB-C et tirage direct. 20 mg/ml."
    },
    ar: {
      name: 'الفاخر كراون بار ساوند 12K · تفاحتين', flavor: 'تفاحتين',
      notes: ['صوت الشيشة', 'شاشة LED', 'شحن USB-C', 'سحب مباشر · 20 ملغ/مل'],
      desc: 'نكهة التفاحتين المعروفة في الشيشة، في جهاز للاستعمال الواحد: 12000 نفس، صوت الشيشة عند السحب، شاشة LED، شحن USB-C وسحب مباشر. 20 ملغ/مل.'
    }
  },
  {
    id: 'crown-bar-40k-strawberry', category: 'jetable',
    price: 250, oldPrice: null, puffs: 40000, nic: 20, stock: 16,
    badge: 'Best-seller', colors: ['#e11d2a', '#1a1a1e'],
    art: 'crownbar',
    image: 'assets/img/products/crown-bar-40k-strawberry-punch.webp', fit: 'cover',
    fr: {
      name: 'Al Fakher Crown Bar 40K MegaMax · Strawberry Punch', flavor: 'Fraise punch',
      notes: ['Double écran LED', 'Recharge USB-C', 'Big Cloud · DTL', '20 mg/ml'],
      desc: "Le format MegaMax de la gamme Crown Bar : 40 000 bouffées, double écran LED pour la batterie et le niveau de liquide, recharge USB-C et tirage direct. Saveur fraise punch, 20 mg/ml."
    },
    ar: {
      name: 'الفاخر كراون بار 40K ميغاماكس · فراولة بانش', flavor: 'فراولة بانش',
      notes: ['شاشتان LED', 'شحن USB-C', 'دخان كثيف · سحب مباشر', '20 ملغ/مل'],
      desc: 'الحجم الكبير من تشكيلة كراون بار: 40000 نفس، شاشتان LED للبطارية ومستوى السائل، شحن USB-C وسحب مباشر. نكهة فراولة بانش بتركيز 20 ملغ/مل.'
    }
  },
  {
    id: 'curieux-oldies-70s-caramel', category: 'eliquide',
    price: 120, oldPrice: null, puffs: null, nic: 0, stock: 18,
    badge: 'Nouveau', colors: ['#f0a63c', '#c2521f'],
    image: 'assets/img/products/curieux-oldies-70s-sunday-caramel.png',
    fr: {
      name: "Curieux Oldies 70's · Sunday Caramel — 50 ml", flavor: 'Caramel gourmand',
      notes: ['50 ml en flacon 60 ml', '40 PG / 60 VG', '0 mg/ml', 'Booster à ajouter'],
      desc: "E-liquide français de la gamme Oldies par Curieux : un profil gourmand caramel, façon coupe glacée. Fiole de 50 ml en 0 mg dans un flacon de 60 ml, prévue pour recevoir un booster de nicotine selon votre dosage."
    },
    ar: {
      name: "كوريو أولديز 70 · صانداي كراميل — 50 مل", flavor: 'كراميل',
      notes: ['50 مل في قنينة 60 مل', '40 PG / 60 VG', '0 ملغ/مل', 'يُضاف البوستر'],
      desc: 'سائل فرنسي من تشكيلة أولديز لـ Curieux: نكهة كراميل غنية على طريقة المثلجات. قنينة 50 مل بدون نيكوتين داخل حجم 60 مل، مهيأة لإضافة بوستر النيكوتين حسب التركيز الذي تريده.'
    }
  }
];
