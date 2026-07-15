import Hero from "@/components/home/Hero";
import Fundamentos from "@/components/home/Fundamentos";
import TallerBanner from "@/components/home/TallerBanner";
import RadiografiaBanner from "@/components/home/RadiografiaBanner";
import Modulos from "@/components/home/Modulos";
import Stats from "@/components/home/Stats";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Fundamentos />
      <TallerBanner />
      <RadiografiaBanner />
      <Modulos />
      <Stats />
    </>
  );
}
