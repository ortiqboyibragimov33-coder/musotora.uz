export const HOTEL_COORDS = {
  lat: 41.3793427,
  lng: 60.3602015,
} as const;

export const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/Hotel+Muso+To'ra/@41.3862356,60.351282,3177m/data=!3m1!1e3!4m9!3m8!1s0x41dfa51adfda2cf1:0x736cb516131d03ee!5m2!4m1!1i2!8m2!3d41.3793427!4d60.3602015!16s%2Fg%2F11j8l69wg8?entry=ttu";

export const USER_PATIO_PHOTO =
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/4b/20/79/patio-interior.jpg?w=1000&h=800&s=1';

export const CAFE_IMAGES = {
  hero: USER_PATIO_PHOTO,
  interior: USER_PATIO_PHOTO,
  plov: USER_PATIO_PHOTO,
  somsa: USER_PATIO_PHOTO,
  manti: USER_PATIO_PHOTO,
} as const;

export type MenuCategoryKey =
  | 'Tonggi Qahva'
  | 'Mavsumiy Taomlar'
  | 'Mualliflik Pishiriqlari';

export interface MenuHighlight {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  placeholderLabel: string;
  category: MenuCategoryKey;
}

export const MENU_HIGHLIGHTS: MenuHighlight[] = [
  {
    id: 'toshkent-osh',
    title: 'Toshkent Oshi',
    description: 'Sarxil qo‘y go‘shti, sariq sabzi, pishgan sarimsoq va anor donalari.',
    image: USER_PATIO_PHOTO,
    imageAlt: "Hotel Muso To'ra hovlisi va milliy dasturxon muhiti",
    placeholderLabel: 'Toshkent Oshi',
    category: 'Mavsumiy Taomlar',
  },
  {
    id: 'tandir-somsa',
    title: 'Tandir Somsa',
    description: 'Qo‘lda ochilgan qatlamali xamir, ziravorli go‘sht, kunjut va pomidor qaylasi.',
    image: USER_PATIO_PHOTO,
    imageAlt: "Hotel Muso To'ra ayvoni va mehmonxona ko‘rinishi",
    placeholderLabel: 'Tandir Somsa',
    category: 'Mualliflik Pishiriqlari',
  },
  {
    id: 'qaynoq-manti',
    title: 'Qaynoq Manti',
    description: 'Yupqa tugilgan manti, mayin suzma qatiq, paprika sariyog‘i va yangi shivit.',
    image: USER_PATIO_PHOTO,
    imageAlt: "Hotel Muso To'ra ichki hovlisi va dam olish maskani",
    placeholderLabel: 'Qaynoq Manti',
    category: 'Mavsumiy Taomlar',
  },
];

export interface FullMenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  dietary?: ('Oʻ' | 'G')[];
}

