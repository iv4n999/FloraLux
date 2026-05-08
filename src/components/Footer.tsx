import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useStore } from '../useStore';

export default function Footer() {
  const { siteSettings } = useStore();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌸</span>
              <h3 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>{siteSettings.siteName}</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Мы создаём неповторимые букеты из свежайших цветов для самых важных моментов вашей жизни.
            </p>
            <div className="flex gap-3">
              {[{ label: 'IG', color: '#E1306C' }, { label: 'TG', color: '#0088cc' }, { label: 'WA', color: '#25D366' }].map((s) => (
                <span key={s.label} className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity" style={{ background: s.color }}>
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-5">Навигация</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {['Каталог', 'О нас', 'Доставка', 'Контакты', 'Акции', 'Отзывы'].map((link) => (
                <li key={link}><span className="hover:text-rose-400 transition-colors cursor-pointer">{link}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-5">Контакты</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3"><Phone size={16} className="text-rose-400 mt-0.5 flex-shrink-0" />{siteSettings.phone}</li>
              <li className="flex items-start gap-3"><Mail size={16} className="text-rose-400 mt-0.5 flex-shrink-0" />{siteSettings.email}</li>
              <li className="flex items-start gap-3"><MapPin size={16} className="text-rose-400 mt-0.5 flex-shrink-0" />{siteSettings.address}</li>
              <li className="flex items-start gap-3"><Clock size={16} className="text-rose-400 mt-0.5 flex-shrink-0" />{siteSettings.workingHours}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-5">Подписка</h4>
            <p className="text-gray-400 text-sm mb-4">Получайте скидки и новости первыми</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button className="w-12 h-12 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0" style={{ background: 'linear-gradient(135deg, #e11d48, #ec4899)' }}>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-gray-500 text-sm">
            <p>© 2024 {siteSettings.siteName}. Все права защищены.</p>
            <p>Сделано с ❤️ в Москве</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
