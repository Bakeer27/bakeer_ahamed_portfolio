import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/layout/Cursor";
import Hud from "@/components/layout/Hud";
import AuroraBackground from "@/components/layout/AuroraBackground";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Impact from "@/components/sections/Impact";
import CaseStudySection from "@/components/sections/CaseStudySection";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import { caseStudies } from "@/lib/content";

export default function Page() {
  return (
    <>
      <AuroraBackground />
      <SmoothScroll />
      <Cursor />
      <Hud />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Impact />
        {caseStudies.map((study, i) => (
          <CaseStudySection key={study.id} study={study} first={i === 0} />
        ))}
        <Projects />
        <Stack />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
