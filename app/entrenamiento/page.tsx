import type { Metadata } from "next";
import { ClipboardList, DollarSign, Heart, BookOpen, Send, TreePine, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import TallerBanner from "@/components/home/TallerBanner";

export const metadata: Metadata = { title: "Entrenamiento | Finanzas Sanas" };

const modulos = [
  { icon: Heart, title: "1. Fundamentos del corazón", text: "Renueva tu mente y tus creencias sobre el dinero antes de tocar una sola cifra." },
  { icon: BookOpen, title: "2. Principios bíblicos", text: "Verdades eternas que transforman tu forma de pensar sobre la provisión y el trabajo." },
  { icon: ClipboardList, title: "3. Hábitos y herramientas", text: "Ordena tus finanzas y crea hábitos que te den libertad, incluye el taller de radiografía financiera." },
  { icon: DollarSign, title: "4. Aumenta tus ingresos", text: "Desarrolla habilidades, crea valor y genera más ingresos con integridad." },
  { icon: Send, title: "5. Invierte con sabiduría", text: "Multiplica tus recursos y construye patrimonio con propósito, no por ansiedad." },
  { icon: Users, title: "6. Suficiente y generoso", text: "Descubre cuánto es suficiente y aprende a vivir con generosidad real." },
  { icon: TreePine, title: "7. Legado que trasciende", text: "Deja una herencia financiera y espiritual a las próximas generaciones." },
];

export default function EntrenamientoPage() {
  return (
    <>
      <PageHero
        eyebrow="ENTRENAMIENTO"
        title="7 módulos para transformar tu vida financiera desde adentro"
        text="[Contenido de ejemplo — aquí irá el detalle de fechas, precio y modalidad de tu entrenamiento.]"
      />

      <section id="modulos" className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 grid gap-8 sm:grid-cols-2">
          {modulos.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4 rounded-lg border border-ink/10 p-6">
              <Icon className="text-forest shrink-0" size={28} strokeWidth={1.5} />
              <div>
                <h3 className="font-serif font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TallerBanner />
    </>
  );
}
