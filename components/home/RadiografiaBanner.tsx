import Link from "next/link";
import { ArrowRight, ScanLine } from "lucide-react";

export default function RadiografiaBanner() {
  return (
    <section className="bg-navy border-y border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
        <div className="flex items-center gap-3">
          <ScanLine className="text-gold-light shrink-0" size={26} />
          <p className="text-white font-medium">
            <span className="font-serif font-semibold">Radiografía Financiera:</span> descubre en minutos cómo
            están tus finanzas hoy y hacia dónde van.
          </p>
        </div>
        <Link
          href="/radiografia-financiera"
          className="flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-bold text-white shrink-0 hover:bg-gold-dark transition-colors"
        >
          HAZ TU DIAGNÓSTICO
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
