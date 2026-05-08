import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { useStore } from '../../useStore';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactsPage() {
  const { siteSettings } = useStore();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Сообщение отправлено! Мы свяжемся с вами.', { icon: '📨', duration: 4000 });
    setFormData({ name: '', phone: '', message: '' });
  };

  const contacts = [
    { icon: Phone, label: 'Телефон', value: siteSettings.phone },
    { icon: Mail, label: 'Email', value: siteSettings.email },
    { icon: MapPin, label: 'Адрес', value: siteSettings.address },
    { icon: Clock, label: 'Режим работы', value: siteSettings.workingHours },
  ];

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="text-rose-500 font-medium text-sm tracking-wider uppercase">Контакты</span>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mt-2 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Свяжитесь с нами</h1>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">Мы всегда рады помочь с выбором идеального букета</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6 animate-fadeInUp">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contacts.map((c) => (
                <div key={c.label} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-shadow group">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center mb-3 group-hover:bg-rose-100 transition-colors">
                    <c.icon size={20} className="text-rose-500" />
                  </div>
                  <p className="text-sm text-gray-400 mb-1">{c.label}</p>
                  <p className="font-semibold text-gray-900">{c.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #f5f3ff, #fef2f2)' }}>
              <h3 className="font-bold text-gray-900 mb-4">Мы в мессенджерах</h3>
              <div className="flex gap-3">
                <a href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors">
                  <MessageCircle size={18} /> WhatsApp
                </a>
                <a href={`https://t.me/${siteSettings.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-500 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors">
                  <Send size={18} /> Telegram
                </a>
              </div>
            </div>
          </div>

          <div className="animate-fadeInUp" style={{ animationDelay: '150ms' }}>
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-5">
              <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Напишите нам</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200" placeholder="Как к вам обращаться?" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200" placeholder="+7 (___) ___-__-__" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 resize-none" placeholder="Расскажите, что вы ищете..." />
              </div>

              <button type="submit" className="w-full text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #e11d48, #ec4899)' }}>
                <Send size={18} /> Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
