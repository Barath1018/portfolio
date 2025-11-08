import { Header } from '@/components/Header';
import { HeroSection } from '@/sections/Hero'; 
import { ProjectsSection } from '@/sections/Projects'; 
import { TapeSection } from '@/sections/Tape';
import { TestimonialsSection } from '@/sections/Testimonials';
import { AboutSection } from '@/sections/About';
import { ContactSection } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import Particles from "@/components/Particles"; // Adjust the path
export default function Home() {
  return (
    <div>
      <Particles />
      <Header />
      <div id="home">
        <HeroSection/>
      </div>
      <div id="projects">
        <ProjectsSection/>
      </div>
      <TapeSection/>
      <TestimonialsSection/>
      <div id="about">
        <AboutSection/>
      </div>
      <div id="contact">
        <ContactSection/>
      </div>
      <Footer/>
    </div>
  );
}