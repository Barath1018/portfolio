import { Header } from '@/components/Header';
import { HeroSection } from '@/sections/Hero';
import { ProjectsSection } from '@/sections/Projects';
import { TapeSection } from '@/sections/Tape';
import { ServicesSection } from '@/sections/Services';
import { AboutSection } from '@/sections/About';
import { ContactSection } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import Particles from "@/components/Particles";
import { getProjects, type ProjectData } from '@/lib/getProjects';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  let projects: ProjectData[] = [];
  try {
    projects = await getProjects();
  } catch (e) {
    console.error('[Home] Failed to fetch projects:', e);
  }

  return (
    <div>
      <Particles />
      <Header />
      <div id="home">
        <HeroSection/>
      </div>
      <div id="projects">
        <ProjectsSection projects={projects} />
      </div>
      {/* <TapeSection/> */}
      <ServicesSection/>
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
