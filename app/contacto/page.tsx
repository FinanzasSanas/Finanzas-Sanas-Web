import type { Metadata } from "next";
import { Mail, MapPin, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contacto | Finanzas Sanas" };

export default function ContactoPage() {
  return (
    <>
      <PageHero eyebrow="CONTACTO" title="Hablemos" text="¿Tienes preguntas sobre el entrenamiento? Escríbenos." />

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 grid gap-12 md:grid-cols-2">
          <ContactForm />

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="text-forest shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-navy text-sm">Correo</h4>
                <p className="text-sm text-ink-soft">hola@finanzassanas.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-forest shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-navy text-sm">Alcance</h4>
                <p className="text-sm text-ink-soft">+20 países impactados</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="text-forest shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-navy text-sm">¿Ya tomaste el Módulo 3?</h4>
                <a href="/taller/index.html" className="text-sm text-gold-dark font-semibold hover:text-gold">
                  Haz el taller interactivo →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
