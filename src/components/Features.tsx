import { Truck, Clock, Award, Headphones, Leaf, Gift } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Быстрая доставка', description: 'Доставим букет в течение 2 часов по всему городу', color: '#e11d48', bg: '#fef2f2' },
  { icon: Leaf, title: 'Свежие цветы', description: 'Только свежие цветы напрямую от лучших поставщиков', color: '#10b981', bg: '#ecfdf5' },
  { icon: Award, title: 'Авторский дизайн', description: 'Каждый букет создаётся профессиональными флористами', color: '#8b5cf6', bg: '#f5f3ff' },
  { icon: Gift, title: 'Подарочная упаковка', description: 'Элегантная упаковка и открытка в подарок к каждому заказу', color: '#f59e0b', bg: '#fffbeb' },
  { icon: Headphones, title: 'Поддержка 24/7', description: 'Мы всегда на связи и готовы помочь с выбором', color: '#3b82f6', bg: '#eff6ff' },
  { icon: Clock, title: 'Точно вовремя', description: 'Гарантируем доставку к указанному вами времени', color: '#14b8a6', bg: '#f0fdfa' },
];

export default function Features() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-rose-500 font-medium text-sm tracking-wider uppercase">Почему мы</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Наши преимущества
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Мы делаем всё, чтобы каждый букет стал незабываемым подарком
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group p-6 lg:p-8 rounded-3xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-500 bg-white animate-fadeInUp"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ background: feature.bg }}
              >
                <feature.icon size={24} style={{ color: feature.color }} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
