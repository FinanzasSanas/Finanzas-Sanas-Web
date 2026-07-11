import Link from "next/link";
import { ArrowRight, Crown, Mountain, Sprout, TrendingUp } from "lucide-react";

const quadrants = [
  { label: "FRUCTIFICAR", icon: Sprout },
  { label: "MULTIPLICAR", icon: TrendingUp },
  { label: "SOJUZGAR", icon: Mountain },
  { label: "GOBERNAR", icon: Crown },
];

export default function Hero() {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight text-white">
            El <span className="text-sage">diseño original</span> de Dios para administrar los recursos.
          </h1>
          <div className="mt-6 h-1 w-16 bg-gold" />
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            Permite que Su Palabra <span className="text-gold-light font-medium">restaure tu corazón</span>,{" "}
            <span className="text-sage font-medium">transforme tus finanzas</span> y forme un legado que{" "}
            <span className="text-gold-light font-medium">trascienda generaciones</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/entrenamiento"
              className="flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-bold text-white hover:bg-gold-dark transition-colors"
            >
              COMENZAR AHORA
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/entrenamiento"
              className="flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-bold text-white hover:bg-white/5 transition-colors"
            >
              CONOCE EL ENTRENAMIENTO
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="grid grid-cols-2 rounded-xl border border-white/15 bg-white/[0.03] overflow-hidden">
            {quadrants.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-3 border border-white/10 px-6 py-10 text-center"
              >
                <Icon className="text-sage" size={30} strokeWidth={1.5} />
                <span className="text-xs font-bold tracking-wide text-white/90">{label}</span>
              </div>
            ))}
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-gold text-center text-white shadow-lg">
            <span className="text-[10px] font-bold tracking-wide">GÉNESIS</span>
            <span className="text-sm font-bold">1:28</span>
          </div>
        </div>
      </div>
    </section>
  );
}
