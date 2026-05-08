import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { store } from '../store';
import { useStore } from '../useStore';
import toast from 'react-hot-toast';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, cartTotal, cartCount } = useStore();

  if (!isOpen) return null;

  const handleOrder = () => {
    if (cart.length === 0) return;
    toast.success('Заказ оформлен! Мы свяжемся с вами в ближайшее время 🌸', { duration: 4000 });
    store.clearCart();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-black/50 animate-fadeIn" style={{ backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md z-[71] bg-white shadow-2xl flex flex-col animate-slideInRight">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-rose-500" />
            <h2 className="text-xl font-bold text-gray-900">Корзина</h2>
            {cartCount > 0 && (
              <span className="bg-rose-100 text-rose-600 px-2.5 py-0.5 rounded-full text-sm font-medium">
                {cartCount}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-6xl">🛒</span>
              <p className="text-gray-500 mt-4 text-lg">Корзина пуста</p>
              <p className="text-gray-400 mt-1 text-sm">Добавьте букеты из каталога</p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 bg-rose-500 text-white rounded-full font-medium hover:bg-rose-600 transition-colors"
              >
                Перейти в каталог
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="flex gap-4 bg-gray-50 rounded-2xl p-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm truncate">{item.product.name}</h4>
                  <p className="text-rose-600 font-bold mt-1">
                    {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => store.updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-rose-300 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => store.updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-rose-300 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => {
                        store.removeFromCart(item.product.id);
                        toast('Удалено из корзины', { icon: '🗑️' });
                      }}
                      className="ml-auto p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Итого:</span>
              <span className="text-2xl font-bold text-gray-900">{cartTotal.toLocaleString('ru-RU')} ₽</span>
            </div>
            {cartTotal >= 5000 && (
              <div className="bg-green-50 text-green-700 text-sm rounded-xl px-4 py-2.5 flex items-center gap-2">
                <span>🚛</span> Бесплатная доставка!
              </div>
            )}
            <button
              onClick={handleOrder}
              className="w-full text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              style={{ background: 'linear-gradient(135deg, #e11d48, #ec4899)' }}
            >
              Оформить заказ
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
