import { BookOpen, Target, User, Users } from "lucide-react";

const items = [
  {
    icon: BookOpen,
    title: "FUNDAMENTOS BÍBLICOS",
    text: "Principios eternos para decisiones financieras correctas.",
  },
  {
    icon: User,
    title: "HERRAMIENTAS PRÁCTICAS",
    text: "Métodos y recursos para ordenar, multiplicar y administrar.",
  },
  {
    icon: Users,
    title: "MENTORÍA Y COMUNIDAD",
    text: "No caminas solo, te acompañamos en cada paso.",
  },
  {
    icon: Target,
    title: "PROPÓSITO Y LEGADO",
    text: "Vive para algo eterno y deja una herencia que trascienda.",
  },
];

export default function Fundamentos() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex flex-col gap-3">
            <Icon className="text-forest" size={30} strokeWidth={1.5} />
            <h3 className="font-serif text-sm font-bold tracking-wide text-navy">{title}</h3>
            <p className="text-sm text-ink-soft leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
