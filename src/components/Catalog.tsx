import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useStore } from '../useStore';
import { Product } from '../types';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

export default function Catalog() {
  const { products, categories } = useStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc' | 'rating'>('default');
  const [viewProduct, setViewProduct] = useState<Product | null>(null);

  const filtered = products.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc': return a.price - b.price;
      case 'price_desc': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });

  return (
    <section id="catalog" className="py-16 lg:py-24" style={{ background: 'linear-gradient(180deg, #fafafa, #fff)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-rose-500 font-medium text-sm tracking-wider uppercase">Каталог</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Наши букеты
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Каждый букет создан с любовью нашими опытными флористами из самых свежих цветов
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-600 border border-gray-200'
              }`}
              style={activeCategory === cat.id ? { background: 'linear-gradient(135deg, #e11d48, #ec4899)' } : {}}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-gray-500">
            Найдено: <span className="font-semibold text-gray-700">{sorted.length}</span> букетов
          </p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
            >
              <option value="default">По умолчанию</option>
              <option value="price_asc">Сначала дешёвые</option>
              <option value="price_desc">Сначала дорогие</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sorted.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onQuickView={setViewProduct}
            />
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl">🌿</span>
            <p className="text-gray-500 mt-4 text-lg">В этой категории пока нет букетов</p>
          </div>
        )}
      </div>

      {viewProduct && (
        <ProductModal product={viewProduct} onClose={() => setViewProduct(null)} />
      )}
    </section>
  );
}
