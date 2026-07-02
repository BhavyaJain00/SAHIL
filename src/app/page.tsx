import { LoadProvider } from "@/components/ui/LoadProvider";
import { Cursor } from "@/components/ui/Cursor";
import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { WorkSection } from "@/components/work/WorkSection";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <LoadProvider>
      <div className="film-grain">
        <Cursor />
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <WorkSection />
          <About />
          <Services />
          <Footer />
        </main>
      </div>
    </LoadProvider>
  );
}
