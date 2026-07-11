import Hero from "@/components/home/Hero";
import Fundamentos from "@/components/home/Fundamentos";
import TallerBanner from "@/components/home/TallerBanner";
import Modulos from "@/components/home/Modulos";
import Stats from "@/components/home/Stats";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Fundamentos />
      <TallerBanner />
      <Modulos />
      <Stats />
    </>
  );
}
