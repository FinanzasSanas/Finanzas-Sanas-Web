import Image from "next/image";
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

        <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src="/images/hero-desk.png"
              alt="Laptop con el logo de Finanzas Sanas sobre un escritorio, junto a una Biblia abierta"
              width={656}
              height={424}
              priority
              className="h-auto w-full object-cover"
            />
            <div className="absolute inset-y-0 left-0 grid w-[46%] grid-cols-2 bg-navy">
              {quadrants.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center gap-2 border border-white/10 px-2 py-4 text-center"
                >
                  <Icon className="text-sage" size={24} strokeWidth={1.5} />
                  <span className="text-[10px] font-bold tracking-wide text-white/90 sm:text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute left-[46%] top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gold text-center text-white shadow-lg sm:h-20 sm:w-20">
            <span className="text-[9px] font-bold tracking-wide sm:text-[10px]">GÉNESIS</span>
            <span className="text-xs font-bold sm:text-sm">1:28</span>
          </div>
        </div>
      </div>
    </section>
  );
}
