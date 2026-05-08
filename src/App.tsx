import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import InstagramSection from './components/InstagramSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';
import AboutPage from './components/pages/AboutPage';
import DeliveryPage from './components/pages/DeliveryPage';
import ContactsPage from './components/pages/ContactsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(t);
  }, [currentPage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={navigateTo} />
            <Catalog />
            <Features />
            <Testimonials />
            <CTASection />
            <InstagramSection />
          </>
        );
      case 'catalog':
        return <Catalog />;
      case 'about':
        return <AboutPage />;
      case 'delivery':
        return <DeliveryPage />;
      case 'contacts':
        return <ContactsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Toaster position="top-right" />

      <AnnouncementBar />
      <Header
        onCartOpen={() => setCartOpen(true)}
        onAdminOpen={() => setAdminOpen(true)}
        currentPage={currentPage}
        onPageChange={navigateTo}
      />

      <main
        className="transition-opacity duration-300"
        style={{ opacity: fadeIn ? 1 : 0 }}
      >
        {renderPage()}
      </main>

      <Footer />

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #e11d48, #ec4899)' }}
        aria-label="Наверх"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
      </button>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/79991234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-green-500 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center text-2xl"
        title="Написать в WhatsApp"
      >
        💬
      </a>
    </div>
  );
}
