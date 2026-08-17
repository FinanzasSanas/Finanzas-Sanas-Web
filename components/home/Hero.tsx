import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* Foto a todo lo ancho del bloque */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-photo.png"
          alt="Escritorio con laptop mostrando el logo de Finanzas Sanas, la tarjeta Fructificar/Multiplicar/Sojuzgar/Gobernar con el versículo Génesis 1:28, una Biblia abierta y libros"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
        {/* Degradado navy a la izquierda: mantiene el titular nítido */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy from-5% via-navy/90 via-45% to-transparent to-75%" />
        {/* Refuerzo inferior sutil para asentar el bloque */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent to-30%" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl items-center px-6 md:min-h-[560px]">
        <div className="max-w-xl py-16 md:py-20">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight text-white">
            El <span className="text-sage">diseño original</span> de Dios para administrar los recursos.
          </h1>
          <div className="mt-6 h-1 w-16 bg-gold" />
          <p className="mt-6 text-lg leading-relaxed text-white/85">
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
      </div>
    </section>
  );
}
