export const siteConfig = {
  name: 'Diamond Shop',
  tagline: 'Cambodia No.1 Game Top-Up',
  url: 'https://diamondshop.vercel.app',
  email: 'hoeumsenghun369@gmail.com',
  telegram: '@hoeum_senghun',
  phone: '+855 978684464',
}

export const navLinks = [
  { href: '/#home', key: 'nav.home', section: 'home' },
  { href: '/#games', key: 'nav.games', section: 'games' },
  { href: '/#games', key: 'nav.topup', section: 'games' },
  { href: '/#promo', key: 'nav.promo', section: 'promo' },
  { href: '/#contact', key: 'nav.contact', section: 'contact' },
]

export const promoTicker = [
  { id: 1, key: 'ticker.promo1' },
  { id: 2, key: 'ticker.promo2' },
  { id: 3, key: 'ticker.promo3' },
  { id: 4, key: 'ticker.promo4' },
]

export const heroBanners = [
  {
    id: 1,
    titleKey: 'hero.banner1.title',
    subtitleKey: 'hero.banner1.subtitle',
    ctaKey: 'hero.cta',
    gradient: 'from-violet-600 via-indigo-600 to-cyan-500',
    image: '/banners/banner-1.svg',
  },
  {
    id: 2,
    titleKey: 'hero.banner2.title',
    subtitleKey: 'hero.banner2.subtitle',
    ctaKey: 'hero.cta',
    gradient: 'from-rose-600 via-fuchsia-600 to-purple-600',
    image: '/banners/banner-2.svg',
  },
  {
    id: 3,
    titleKey: 'hero.banner3.title',
    subtitleKey: 'hero.banner3.subtitle',
    ctaKey: 'hero.cta',
    gradient: 'from-amber-500 via-orange-600 to-red-600',
    image: '/banners/banner-3.svg',
  },
]

