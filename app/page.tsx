import Hero from "@/components/home/Hero.tsx";
import SpotterHero from "@/components/home/SpotterHero.tsx";
import SelectedWork from "@/components/home/SelectedWork.tsx";
import Contact from "@/components/home/Contact.tsx";
import { Rule } from "@/components/ui/primitives.tsx";

export default function Home() {
  return (
    <>
      <Hero />
      <Divider />
      <SpotterHero />
      <Divider />
      <SelectedWork />
      <Divider />
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
