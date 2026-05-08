export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  badge?: string;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface HeroSettings {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  overlayOpacity: number;
  gradientFrom: string;
  gradientTo: string;
}

export interface SiteSettings {
  siteName: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  telegram: string;
  whatsapp: string;
  deliveryInfo: string;
  workingHours: string;
  announcementBar: string;
  announcementEnabled: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}
