import { BookOpen, Globe2, Star, Users } from "lucide-react";

const stats = [
  { icon: Users, value: "+8,000", label: "Personas entrenadas" },
  { icon: Globe2, value: "+20", label: "Países impactados" },
  { icon: BookOpen, value: "100%", label: "Basado en la Biblia" },
  { icon: Star, value: "4.9/5", label: "Calificación de alumnos" },
];

export default function Stats() {
  return (
    <section className="bg-forest">
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <blockquote className="text-white/90">
          <p className="font-serif text-lg italic leading-relaxed">
            &ldquo;La sabiduría es mejor que las riquezas; de nada aprovecha al hombre la prudencia, si no tiene
            entendimiento.&rdquo;
          </p>
          <cite className="mt-2 block text-sm not-italic text-gold-light">— Proverbios 8:11</cite>
        </blockquote>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="text-gold-light shrink-0" size={26} />
              <div>
                <div className="font-serif text-xl font-semibold text-white leading-none">{value}</div>
                <div className="mt-1 text-xs text-white/70">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
