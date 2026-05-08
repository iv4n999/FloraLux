import { useState, useRef } from 'react';
import {
  X, Settings, Package, Globe, Plus, Trash2,
  Save, RotateCcw, Upload, Eye, Layout,
  Tag, BarChart3
} from 'lucide-react';
import { store } from '../store';
import { useStore } from '../useStore';
import { Product } from '../types';
import toast from 'react-hot-toast';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'hero' | 'products' | 'site' | 'categories' | 'stats';

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  useStore();
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  if (!isOpen) return null;

  const tabs = [
    { id: 'hero' as Tab, label: 'Главный экран', icon: Layout },
    { id: 'products' as Tab, label: 'Товары', icon: Package },
    { id: 'site' as Tab, label: 'Настройки', icon: Globe },
    { id: 'categories' as Tab, label: 'Категории', icon: Tag },
    { id: 'stats' as Tab, label: 'Статистика', icon: BarChart3 },
  ];

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-black/50 animate-fadeIn" style={{ backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div className="fixed left-0 top-0 h-full w-full max-w-2xl z-[81] bg-white shadow-2xl flex flex-col animate-slideInLeft">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 text-white" style={{ background: 'linear-gradient(90deg, #7c3aed, #4f46e5)' }}>
          <div className="flex items-center gap-3">
            <Settings size={22} />
            <div>
              <h2 className="text-xl font-bold">Админ-панель</h2>
              <p className="text-purple-200 text-xs">Управление сайтом</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600 bg-purple-50/50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-5">
          {activeTab === 'hero' && <HeroEditor />}
          {activeTab === 'products' && (
            <ProductsEditor
              editingProduct={editingProduct}
              setEditingProduct={setEditingProduct}
              showForm={showProductForm}
              setShowForm={setShowProductForm}
            />
          )}
          {activeTab === 'site' && <SiteSettingsEditor />}
          {activeTab === 'categories' && <CategoriesEditor />}
          {activeTab === 'stats' && <StatsView />}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={() => { store.resetToDefaults(); toast.success('Настройки сброшены!'); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={14} />
            Сбросить всё
          </button>
        </div>
      </div>
    </>
  );
}