export const FULL_MENU: Record<MenuCategoryKey, FullMenuItem[]> = {
  'Tonggi Qahva': [
    {
      id: 'yakka-navli-damlama',
      name: 'Yakka Navli Qo‘lda Damlama',
      description: 'Yuvilgan Efiopiya Yirgacheffe — bergamot, oq yasmin va asal taʼmi.',
      price: '38 000 so‘m',
      dietary: ['Oʻ', 'G'],
    },
    {
      id: 'samarqand-kok-choyi',
      name: 'Samarqand Ko‘k Choyi va Novvot',
      description: 'Tog‘ ko‘k choyi sopol choynakda damlanib, qahrabo novvot bilan tortiladi.',
      price: '28 000 so‘m',
      dietary: ['Oʻ', 'G'],
    },
    {
      id: 'qosh-kortado',
      name: 'Qo‘sh Espresso Kortado',
      description: 'Mavsumiy qahva aralashmasi, bug‘langan organik sut yoki suli suti bilan.',
      price: '34 000 so‘m',
      dietary: ['Oʻ', 'G'],
    },
    {
      id: 'sovuq-damlama',
      name: 'Asta Tomchilatilgan Cold Brew',
      description: 'O‘n ikki soatlik shisha minora ekstraksiyasi, qora kakao va olcha notalari.',
      price: '36 000 so‘m',
      dietary: ['Oʻ', 'G'],
    },
    {
      id: 'marosim-matcha',
      name: 'Uji Marosim Matchasi',
      description: 'Tosh tegirmonda maydalangan birinchi hosil ko‘k choyi, sof yoki suli suti bilan.',
      price: '42 000 so‘m',
      dietary: ['Oʻ', 'G'],
    },
  ],
  'Mavsumiy Taomlar': [
    {
      id: 'toshkent-osh-item',
      name: 'Toshkent Meros Oshi',
      description: 'Lazer guruch, yumshoq qo‘y go‘shti, shirin sariq sabzi, no‘xat va pishgan sarimsoq.',
      price: '85 000 so‘m',
      dietary: ['G'],
    },
    {
      id: 'qaynoq-manti-item',
      name: 'Qo‘lda Tugilgan Manti',
      description: 'Yupqa yoyilgan xamir, mayin suzma qatiq, qizil qalampirli sariyog‘ va yangi shivit.',
      price: '68 000 so‘m',
    },
    {
      id: 'qoziqorin-tart',
      name: 'Yovvoyi Qo‘ziqorinli Tart',
      description: 'Qatlamali xamir, chanterelle qo‘ziqorini, tog‘ keki, yumshoq tuxum va pishloq.',
      price: '72 000 so‘m',
      dietary: ['Oʻ'],
    },
    {
      id: 'achichuk-salat',
      name: 'Anʼanaviy Achichuk Salati',
      description: 'Yupqa to‘g‘ralgan pushti pomidor, shirin qizil piyoz va kashnich urug‘i.',
      price: '32 000 so‘m',
      dietary: ['Oʻ', 'G'],
    },
    {
      id: 'qishloq-tuxumi',
      name: 'Mayin Qishloq Tuxumi',
      description: 'Qovurilgan sariyog‘ va ko‘k piyoz, xamirturushli non, dengiz tuzi.',
      price: '48 000 so‘m',
      dietary: ['Oʻ'],
    },
  ],
  'Mualliflik Pishiriqlari': [
    {
      id: 'tandir-somsa-item',
      name: 'Qatlamali Tandir Somsa',
      description: 'Qo‘lda ochilgan xamir, chopilgan go‘sht va piyoz, kunjut, pomidor qaylasi.',
      price: '35 000 so‘m',
    },
    {
      id: 'issiq-patir-non',
      name: 'Issiq Tandir Patir Non',
      description: 'Qarsildoq naqshli chetlar, sariyog‘li yumshoq mag‘iz, dengiz tuzi va kunjut.',
      price: '24 000 so‘m',
      dietary: ['Oʻ'],
    },
    {
      id: 'kardamonli-briosh',
      name: 'Kardamonli Briosh Tugunchasi',
      description: 'Yangi maydalangan yashil kardamon, sariyog‘, maskarpone kremi va pista.',
      price: '36 000 so‘m',
      dietary: ['Oʻ'],
    },
    {
      id: 'anjirli-galeta',
      name: 'Qora Anjirli Galeta',
      description: 'Grechka xamiri, asalli rikotta pishlog‘i va yangi kekik gullari.',
      price: '40 000 so‘m',
      dietary: ['Oʻ'],
    },
  ],
};

export const MENU_CATEGORIES: MenuCategoryKey[] = [
  'Tonggi Qahva',
  'Mavsumiy Taomlar',
  'Mualliflik Pishiriqlari',
];

export const STORY_CHAPTERS = [
  {
    eyebrow: '01. Kelib Chiqish va Qovurish',
    title: 'Kichik partiyalarda qovurilgan sara qahva va tog‘ choylari.',
    body: 'Qahva va choy dasturimiz Efiopiya hamda Kolumbiyaning baland tog‘ mikrolotlarini mahalliy tog‘ ko‘k choylari bilan uyg‘unlashtiradi. Har bir hosil nozik gul iforlari va sof taʼmni saqlash uchun yengil qovuriladi.',
  },
  {
    eyebrow: '02. Oshxona va Tandir',
    title: 'Tonggi bozor masalliqlaridan tayyorlangan mavsumiy meros.',
    body: 'Har bir taom — Toshkent oshi, qo‘lda tugilgan manti va issiq tandir patiridan tortib mualliflik pishiriqlarigacha — mahalliy donlar, yaylov suti va har kuni ertalab keltiriladigan sarxil mahsulotlardan pishiriladi.',
  },
  {
    eyebrow: '03. Meʼmoriy Sokinlik',
    title: 'Ohakli suvoq, tabiiy travertin va kunduzgi yorug‘lik.',
    body: 'Shahar shovqinidan yiroq osoyishta maskan sifatida loyihalangan Muso To‘ra zali tabiiy yog‘och va qo‘lda yasalgan sopol idishlarni uyg‘unlashtirib, suhbat va tonggi tinchlikni asraydi.',
  },
];

export const RESERVATION_TIMES = [
  '08:30',
  '10:00',
  '12:30',
  '18:30',
  '20:00',
] as const;

export const RESERVATION_GUESTS = [
  '1 Mehmon',
  '2 Mehmon',
  '4 Mehmon',
  '6 Mehmon',
] as const;

export const CAFE_INFO = {
  brand: "MUSO TO'RA",
  brandDisplay: "Muso To'ra",
  tagline: 'Tongdan kechgacha mehmondo‘stlik.',
  address: 'O‘zbekiston, Xiva',
  hours: 'Se–Ya, 08:00 – 22:00',
  email: 'hello@musotora.uz',
  instagramUrl: 'https://instagram.com',
  copyright: "© 2026 Muso To'ra",
} as const;
