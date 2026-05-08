import { Product, CartItem, HeroSettings, SiteSettings, Category } from './types';

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Нежность роз',
    price: 4500,
    oldPrice: 5500,
    image: 'https://images.pexels.com/photos/28857108/pexels-photo-28857108.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    category: 'roses',
    description: 'Изысканный букет из 25 кремовых роз, обрамлённых зеленью эвкалипта.',
    inStock: true,
    badge: 'Хит',
    rating: 4.9,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Розовый закат',
    price: 3800,
    image: 'https://images.pexels.com/photos/28759039/pexels-photo-28759039.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    category: 'roses',
    description: 'Нежный букет из розовых роз — идеальный подарок для любимого человека.',
    inStock: true,
    badge: 'Новинка',
    rating: 4.8,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Белая элегантность',
    price: 5200,
    oldPrice: 6000,
    image: 'https://images.pexels.com/photos/31368779/pexels-photo-31368779.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    category: 'premium',
    description: 'Премиальный букет из белых роз в чёрной упаковке с атласной лентой.',
    inStock: true,
    badge: 'Премиум',
    rating: 5.0,
    reviews: 67,
  },
  {
    id: '4',
    name: 'Романтика',
    price: 6500,
    image: 'https://images.pexels.com/photos/30386758/pexels-photo-30386758.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    category: 'premium',
    description: 'Роскошный букет из розовых и белых роз для особенных моментов.',
    inStock: true,
    rating: 4.7,
    reviews: 45,
  },
  {
    id: '5',
    name: 'Персиковая мечта',
    price: 3200,
    image: 'https://images.pexels.com/photos/32239878/pexels-photo-32239878.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    category: 'bouquets',
    description: 'Букет из нежных персиковых роз — воплощение лёгкости и красоты.',
    inStock: true,
    badge: 'Скидка',
    rating: 4.6,
    reviews: 112,
  },
  {
    id: '6',
    name: 'Свадебная классика',
    price: 7800,
    oldPrice: 9000,
    image: 'https://images.pexels.com/photos/37295996/pexels-photo-37295996.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    category: 'wedding',
    description: 'Классический свадебный букет из белых роз и гипсофилы.',
    inStock: true,
    badge: 'Свадьба',
    rating: 4.9,
    reviews: 203,
  },
];

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'all', name: 'Все букеты', icon: '💐', image: '' },
  { id: 'roses', name: 'Розы', icon: '🌹', image: '' },
  { id: 'premium', name: 'Премиум', icon: '👑', image: '' },
  { id: 'bouquets', name: 'Авторские', icon: '🎨', image: '' },
  { id: 'wedding', name: 'Свадебные', icon: '💒', image: '' },
  { id: 'gifts', name: 'Подарки', icon: '🎁', image: '' },
];

const DEFAULT_HERO: HeroSettings = {
  title: 'Цветы, которые говорят за вас',
  subtitle: 'Премиальные букеты с доставкой по городу за 2 часа. Каждый букет создаётся вручную нашими флористами.',
  backgroundImage: 'https://images.pexels.com/photos/5894088/pexels-photo-5894088.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  ctaText: 'Выбрать букет',
  overlayOpacity: 0.4,
  gradientFrom: '#1a0a2e',
  gradientTo: '#16213e',
};

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: 'FloraLux',
  phone: '+7 (999) 123-45-67',
  email: 'hello@floralux.ru',
  address: 'Москва, ул. Цветочная, д. 12',
  instagram: '@floralux',
  telegram: '@floralux_bot',
  whatsapp: '+79991234567',
  deliveryInfo: 'Бесплатная доставка от 5000₽',
  workingHours: 'Ежедневно с 8:00 до 22:00',
  announcementBar: '🌸 Скидка 15% на первый заказ по промокоду FLORA15',
  announcementEnabled: true,
};

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

type Listener = () => void;

class Store {
  private listeners: Set<Listener> = new Set();
  
  products: Product[] = loadFromStorage('flora_products', DEFAULT_PRODUCTS);
  cart: CartItem[] = loadFromStorage('flora_cart', []);
  heroSettings: HeroSettings = loadFromStorage('flora_hero', DEFAULT_HERO);
  siteSettings: SiteSettings = loadFromStorage('flora_site', DEFAULT_SITE_SETTINGS);
  categories: Category[] = loadFromStorage('flora_categories', DEFAULT_CATEGORIES);

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // Cart
  addToCart(product: Product) {
    const existing = this.cart.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart = [...this.cart, { product, quantity: 1 }];
    }
    this.cart = [...this.cart];
    saveToStorage('flora_cart', this.cart);
    this.notify();
  }

  removeFromCart(productId: string) {
    this.cart = this.cart.filter((i) => i.product.id !== productId);
    saveToStorage('flora_cart', this.cart);
    this.notify();
  }

  updateCartQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cart = this.cart.map((i) =>
      i.product.id === productId ? { ...i, quantity } : i
    );
    saveToStorage('flora_cart', this.cart);
    this.notify();
  }

  clearCart() {
    this.cart = [];
    saveToStorage('flora_cart', this.cart);
    this.notify();
  }

  getCartTotal() {
    return this.cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  getCartCount() {
    return this.cart.reduce((sum, i) => sum + i.quantity, 0);
  }

  // Products
  addProduct(product: Product) {
    this.products = [...this.products, product];
    saveToStorage('flora_products', this.products);
    this.notify();
  }

  updateProduct(product: Product) {
    this.products = this.products.map((p) =>
      p.id === product.id ? product : p
    );
    saveToStorage('flora_products', this.products);
    this.notify();
  }

  deleteProduct(id: string) {
    this.products = this.products.filter((p) => p.id !== id);
    saveToStorage('flora_products', this.products);
    this.notify();
  }

  // Hero
  updateHero(settings: Partial<HeroSettings>) {
    this.heroSettings = { ...this.heroSettings, ...settings };
    saveToStorage('flora_hero', this.heroSettings);
    this.notify();
  }

  // Site Settings
  updateSiteSettings(settings: Partial<SiteSettings>) {
    this.siteSettings = { ...this.siteSettings, ...settings };
    saveToStorage('flora_site', this.siteSettings);
    this.notify();
  }

  // Categories
  addCategory(category: Category) {
    this.categories = [...this.categories, category];
    saveToStorage('flora_categories', this.categories);
    this.notify();
  }

  deleteCategory(id: string) {
    this.categories = this.categories.filter((c) => c.id !== id);
    saveToStorage('flora_categories', this.categories);
    this.notify();
  }

  // Reset
  resetToDefaults() {
    this.products = DEFAULT_PRODUCTS;
    this.heroSettings = DEFAULT_HERO;
    this.siteSettings = DEFAULT_SITE_SETTINGS;
    this.categories = DEFAULT_CATEGORIES;
    this.cart = [];
    saveToStorage('flora_products', this.products);
    saveToStorage('flora_hero', this.heroSettings);
    saveToStorage('flora_site', this.siteSettings);
    saveToStorage('flora_categories', this.categories);
    saveToStorage('flora_cart', this.cart);
    this.notify();
  }
}

export const store = new Store();

// useStore hook is in useStore.ts