function HeroEditor() {
  const { heroSettings } = useStore();
  const [form, setForm] = useState({ ...heroSettings });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    store.updateHero(form);
    toast.success('Главный экран обновлён!', { icon: '🎨' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm({ ...form, backgroundImage: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <Layout size={20} className="text-purple-600" />
        Кастомизация главного экрана
      </h3>

      {/* Preview */}
      <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-100">
        <img src={form.backgroundImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${form.gradientFrom}cc, ${form.gradientTo}cc)`, opacity: form.overlayOpacity + 0.2 }} />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-white text-xl lg:text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>{form.title}</p>
            <p className="text-white/70 text-sm mt-2 max-w-sm">{form.subtitle}</p>
          </div>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 text-xs font-medium text-gray-600 flex items-center gap-1" style={{ backdropFilter: 'blur(4px)' }}>
          <Eye size={12} /> Предпросмотр
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Фоновое изображение</label>
        <div className="flex gap-3">
          <input type="text" value={form.backgroundImage} onChange={(e) => setForm({ ...form, backgroundImage: e.target.value })} placeholder="URL изображения" className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400" />
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} className="px-4 py-3 rounded-xl bg-purple-50 text-purple-600 text-sm font-medium hover:bg-purple-100 transition-colors flex items-center gap-2">
            <Upload size={16} /> Загрузить
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Заголовок</label>
        <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Подзаголовок</label>
        <textarea value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 resize-none" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Текст кнопки</label>
        <input type="text" value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Градиент (начало)</label>
          <div className="flex items-center gap-3">
            <input type="color" value={form.gradientFrom} onChange={(e) => setForm({ ...form, gradientFrom: e.target.value })} className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer" />
            <input type="text" value={form.gradientFrom} onChange={(e) => setForm({ ...form, gradientFrom: e.target.value })} className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Градиент (конец)</label>
          <div className="flex items-center gap-3">
            <input type="color" value={form.gradientTo} onChange={(e) => setForm({ ...form, gradientTo: e.target.value })} className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer" />
            <input type="text" value={form.gradientTo} onChange={(e) => setForm({ ...form, gradientTo: e.target.value })} className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Затемнение: {Math.round(form.overlayOpacity * 100)}%</label>
        <input type="range" min="0" max="1" step="0.05" value={form.overlayOpacity} onChange={(e) => setForm({ ...form, overlayOpacity: parseFloat(e.target.value) })} className="w-full" />
      </div>

      <button onClick={handleSave} className="w-full text-white py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:opacity-90" style={{ background: 'linear-gradient(90deg, #7c3aed, #4f46e5)' }}>
        <Save size={18} /> Сохранить изменения
      </button>
    </div>
  );
}

function ProductsEditor({ editingProduct, setEditingProduct, showForm, setShowForm }: {
  editingProduct: Product | null;
  setEditingProduct: (p: Product | null) => void;
  showForm: boolean;
  setShowForm: (v: boolean) => void;
}) {
  const { products } = useStore();

  const startAdd = () => {
    setEditingProduct({ id: Date.now().toString(), name: '', price: 0, image: '', category: 'bouquets', description: '', inStock: true, rating: 5, reviews: 0 });
    setShowForm(true);
  };

  const startEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setShowForm(true);
  };

  if (showForm && editingProduct) {
    return (
      <ProductForm
        product={editingProduct}
        onSave={(p) => {
          if (products.find((pr) => pr.id === p.id)) {
            store.updateProduct(p);
            toast.success('Товар обновлён!', { icon: '✏️' });
          } else {
            store.addProduct(p);
            toast.success('Товар добавлен!', { icon: '✅' });
          }
          setShowForm(false);
          setEditingProduct(null);
        }}
        onCancel={() => { setShowForm(false); setEditingProduct(null); }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Package size={20} className="text-purple-600" /> Товары ({products.length})
        </h3>
        <button onClick={startAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors">
          <Plus size={16} /> Добавить
        </button>
      </div>

      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-4 bg-gray-50 rounded-2xl p-3 hover:bg-gray-100 transition-colors">
            <img src={product.image} alt="" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm truncate">{product.name}</h4>
              <p className="text-sm text-gray-500">{product.price.toLocaleString('ru-RU')} ₽</p>
              <span className="text-xs text-gray-400">{product.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => startEdit(product)} className="p-2 rounded-lg hover:bg-purple-100 text-purple-600 transition-colors text-sm">✏️</button>
              <button onClick={() => { store.deleteProduct(product.id); toast.success('Товар удалён'); }} className="p-2 rounded-lg hover:bg-red-100 text-red-500 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductForm({ product, onSave, onCancel }: { product: Product; onSave: (p: Product) => void; onCancel: () => void; }) {
  const [form, setForm] = useState({ ...product });
  const { categories } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm({ ...form, image: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">{product.name ? 'Редактировать' : 'Новый'} товар</h3>
        <button onClick={onCancel} className="text-sm text-gray-500 hover:text-gray-700">← Назад</button>
      </div>

      {form.image && (
        <div className="rounded-2xl overflow-hidden aspect-video bg-gray-100">
          <img src={form.image} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Изображение</label>
        <div className="flex gap-3">
          <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="URL" className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} className="px-4 py-3 rounded-xl bg-purple-50 text-purple-600 text-sm font-medium hover:bg-purple-100 transition-colors flex items-center gap-2"><Upload size={16} /></button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Название</label>
        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Цена (₽)</label>
          <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Старая цена</label>
          <input type="number" value={form.oldPrice || ''} onChange={(e) => setForm({ ...form, oldPrice: parseInt(e.target.value) || undefined })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200">
            {categories.filter((c) => c.id !== 'all').map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Бейдж</label>
          <input type="text" value={form.badge || ''} onChange={(e) => setForm({ ...form, badge: e.target.value || undefined })} placeholder="Хит, Новинка..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Описание</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 resize-none" />
      </div>

      <div className="flex gap-3">
        <button onClick={() => onSave(form)} className="flex-1 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(90deg, #7c3aed, #4f46e5)' }}>
          <Save size={18} /> Сохранить
        </button>
        <button onClick={onCancel} className="px-6 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">Отмена</button>
      </div>
    </div>
  );
}

function SiteSettingsEditor() {
  const { siteSettings } = useStore();
  const [form, setForm] = useState({ ...siteSettings });

  const handleSave = () => {
    store.updateSiteSettings(form);
    toast.success('Настройки сохранены!', { icon: '⚙️' });
  };

  const fields: { key: keyof typeof form; label: string }[] = [
    { key: 'siteName', label: 'Название сайта' },
    { key: 'phone', label: 'Телефон' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Адрес' },
    { key: 'instagram', label: 'Instagram' },
    { key: 'telegram', label: 'Telegram' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'workingHours', label: 'Часы работы' },
    { key: 'deliveryInfo', label: 'Информация о доставке' },
  ];

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Globe size={20} className="text-purple-600" /> Настройки сайта</h3>

      {fields.map(({ key, label }) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
          <input type="text" value={form[key] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
        </div>
      ))}

      <div className="border-t border-gray-100 pt-5">
        <label className="flex items-center gap-3 cursor-pointer mb-4">
          <input type="checkbox" checked={form.announcementEnabled} onChange={(e) => setForm({ ...form, announcementEnabled: e.target.checked })} className="w-5 h-5 rounded accent-purple-600" />
          <span className="text-sm font-medium text-gray-700">Показывать бегущую строку</span>
        </label>
        <input type="text" value={form.announcementBar} onChange={(e) => setForm({ ...form, announcementBar: e.target.value })} placeholder="Текст объявления" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
      </div>

      <button onClick={handleSave} className="w-full text-white py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:opacity-90" style={{ background: 'linear-gradient(90deg, #7c3aed, #4f46e5)' }}>
        <Save size={18} /> Сохранить настройки
      </button>
    </div>
  );
}

function CategoriesEditor() {
  const { categories } = useStore();
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('🌻');

  const handleAdd = () => {
    if (!newName.trim()) return;
    store.addCategory({ id: newName.toLowerCase().replace(/\s/g, '_'), name: newName, icon: newIcon, image: '' });
    setNewName('');
    toast.success('Категория добавлена!');
  };

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Tag size={20} className="text-purple-600" /> Категории</h3>

      <div className="space-y-2">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">{cat.icon}</span>
              <span className="font-medium text-gray-900 text-sm">{cat.name}</span>
              <span className="text-xs text-gray-400">({cat.id})</span>
            </div>
            {cat.id !== 'all' && (
              <button onClick={() => { store.deleteCategory(cat.id); toast.success('Категория удалена'); }} className="p-1.5 rounded-lg hover:bg-red-100 text-red-400 hover:text-red-500 transition-colors">
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-5">
        <p className="text-sm font-medium text-gray-700 mb-3">Добавить категорию</p>
        <div className="flex gap-3">
          <input type="text" value={newIcon} onChange={(e) => setNewIcon(e.target.value)} className="w-16 border border-gray-200 rounded-xl px-3 py-3 text-center text-xl focus:outline-none focus:ring-2 focus:ring-purple-200" />
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Название" className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
          <button onClick={handleAdd} className="px-4 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"><Plus size={18} /></button>
        </div>
      </div>
    </div>
  );
}

function StatsView() {
  const { products, cartCount, cartTotal } = useStore();

  const stats = [
    { label: 'Товаров', value: products.length, icon: '📦', bg: '#eff6ff', color: '#2563eb' },
    { label: 'В наличии', value: products.filter((p) => p.inStock).length, icon: '✅', bg: '#ecfdf5', color: '#059669' },
    { label: 'В корзине', value: cartCount, icon: '🛒', bg: '#fffbeb', color: '#d97706' },
    { label: 'Сумма корзины', value: `${cartTotal.toLocaleString('ru-RU')} ₽`, icon: '💰', bg: '#f5f3ff', color: '#7c3aed' },
    { label: 'Средняя цена', value: `${products.length ? Math.round(products.reduce((s, p) => s + p.price, 0) / products.length).toLocaleString('ru-RU') : 0} ₽`, icon: '📊', bg: '#fef2f2', color: '#dc2626' },
    { label: 'Средний рейтинг', value: products.length ? (products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1) : '0', icon: '⭐', bg: '#fefce8', color: '#ca8a04' },
  ];

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><BarChart3 size={20} className="text-purple-600" /> Статистика</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl p-5" style={{ background: stat.bg, color: stat.color }}>
            <span className="text-2xl">{stat.icon}</span>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
            <p className="text-sm opacity-70">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
