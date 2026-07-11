import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-navy">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2 lg:items-center">
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

        <Image
          src="/images/hero-photo.png"
          alt="Escritorio con laptop mostrando el logo de Finanzas Sanas, la tarjeta Fructificar/Multiplicar/Sojuzgar/Gobernar con el versículo Génesis 1:28, una Biblia abierta y libros"
          width={936}
          height={424}
          quality={90}
          priority
          sizes="(min-width: 1024px) 640px, 100vw"
          className="h-auto w-full max-w-[936px] lg:ml-auto"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, transparent 12%, black 25%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 12%, black 25%)",
          }}
        />
      </div>
    </section>
  );
}
