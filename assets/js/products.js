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
    id: 'vo-ice-mango-9k', category: 'jetable',
    price: 150, oldPrice: 190, puffs: 9000, nic: 20, stock: 42,
    badge: 'Best-seller', colors: ['#ffb347', '#e11d2a'],
    fr: {
      name: 'Puff 9000 · Ice Mango', flavor: 'Mangue glacée',
      notes: ['Mangue mûre', 'Menthe fraîche', 'Mesh 1.2Ω'],
      desc: "Mangue juteuse adoucie par une pointe de fraîcheur. Résistance mesh 1.2Ω : le goût reste constant jusqu'à la dernière bouffée."
    },
    ar: {
      name: 'بوف 9000 · مانجو بارد', flavor: 'مانجو مع نعناع',
      notes: ['مانجو ناضجة', 'نعناع منعش', 'مقاومة ميش 1.2Ω'],
      desc: 'مانجو غنية مع لمسة انتعاش. مقاومة ميش 1.2Ω تحافظ على نفس النكهة حتى آخر نفس.'
    }
  },
  {
    id: 'vo-blue-razz-9k', category: 'jetable',
    price: 150, puffs: 9000, nic: 20, stock: 30,
    badge: null, colors: ['#4facfe', '#1d4ed8'],
    fr: {
      name: 'Puff 9000 · Blue Razz', flavor: 'Framboise bleue',
      notes: ['Framboise', 'Acidulé', 'Fraîcheur légère'],
      desc: "Framboise bleue façon bonbon, sur un fond frais et légèrement sucré. Une valeur sûre pour la journée."
    },
    ar: {
      name: 'بوف 9000 · بلو راز', flavor: 'توت أزرق',
      notes: ['توت العليق', 'حامض حلو', 'انتعاش خفيف'],
      desc: 'توت أزرق بطعم الحلوى مع خلفية منعشة وحلاوة خفيفة. اختيار مضمون للاستعمال اليومي.'
    }
  },
  {
    id: 'vo-watermelon-6k', category: 'jetable',
    price: 120, puffs: 6000, nic: 10, stock: 55,
    badge: null, colors: ['#43e97b', '#ff6a88'],
    fr: {
      name: 'Puff 6000 · Watermelon', flavor: 'Pastèque',
      notes: ['Pastèque juteuse', 'Peu sucré', '10 mg/ml'],
      desc: "Pastèque désaltérante en 10 mg/ml : un hit doux, adapté aux petits fumeurs."
    },
    ar: {
      name: 'بوف 6000 · دلاح', flavor: 'دلاح',
      notes: ['دلاح طري', 'حلاوة خفيفة', '10 ملغ/مل'],
      desc: 'دلاح منعش بتركيز 10 ملغ/مل: ضربة خفيفة على الحلق، مناسب للمدخنين الخفاف.'
    }
  },
  {
    id: 'vo-mint-12k', category: 'jetable',
    price: 200, oldPrice: 240, puffs: 12000, nic: 20, stock: 18,
    badge: 'Nouveau', colors: ['#22d3ee', '#1d4ed8'],
    fr: {
      name: 'Puff 12000 · Arctic Mint', flavor: 'Menthe glaciale',
      notes: ['Menthe forte', 'Écran de charge', 'Mesh double'],
      desc: "12 000 bouffées, écran de charge et mesh double couche. Une menthe franche, sans amertume."
    },
    ar: {
      name: 'بوف 12000 · نعناع قطبي', flavor: 'نعناع قوي',
      notes: ['نعناع قوي', 'شاشة شحن', 'ميش مزدوج'],
      desc: '12000 نفس، شاشة لمستوى الشحن ومقاومة ميش مزدوجة. نعناع صافٍ بدون مرارة.'
    }
  },
  {
    id: 'vo-peach-12k', category: 'jetable',
    price: 200, puffs: 12000, nic: 20, stock: 24,
    badge: null, colors: ['#ffd26f', '#ff8177'],
    fr: {
      name: 'Puff 12000 · Peach Tea', flavor: 'Thé pêche',
      notes: ['Pêche blanche', 'Thé noir', 'Citron'],
      desc: "Un thé glacé à la pêche, peu sucré. Le profil le plus sobre de la gamme."
    },
    ar: {
      name: 'بوف 12000 · أتاي بالخوخ', flavor: 'شاي بالخوخ',
      notes: ['خوخ أبيض', 'شاي أسود', 'ليمون'],
      desc: 'شاي مثلج بالخوخ، حلاوته خفيفة. النكهة الأكثر هدوءاً في التشكيلة.'
    }
  },
  {
    id: 'vo-cola-6k', category: 'jetable',
    price: 120, puffs: 6000, nic: 20, stock: 0,
    badge: null, colors: ['#8e6142', '#f5af19'],
    fr: {
      name: 'Puff 6000 · Cola Ice', flavor: 'Cola glacé',
      notes: ['Cola', 'Zeste de citron', 'Glaçons'],
      desc: "Goût cola classique, version fraîche. Rupture temporaire, réassort en cours."
    },
    ar: {
      name: 'بوف 6000 · كولا بارد', flavor: 'كولا مثلجة',
      notes: ['كولا', 'قشر الليمون', 'ثلج'],
      desc: 'طعم الكولا الكلاسيكي بلمسة باردة. غير متوفر حالياً، سيصل قريباً.'
    }
  },
  {
    id: 'vo-pro-kit', category: 'rechargeable',
    price: 350, oldPrice: 420, puffs: null, nic: null, stock: 37,
    badge: 'Économique', colors: ['#1d4ed8', '#22d3ee'],
    fr: {
      name: 'Kit VAPE ONE PRO', flavor: 'Batterie 650 mAh',
      notes: ['USB-C', 'Pod 2 ml', 'Écran LED'],
      desc: "Batterie 650 mAh, charge USB-C en 25 minutes, pods interchangeables de 2 ml. Le remplacement direct des puffs jetables."
    },
    ar: {
      name: 'جهاز VAPE ONE PRO', flavor: 'بطارية 650 مللي أمبير',
      notes: ['شحن USB-C', 'بود 2 مل', 'شاشة LED'],
      desc: 'بطارية 650 مللي أمبير، شحن كامل في 25 دقيقة، بودات قابلة للتبديل سعة 2 مل. البديل المباشر للبوف.'
    }
  },
  {
    id: 'vo-pro-slim', category: 'rechargeable',
    price: 250, puffs: null, nic: null, stock: 21,
    badge: null, colors: ['#e11d2a', '#f093fb'],
    fr: {
      name: 'Kit VAPE ONE SLIM', flavor: 'Batterie 450 mAh',
      notes: ['Format poche', 'USB-C', 'Pod 2 ml'],
      desc: "Format fin, 42 g. Compatible avec toute la gamme de pods de la boutique."
    },
    ar: {
      name: 'جهاز VAPE ONE SLIM', flavor: 'بطارية 450 مللي أمبير',
      notes: ['حجم صغير', 'شحن USB-C', 'بود 2 مل'],
      desc: 'تصميم رفيع بوزن 42 غرام. متوافق مع جميع بودات المحل.'
    }
  },
  {
    id: 'vo-box-mod', category: 'rechargeable',
    price: 620, puffs: null, nic: null, stock: 9,
    badge: 'Expert', colors: ['#1d4ed8', '#0b1020'],
    fr: {
      name: 'Box Mod 80 W · kit complet', flavor: 'Puissance réglable 5–80 W',
      notes: ['Accu 18650', 'Clearomiseur 4 ml', 'Écran TFT'],
      desc: "Puissance réglable de 5 à 80 W, clearomiseur 4 ml, écran couleur. Accu 18650 non inclus."
    },
    ar: {
      name: 'بوكس مود 80 واط · طقم كامل', flavor: 'قوة قابلة للضبط 5–80 واط',
      notes: ['بطارية 18650', 'خزان 4 مل', 'شاشة ملونة'],
      desc: 'قوة قابلة للضبط من 5 إلى 80 واط، خزان 4 مل وشاشة ملونة. البطارية 18650 غير مرفقة.'
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
  },
  {
    id: 'vo-liq-mango', category: 'eliquide',
    price: 90, puffs: null, nic: 0, stock: 64,
    badge: null, colors: ['#ffb347', '#e11d2a'],
    fr: {
      name: 'E-liquide Mangue Ice · 50 ml', flavor: 'Mangue glacée',
      notes: ['50/50 PG-VG', '50 ml', '0 mg/ml'],
      desc: "Fiole de 50 ml en 0 mg, à doser avec des boosters selon vos besoins."
    },
    ar: {
      name: 'سائل مانجو بارد · 50 مل', flavor: 'مانجو مع نعناع',
      notes: ['50/50 PG-VG', '50 مل', '0 ملغ/مل'],
      desc: 'قنينة 50 مل بدون نيكوتين، تُضبط بالبوسترات حسب حاجتك.'
    }
  },
  {
    id: 'vo-liq-fraise', category: 'eliquide',
    price: 90, puffs: null, nic: 0, stock: 51,
    badge: null, colors: ['#f5576c', '#43e97b'],
    fr: {
      name: 'E-liquide Fraise Kiwi · 50 ml', flavor: 'Fraise kiwi',
      notes: ['50/50 PG-VG', '50 ml', 'Sans fraîcheur'],
      desc: "Fraise mûre et kiwi acidulé, sans effet frais. Conçu pour la vape indirecte (MTL)."
    },
    ar: {
      name: 'سائل فراولة وكيوي · 50 مل', flavor: 'فراولة وكيوي',
      notes: ['50/50 PG-VG', '50 مل', 'بدون برودة'],
      desc: 'فراولة ناضجة مع كيوي حامض، بدون إحساس بالبرودة. مناسب للسحب الفموي (MTL).'
    }
  },
  {
    id: 'vo-liq-tabac', category: 'eliquide',
    price: 45, puffs: null, nic: 12, stock: 80,
    badge: 'Sevrage', colors: ['#8e6142', '#c79a5b'],
    fr: {
      name: 'E-liquide Classic Blond · 10 ml', flavor: 'Tabac blond',
      notes: ['10 ml', '12 mg/ml', 'Sels de nicotine'],
      desc: "Tabac blond doux aux sels de nicotine : le format le plus demandé pour accompagner l'arrêt de la cigarette."
    },
    ar: {
      name: 'سائل تبغ أشقر · 10 مل', flavor: 'تبغ أشقر',
      notes: ['10 مل', '12 ملغ/مل', 'أملاح النيكوتين'],
      desc: 'تبغ أشقر ناعم بأملاح النيكوتين: الأكثر طلباً لمرافقة الإقلاع عن السجائر.'
    }
  },
  {
    id: 'vo-booster', category: 'eliquide',
    price: 50, puffs: null, nic: 20, stock: 120,
    badge: null, colors: ['#606c88', '#22d3ee'],
    fr: {
      name: 'Boosters nicotine 20 mg · x5', flavor: 'Base 50/50',
      notes: ['5 x 10 ml', '20 mg/ml', 'Base neutre'],
      desc: "Lot de 5 boosters de 10 ml en 20 mg/ml pour doser vos fioles de 50 ml. À tenir hors de portée des enfants."
    },
    ar: {
      name: 'بوسترات نيكوتين 20 ملغ · 5 قطع', flavor: 'قاعدة 50/50',
      notes: ['5 × 10 مل', '20 ملغ/مل', 'قاعدة محايدة'],
      desc: 'مجموعة من 5 بوسترات سعة 10 مل بتركيز 20 ملغ/مل لضبط قنينات 50 مل. يُحفظ بعيداً عن متناول الأطفال.'
    }
  },
  {
    id: 'vo-pod-mango', category: 'pod',
    price: 90, puffs: 1200, nic: 20, stock: 60,
    badge: null, colors: ['#ffb347', '#ff5f6d'],
    fr: {
      name: 'Pods Ice Mango · x2', flavor: 'Mangue glacée',
      notes: ['2 x 2 ml', 'Mesh 1.0Ω', 'Pré-remplis'],
      desc: "Lot de 2 pods pré-remplis, compatibles VAPE ONE PRO et SLIM. Environ 1 200 bouffées par pod."
    },
    ar: {
      name: 'بودات مانجو بارد · قطعتان', flavor: 'مانجو مع نعناع',
      notes: ['2 × 2 مل', 'ميش 1.0Ω', 'معبأة مسبقاً'],
      desc: 'مجموعة من بودين معبأين، متوافقة مع VAPE ONE PRO و SLIM. حوالي 1200 نفس لكل بود.'
    }
  },
  {
    id: 'vo-pod-pack', category: 'pod',
    price: 240, oldPrice: 280, puffs: 7200, nic: 20, stock: 15,
    badge: 'Pack malin', colors: ['#a18cd1', '#fbc2eb'],
    fr: {
      name: 'Pack découverte · 6 pods', flavor: '6 saveurs',
      notes: ['Mangue', 'Menthe', 'Framboise', 'Pêche'],
      desc: "Six pods, six saveurs, pour trouver la vôtre. Environ 7 200 bouffées au total."
    },
    ar: {
      name: 'باك اكتشاف · 6 بودات', flavor: '6 نكهات',
      notes: ['مانجو', 'نعناع', 'توت', 'خوخ'],
      desc: 'ستة بودات بستة نكهات لتختار المناسبة لك. حوالي 7200 نفس في المجموع.'
    }
  },
  {
    id: 'vo-coils', category: 'pod',
    price: 110, puffs: null, nic: null, stock: 45,
    badge: null, colors: ['#606c88', '#3f4c6b'],
    fr: {
      name: 'Résistances mesh 0.6Ω · x5', flavor: 'Mesh 0.6Ω',
      notes: ['Lot de 5', '20–30 W', 'Coton bio'],
      desc: "Résistances mesh 0.6Ω pour clearomiseur : chauffe rapide et rendu aromatique net."
    },
    ar: {
      name: 'مقاومات ميش 0.6Ω · 5 قطع', flavor: 'ميش 0.6Ω',
      notes: ['علبة من 5', '20–30 واط', 'قطن طبيعي'],
      desc: 'مقاومات ميش 0.6Ω للخزانات: تسخين سريع ونكهة واضحة.'
    }
  },
  {
    id: 'vo-pouch', category: 'accessoire',
    price: 90, puffs: null, nic: null, stock: 33,
    badge: null, colors: ['#22d3ee', '#1d4ed8'],
    fr: {
      name: 'Étui de transport néoprène', flavor: 'Néoprène rigide',
      notes: ['2 appareils', 'Poche pods', 'Fermeture zip'],
      desc: "Étui rigide : deux appareils, quatre pods et le câble, fermeture zippée."
    },
    ar: {
      name: 'حقيبة حفظ نيوبرين', flavor: 'نيوبرين صلب',
      notes: ['جهازان', 'جيب للبودات', 'سحاب'],
      desc: 'حقيبة صلبة تتسع لجهازين وأربعة بودات والكابل، بإغلاق سحاب.'
    }
  }
];
