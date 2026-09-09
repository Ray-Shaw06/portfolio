import Hero from "@/components/home/Hero.tsx";
import Carousel from "@/components/home/Carousel.tsx";
import PaidWork from "@/components/home/PaidWork.tsx";
import SpotterHero from "@/components/home/SpotterHero.tsx";
import HardPart from "@/components/home/HardPart.tsx";
import SelectedWork from "@/components/home/SelectedWork.tsx";
import HowIWork from "@/components/home/HowIWork.tsx";
import Writing from "@/components/home/Writing.tsx";
import ThePath from "@/components/home/ThePath.tsx";
import About from "@/components/home/About.tsx";
import Contact from "@/components/home/Contact.tsx";
import { Rule } from "@/components/ui/primitives.tsx";

export default function Home() {
  return (
    <>
      <Hero />
      <Carousel />
      <Divider />
      <PaidWork />
      <Divider />
      <SpotterHero />
      <HardPart />
      <Divider />
      <SelectedWork />
      <Divider />
      <HowIWork />
      <Divider />
      <Writing />
      <Divider />
      <ThePath />
      <Divider />
      <About />
      <Contact />
    </>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <Rule />
    </div>
  );
}
