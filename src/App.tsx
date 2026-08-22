import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Process from './components/Process';
import Industries from './components/Industries';
import Results from './components/Results';
import Testimonials from './components/Testimonials';
import Calculators from './components/Calculators';
import ConversionSection from './components/ConversionSection';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-white shadow-premium-lg transition hover:bg-brand-700 hover:shadow-glow"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/admin/login') {
    return <AdminLogin />;
  }

  if (path === '/admin') {
    return <AdminDashboard />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <Services />
        <WhyChooseUs />
        <Process />
        <Industries />
        <Results />
        <Testimonials />
        <Calculators />
        <ConversionSection />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
