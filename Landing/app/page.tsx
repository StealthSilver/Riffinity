import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Footer from "@/components/sections/Footer";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials"
import CTA from "@/components/sections/CTA"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Features/>
      <Testimonials/>
      <CTA/>
      <Footer />
    </main>
  );
}
