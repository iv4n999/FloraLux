import { ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import { store } from '../store';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  index: number;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, index, onQuickView }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    store.addToCart(product);
    toast.success(`${product.name} добавлен в корзину`, { icon: '🌸' });
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 animate-fadeInUp"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={() => onQuickView(product)}
            className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-5 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 shadow-lg transition-all duration-300 hover:bg-rose-50 translate-y-2 group-hover:translate-y-0"
          >
            <Eye size={16} />
            Подробнее
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badge && (
            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
              product.badge === 'Хит' ? 'bg-orange-500' :
              product.badge === 'Новинка' ? 'bg-emerald-500' :
              product.badge === 'Премиум' ? 'bg-purple-600' :
              product.badge === 'Скидка' ? 'bg-red-500' :
              product.badge === 'Свадьба' ? 'bg-pink-500' :
              'bg-rose-500'
            }`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-red-500 shadow-lg">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-1 text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">{product.price.toLocaleString('ru-RU')} ₽</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">{product.oldPrice.toLocaleString('ru-RU')} ₽</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-11 h-11 rounded-full text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #e11d48, #ec4899)' }}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