export const games = [
  {
    id: 'mlbb',
    name: 'Mobile Legends',
    slug: 'mobile-legends',
    category: 'moba',
    trending: true,
    color: '#1a56db',
    image: '/games/mlbb.jpg',
    icon: '⚔️',
    packages: [
      { id: 'ml-86', diamonds: 86, bonus: 0, price: 1.99, currency: 'USD' },
      { id: 'ml-172', diamonds: 172, bonus: 8, price: 3.99, currency: 'USD' },
      { id: 'ml-257', diamonds: 257, bonus: 16, price: 5.99, currency: 'USD' },
      { id: 'ml-514', diamonds: 514, bonus: 51, price: 11.99, currency: 'USD' },
      { id: 'ml-1220', diamonds: 1220, bonus: 122, price: 24.99, currency: 'USD' },
    ],
  },
  {
    id: 'ff',
    name: 'Free Fire',
    slug: 'free-fire',
    category: 'battle-royale',
    trending: true,
    color: '#ea580c',
    image: '/games/ff.png',
    icon: '🔥',
    packages: [
      { id: 'ff-100', diamonds: 100, bonus: 0, price: 0.99, currency: 'USD' },
      { id: 'ff-310', diamonds: 310, bonus: 31, price: 2.99, currency: 'USD' },
      { id: 'ff-520', diamonds: 520, bonus: 52, price: 4.99, currency: 'USD' },
      { id: 'ff-1060', diamonds: 1060, bonus: 106, price: 9.99, currency: 'USD' },
    ],
  },
  {
    id: 'pubg',
    name: 'PUBG Mobile',
    slug: 'pubg-mobile',
    category: 'battle-royale',
    trending: true,
    color: '#f59e0b',
    image: '/games/pubg.png',
    icon: '🎯',
    packages: [
      { id: 'pubg-60', diamonds: 60, bonus: 0, price: 0.99, currency: 'USD' },
      { id: 'pubg-325', diamonds: 325, bonus: 25, price: 4.99, currency: 'USD' },
      { id: 'pubg-660', diamonds: 660, bonus: 60, price: 9.99, currency: 'USD' },
      { id: 'pubg-1800', diamonds: 1800, bonus: 200, price: 24.99, currency: 'USD' },
    ],
  },
  {
    id: 'hok',
    name: 'Honor of Kings',
    slug: 'honor-of-kings',
    category: 'moba',
    trending: false,
    color: '#dc2626',
    image: '/games/hok.png',
    icon: '👑',
    packages: [
      { id: 'hok-80', diamonds: 80, bonus: 0, price: 1.49, currency: 'USD' },
      { id: 'hok-240', diamonds: 240, bonus: 12, price: 3.99, currency: 'USD' },
      { id: 'hok-400', diamonds: 400, bonus: 40, price: 6.99, currency: 'USD' },
    ],
  },
  {
    id: 'genshin',
    name: 'Genshin Impact',
    slug: 'genshin-impact',
    category: 'rpg',
    trending: true,
    color: '#0ea5e9',
    image: '/games/genshin.png',
    icon: '✨',
    packages: [
      { id: 'gi-60', diamonds: 60, bonus: 0, price: 0.99, currency: 'USD' },
      { id: 'gi-300', diamonds: 300, bonus: 30, price: 4.99, currency: 'USD' },
      { id: 'gi-980', diamonds: 980, bonus: 110, price: 14.99, currency: 'USD' },
      { id: 'gi-1980', diamonds: 1980, bonus: 260, price: 29.99, currency: 'USD' },
    ],
  },
  {
    id: 'codm',
    name: 'Call of Duty Mobile',
    slug: 'cod-mobile',
    category: 'fps',
    trending: false,
    color: '#22c55e',
    image: '/games/cod.png',
    icon: '💣',
    packages: [
      { id: 'cod-80', diamonds: 80, bonus: 0, price: 0.99, currency: 'USD' },
      { id: 'cod-420', diamonds: 420, bonus: 42, price: 4.99, currency: 'USD' },
      { id: 'cod-880', diamonds: 880, bonus: 88, price: 9.99, currency: 'USD' },
    ],
  },
  {
    id: 'rov',
    name: 'RoV / Arena of Valor',
    slug: 'rov',
    category: 'moba',
    trending: false,
    color: '#8b5cf6',
    image: '/games/aov.png',
    icon: '🛡️',
    packages: [
      { id: 'rov-90', diamonds: 90, bonus: 0, price: 1.99, currency: 'USD' },
      { id: 'rov-185', diamonds: 185, bonus: 15, price: 3.99, currency: 'USD' },
      { id: 'rov-370', diamonds: 370, bonus: 37, price: 7.99, currency: 'USD' },
    ],
  },
  {
    id: 'zepeto',
    name: 'Zepeto',
    slug: 'zepeto',
    category: 'social',
    trending: false,
    color: '#ec4899',
    image: '/games/zepeto.png',
    icon: '💎',
    packages: [
      { id: 'zp-14', diamonds: 14, bonus: 0, price: 0.99, currency: 'USD' },
      { id: 'zp-70', diamonds: 70, bonus: 7, price: 4.99, currency: 'USD' },
      { id: 'zp-140', diamonds: 140, bonus: 14, price: 9.99, currency: 'USD' },
    ],
  },
]

export const paymentMethods = [
  {
    id: 'aba',
    name: 'ABA Pay',
    image: '/payment/ABA_Logo.png',
    icon: '🏦',
    descriptionKey: 'payment.aba.desc',
  },
  {
    id: 'acleda',
    name: 'ACLEDA',
    image: '/payment/ACLEDA_Logo.jpg',
    icon: '💳',
    descriptionKey: 'payment.acleda.desc',
  },
  {
    id: 'khqr',
    name: 'Bakong KHQR',
    image: '/payment/KHQR_Logo.png',
    icon: '📱',
    descriptionKey: 'payment.khqr.desc',
  },
]

export const footerCategories = [
  { key: 'footer.cat.moba', href: '/#games', section: 'games' },
  { key: 'footer.cat.battle', href: '/#games', section: 'games' },
  { key: 'footer.cat.rpg', href: '/#games', section: 'games' },
  { key: 'footer.cat.fps', href: '/#games', section: 'games' },
]

export const footerQuickLinks = [
  { key: 'footer.link.faq', href: '/#contact', section: 'contact' },
  { key: 'footer.link.terms', href: '#' },
  { key: 'footer.link.privacy', href: '#' },
  { key: 'footer.link.refund', href: '#' },
]
