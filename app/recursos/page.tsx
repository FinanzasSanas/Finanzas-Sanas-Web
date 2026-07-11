import type { Metadata } from "next";
import { Download, Sparkles, Video } from "lucide-react";

export const metadata: Metadata = { title: "Recursos | Finanzas Sanas" };

const recursos = [
  {
    icon: Sparkles,
    title: "Taller: Radiografía Financiera",
    text: "El ejercicio interactivo del Módulo 3 para descubrir tu personalidad financiera.",
    href: "/taller/index.html",
    cta: "Hacer el taller",
  },
  {
    icon: Download,
    title: "[Guía descargable de ejemplo]",
    text: "Reemplaza este espacio con tus PDFs, plantillas de presupuesto o guías descargables.",
    href: "#",
    cta: "Próximamente",
  },
  {
    icon: Video,
    title: "[Video o clase de ejemplo]",
    text: "Aquí puedes enlazar clases grabadas, devocionales en video o webinars.",
    href: "#",
    cta: "Próximamente",
  },
];

export default function RecursosPage() {
  return (
    <>
      <section className="bg-navy">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <span className="text-xs font-bold tracking-widest text-gold-light">RECURSOS</span>
          <h1 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-white">
            Herramientas para tu camino financiero
          </h1>
          <p className="mt-4 text-white/75 max-w-2xl mx-auto leading-relaxed">
            [Contenido de ejemplo] Guías, talleres y material descargable para acompañarte entre módulos.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {recursos.map(({ icon: Icon, title, text, href, cta }) => (
            <div key={title} className="flex flex-col gap-4 rounded-lg border border-ink/10 p-6">
              <Icon className="text-forest" size={28} strokeWidth={1.5} />
              <h3 className="font-serif font-semibold text-navy">{title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed flex-1">{text}</p>
              <a href={href} className="text-sm font-semibold text-gold-dark hover:text-gold transition-colors">
                {cta} →
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
