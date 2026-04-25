import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import WhyChooseUs from "./components/WhyChooseUs";
import Contact from "./components/Contact";
import Clients from "./components/Clients";
import FounderSection from "./components/FounderSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Clients />
      <WhyChooseUs />
      <About />
      <FounderSection />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
