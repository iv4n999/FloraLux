import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Анна Петрова', avatar: '👩‍🦰', text: 'Заказывала букет на годовщину — жена была в восторге! Цветы свежайшие, доставка точно вовремя.', rating: 5, date: '2 дня назад' },
  { name: 'Дмитрий Козлов', avatar: '👨‍💼', text: 'Потрясающий сервис! Букет выглядел даже лучше, чем на фото. Флористы — настоящие мастера.', rating: 5, date: '1 неделю назад' },
  { name: 'Елена Сидорова', avatar: '👩‍🎨', text: 'Заказываю здесь регулярно для офиса. Всегда свежие цветы, красивые композиции и отличные цены!', rating: 5, date: '2 недели назад' },
  { name: 'Максим Иванов', avatar: '👨‍🔧', text: 'Спасибо за чудесный свадебный букет! Он идеально подошёл к платью невесты. Все гости были в восторге.', rating: 5, date: '3 недели назад' },
];

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-24" style={{ background: 'linear-gradient(180deg, #f9fafb, #fff)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-rose-500 font-medium text-sm tracking-wider uppercase">Отзывы</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Что говорят клиенты
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Более 5000 довольных клиентов доверяют нам свои самые важные моменты
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-white p-6 lg:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 animate-fadeInUp"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-4xl text-rose-200 leading-none">"</span>
              <p className="text-gray-600 leading-relaxed mb-6 -mt-2">{t.text}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{t.avatar}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
