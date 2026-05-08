import { useStore } from '../useStore';

export default function InstagramSection() {
  const { products } = useStore();
  const images = products.slice(0, 6).map((p) => p.image);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-rose-500 font-medium text-sm tracking-wider uppercase">📸 Instagram</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Мы в Instagram
          </h2>
          <p className="text-gray-500">Подписывайтесь и вдохновляйтесь нашими работами</p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 lg:gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative animate-fadeInUp"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">📷</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
