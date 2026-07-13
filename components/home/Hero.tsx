import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="relative z-10 mx-auto grid max-w-7xl lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col justify-center px-6 py-16 md:py-20">
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

        {/* Spacer: reserves the second grid column's width on desktop so the text column stays half-width; the actual photo is positioned absolutely below so it can bleed to the viewport edge. */}
        <div className="hidden lg:block" />
      </div>

      <div className="relative z-0 h-[320px] w-full sm:h-[420px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[max(959px,calc(50vw_+_180px))]">
        <Image
          src="/images/hero-photo.png"
          alt="Escritorio con laptop mostrando el logo de Finanzas Sanas, la tarjeta Fructificar/Multiplicar/Sojuzgar/Gobernar con el versículo Génesis 1:28, una Biblia abierta y libros"
          fill
          priority
          quality={90}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-[30%_center] lg:object-[100%_center]"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, transparent 4%, black 12%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 4%, black 12%)",
          }}
        />
      </div>
    </section>
  );
}
