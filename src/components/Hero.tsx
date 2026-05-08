import { ArrowRight, Truck, Shield, Clock } from 'lucide-react';
import { useStore } from '../useStore';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { heroSettings } = useStore();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroSettings.backgroundImage}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${heroSettings.gradientFrom}ee, ${heroSettings.gradientTo}cc)`,
            opacity: heroSettings.overlayOpacity + 0.3,
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-2xl animate-fadeInUp">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20" style={{ backdropFilter: 'blur(8px)' }}>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Доставка сегодня
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {heroSettings.title}
          </h1>

          <p className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed max-w-lg">
            {heroSettings.subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('catalog')}
              className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-rose-50 transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              {heroSettings.ctaText}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              style={{ backdropFilter: 'blur(4px)' }}
            >
              Узнать больше
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-6 mt-14">
            {[
              { icon: Truck, text: 'Бесплатная доставка' },
              { icon: Clock, text: 'За 2 часа' },
              { icon: Shield, text: 'Гарантия свежести' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/70 text-sm">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center" style={{ backdropFilter: 'blur(4px)' }}>
                  <Icon size={14} />
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🌸', '🌺', '🌷', '🌹', '💮'].map((emoji, i) => (
          <span
            key={i}
            className="absolute text-2xl animate-float"
            style={{
              left: `${15 + i * 18}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${6 + i}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </section>
  );
}
