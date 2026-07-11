import { ArrowRight, Sparkles } from "lucide-react";

export default function TallerBanner() {
  return (
    <section className="bg-mist border-y border-ink/10">
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
        <div className="flex items-center gap-3">
          <Sparkles className="text-gold-dark shrink-0" size={26} />
          <p className="text-navy font-medium">
            <span className="font-serif font-semibold">Taller interactivo:</span> construye tu radiografía
            financiera y descubre tu personalidad financiera.
          </p>
        </div>
        <a
          href="/taller/index.html"
          className="flex items-center gap-2 rounded-md bg-forest px-6 py-3 text-sm font-bold text-white shrink-0 hover:bg-forest/90 transition-colors"
        >
          HACER EL TALLER
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
