import { Award, Users, Heart } from 'lucide-react';

const stats = [
  { value: '10+', label: 'Лет опыта', icon: Award },
  { value: '5000+', label: 'Довольных клиентов', icon: Users },
  { value: '50000+', label: 'Букетов создано', icon: '🌸' },
  { value: '99%', label: 'Положительных отзывов', icon: Heart },
];

export default function AboutPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="text-rose-500 font-medium text-sm tracking-wider uppercase">О нас</span>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mt-2 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Наша история</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            FloraLux — это команда увлечённых флористов, которые верят, что каждый букет должен рассказывать свою историю.
            Мы работаем с лучшими поставщиками цветов по всему миру.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div key={stat.label} className="bg-white rounded-3xl p-6 text-center shadow-sm border border-gray-100 animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto mb-4">
                {typeof stat.icon === 'string' ? <span className="text-2xl">{stat.icon}</span> : <stat.icon size={24} className="text-rose-500" />}
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeInUp">
            <img
              src="https://images.pexels.com/photos/6720595/pexels-photo-6720595.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="Наши флористы"
              className="rounded-3xl shadow-xl w-full aspect-[4/3] object-cover"
            />
          </div>

          <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Мастерство и страсть к цветам</h2>
            <p className="text-gray-500 leading-relaxed">
              Наша команда — это профессиональные флористы с многолетним опытом, которые превращают обычные цветы в произведения искусства.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Мы верим, что цветы — это универсальный язык любви и заботы. Поэтому каждый букет мы создаём с особым вниманием к деталям.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Свежие цветы', 'Авторский дизайн', 'Премиум упаковка', 'Быстрая доставка'].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-sm font-medium">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
