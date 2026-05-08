import { Phone, MessageCircle } from 'lucide-react';
import { useStore } from '../useStore';

export default function CTASection() {
  const { siteSettings } = useStore();

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className="relative rounded-[2rem] overflow-hidden p-10 lg:p-16 text-center"
          style={{ background: 'linear-gradient(135deg, #e11d48, #ec4899, #9333ea)' }}
        >
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute top-10 right-20 w-20 h-20 bg-white/5 rounded-full" />

          <div className="relative z-10">
            <span className="text-5xl mb-6 block">💐</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Не можете определиться?
            </h2>
            <p className="text-white/80 text-lg max-w-lg mx-auto mb-8">
              Наши флористы помогут подобрать идеальный букет для любого повода!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${siteSettings.phone}`}
                className="bg-white text-rose-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-rose-50 transition-all duration-300 flex items-center gap-2 shadow-xl"
              >
                <Phone size={20} />
                Позвонить
              </a>
              <a
                href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
