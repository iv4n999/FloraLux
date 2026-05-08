import { Truck, Clock, MapPin, CreditCard, Phone, Shield } from 'lucide-react';
import { useStore } from '../../useStore';

export default function DeliveryPage() {
  const { siteSettings } = useStore();

  const deliveryOptions = [
    { icon: Truck, title: 'Стандартная доставка', time: '2-4 часа', price: 'от 300₽', description: 'Доставка курьером по городу', color: '#2563eb', bg: '#eff6ff' },
    { icon: Clock, title: 'Экспресс-доставка', time: '60 минут', price: 'от 600₽', description: 'Срочная доставка', color: '#e11d48', bg: '#fef2f2' },
    { icon: MapPin, title: 'Самовывоз', time: 'В любое время', price: 'Бесплатно', description: siteSettings.address, color: '#059669', bg: '#ecfdf5' },
  ];

  const paymentMethods = [
    { icon: CreditCard, title: 'Банковская карта', desc: 'Visa, Mastercard, МИР' },
    { icon: Phone, title: 'СБП', desc: 'Система быстрых платежей' },
    { icon: Shield, title: 'Наличные', desc: 'Оплата при получении' },
  ];

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="text-rose-500 font-medium text-sm tracking-wider uppercase">Доставка</span>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mt-2 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Доставка и оплата</h1>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">{siteSettings.deliveryInfo}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {deliveryOptions.map((opt, i) => (
            <div key={opt.title} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: opt.bg }}>
                <opt.icon size={24} style={{ color: opt.color }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{opt.title}</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600">{opt.time}</span>
                <span className="text-rose-600 font-bold">{opt.price}</span>
              </div>
              <p className="text-gray-500 text-sm">{opt.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl p-8 lg:p-12 animate-fadeInUp" style={{ background: 'linear-gradient(135deg, #f5f3ff, #fef2f2)' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>Способы оплаты</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {paymentMethods.map((m) => (
              <div key={m.title} className="bg-white rounded-2xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <m.icon size={22} className="text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{m.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
