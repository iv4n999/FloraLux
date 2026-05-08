import { useState } from 'react';
import { ShoppingBag, Menu, X, Phone, Settings } from 'lucide-react';
import { useStore } from '../useStore';

interface HeaderProps {
  onCartOpen: () => void;
  onAdminOpen: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ onCartOpen, onAdminOpen, currentPage, onPageChange }: HeaderProps) {
  const { siteSettings, cartCount } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'catalog', label: 'Каталог' },
    { id: 'about', label: 'О нас' },
    { id: 'delivery', label: 'Доставка' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 border-b border-gray-100 shadow-sm" style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button onClick={() => onPageChange('home')} className="flex items-center gap-2 group">
            <span className="text-3xl">🌸</span>
            <div>
              <h1
                className="text-xl lg:text-2xl font-bold"
                style={{ fontFamily: 'Playfair Display, serif', background: 'linear-gradient(90deg, #e11d48, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {siteSettings.siteName}
              </h1>
              <p className="text-[10px] text-gray-400 -mt-1 tracking-wider uppercase">Премиум букеты</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-rose-50 text-rose-600'
                    : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a href={`tel:${siteSettings.phone}`} className="hidden sm:flex items-center gap-2 text-sm text-gray-600 hover:text-rose-600 transition-colors mr-2">
              <Phone size={16} />
              <span className="font-medium">{siteSettings.phone}</span>
            </a>

            <button
              onClick={onAdminOpen}
              className="p-2.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-purple-600"
              title="Админ-панель"
            >
              <Settings size={20} />
            </button>

            <button
              onClick={onCartOpen}
              className="relative p-2.5 rounded-full hover:bg-rose-50 transition-colors text-gray-700 hover:text-rose-600"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <nav className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onPageChange(item.id); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-rose-50 text-rose-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a href={`tel:${siteSettings.phone}`} className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600">
              <Phone size={16} />
              {siteSettings.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
