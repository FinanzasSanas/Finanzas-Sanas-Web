import Link from "next/link";
import { Mail, MapPin, Sparkles } from "lucide-react";
import LogoMark from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <LogoMark className="h-9 w-9 text-white" />
            <span className="font-serif text-base font-semibold text-white">FINANZAS SANAS</span>
          </div>
          <p className="text-sm leading-relaxed">Administra como Dios diseñó.</p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm tracking-wide mb-4">NAVEGACIÓN</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/sobre-nosotros" className="hover:text-gold-light transition-colors">Sobre Nosotros</Link></li>
            <li><Link href="/entrenamiento" className="hover:text-gold-light transition-colors">Entrenamiento</Link></li>
            <li><Link href="/recursos" className="hover:text-gold-light transition-colors">Recursos</Link></li>
            <li><Link href="/blog" className="hover:text-gold-light transition-colors">Blog</Link></li>
            <li><Link href="/contacto" className="hover:text-gold-light transition-colors">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm tracking-wide mb-4">TALLER</h4>
          <Link href="/radiografia-financiera" className="flex items-center gap-2 text-sm text-sage hover:text-sage/80 transition-colors">
            <Sparkles size={16} />
            Radiografía Financiera
          </Link>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm tracking-wide mb-4">CONTACTO</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <span>hola@finanzassanas.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              <span>+20 países impactados</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs">
        © {new Date().getFullYear()} Finanzas Sanas. Todos los derechos reservados.
      </div>
    </footer>
  );
}
