import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Process from './components/Process';
import Industries from './components/Industries';
import Results from './components/Results';
import Calculators from './components/Calculators';
import GrowthSections from './components/GrowthSections';
import ConversionSection from './components/ConversionSection';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <Services />
        <WhyChooseUs />
        <Process />
        <Industries />
        <Results />
        <Calculators />
        <GrowthSections />
        <ConversionSection />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
