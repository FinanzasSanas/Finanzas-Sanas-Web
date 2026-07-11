import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Sobre Nosotros | Finanzas Sanas" };

export default function SobreNosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="SOBRE NOSOTROS"
        title="Un llamado a administrar como Dios diseñó"
        text="Finanzas Sanas nace de la convicción de que el dinero no es un tema secular, sino un área más donde Dios quiere ser Señor."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 space-y-6 text-ink-soft leading-relaxed">
          <p>
            <strong className="text-navy">[Contenido de ejemplo — reemplázalo con tu historia.]</strong> Durante
            años vimos a personas de fe luchar en silencio con deudas, ansiedad financiera y falta de dirección,
            no por falta de fe, sino por falta de fundamentos claros. Finanzas Sanas existe para cerrar esa
            brecha: unir la sabiduría bíblica con herramientas prácticas de administración.
          </p>
          <p>
            Génesis 1:28 nos muestra el diseño original — fructificar, multiplicar, sojuzgar y gobernar. Ese es
            el mapa que seguimos en cada módulo de nuestro entrenamiento.
          </p>
          <div className="rounded-lg border-l-4 border-gold bg-mist/60 p-6 italic text-navy">
            &ldquo;No imiten las conductas ni las costumbres de este mundo; más bien, dejen que Dios los
            transforme en personas nuevas al cambiarles la manera de pensar.&rdquo;
            <span className="mt-2 block text-sm not-italic text-gold-dark">— Romanos 12:2, NTV</span>
          </div>
          <p>
            Hoy acompañamos a más de 8,000 personas en más de 20 países en su camino hacia la libertad
            financiera bíblica, con mentoría, comunidad y un propósito que trasciende generaciones.
          </p>
        </div>
      </section>
    </>
  );
}
