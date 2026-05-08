import { X, ShoppingBag, Star, Truck, Shield, Heart } from 'lucide-react';
import { Product } from '../types';
import { store } from '../store';
import toast from 'react-hot-toast';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const handleAdd = () => {
    store.addToCart(product);
    toast.success(`${product.name} добавлен в корзину!`, { icon: '🌸' });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4 animate-fadeIn"
      style={{ backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-square md:aspect-auto">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover md:rounded-l-3xl" />
            {product.badge && (
              <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-bold text-white bg-rose-500 shadow-lg">
                {product.badge}
              </span>
            )}
          </div>

          <div className="p-6 lg:p-8 flex flex-col">
            <button onClick={onClose} className="self-end p-2 rounded-full hover:bg-gray-100 transition-colors">
              <X size={20} />
            </button>

            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
              ))}
              <span className="text-sm text-gray-500 ml-2">{product.rating} ({product.reviews} отзывов)</span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              {product.name}
            </h2>

            <p className="text-gray-500 mb-6 leading-relaxed">{product.description}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">{product.price.toLocaleString('ru-RU')} ₽</span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through">{product.oldPrice.toLocaleString('ru-RU')} ₽</span>
              )}
            </div>

            <div className="space-y-3 mb-8">
              {[
                { icon: Truck, text: 'Бесплатная доставка от 5000₽' },
                { icon: Shield, text: 'Гарантия свежести 5 дней' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-gray-500">
                  <Icon size={16} className="text-rose-400" />
                  {text}
                </div>
              ))}
            </div>

            <div className="mt-auto flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #e11d48, #ec4899)' }}
              >
                <ShoppingBag size={20} />
                В корзину
              </button>
              <button className="w-14 h-14 rounded-2xl border-2 border-gray-200 flex items-center justify-center hover:border-rose-300 hover:text-rose-500 transition-colors text-gray-400">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
