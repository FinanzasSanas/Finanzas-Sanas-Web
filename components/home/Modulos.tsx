import Link from "next/link";
import { ArrowRight, ClipboardList, DollarSign, Heart, BookOpen, Send, TreePine, Users } from "lucide-react";

const modulos = [
  {
    icon: Heart,
    title: "FUNDAMENTOS DEL CORAZÓN",
    text: "Renueva tu mente y tus creencias sobre el dinero.",
  },
  {
    icon: BookOpen,
    title: "PRINCIPIOS BÍBLICOS",
    text: "Verdades eternas que transforman tu forma de pensar.",
  },
  {
    icon: ClipboardList,
    title: "HÁBITOS Y HERRAMIENTAS",
    text: "Ordena tus finanzas y crea hábitos que te den libertad.",
  },
  {
    icon: DollarSign,
    title: "AUMENTA TUS INGRESOS",
    text: "Desarrolla habilidades, crea valor y genera más ingresos.",
  },
  {
    icon: Send,
    title: "INVIERTE CON SABIDURÍA",
    text: "Multiplica tus recursos y construye patrimonio con propósito.",
  },
  {
    icon: Users,
    title: "SUFICIENTE Y GENEROSO",
    text: "Descubre cuánto es suficiente y aprende a ser generoso.",
  },
  {
    icon: TreePine,
    title: "LEGADO QUE TRASCIENDE",
    text: "Deja una herencia financiera y espiritual a las próximas generaciones.",
  },
];

export default function Modulos() {
  return (
    <section id="modulos" className="bg-mist/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start">
          <div>
            <span className="text-xs font-bold tracking-widest text-forest">UN ENTRENAMIENTO COMPLETO</span>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-navy leading-snug">
              7 módulos para transformar tu vida financiera desde adentro.
            </h2>
            <p className="mt-4 text-sm text-ink-soft leading-relaxed">
              Un proceso paso a paso que renovará tu mente, formará hábitos correctos y te guiará a vivir en
              libertad y abundancia bíblica.
            </p>
            <Link
              href="/entrenamiento"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-forest px-5 py-3 text-sm font-bold text-white hover:bg-forest/90 transition-colors"
            >
              VER TODOS LOS MÓDULOS
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {modulos.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="flex flex-col items-start gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-xs font-bold text-white">
                  {i + 1}
                </span>
                <Icon className="text-forest" size={26} strokeWidth={1.5} />
                <h3 className="font-serif text-xs font-bold tracking-wide text-navy">{title}</h3>
                <p className="text-xs text-ink-soft leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
