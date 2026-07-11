"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Sparkles, User, X } from "lucide-react";
import LogoMark from "./Logo";

const entrenamientoLinks = [
  { label: "Ver los 7 módulos", href: "/entrenamiento#modulos" },
  { label: "Cómo funciona", href: "/entrenamiento" },
];

const recursosLinks = [
  { label: "Guías y descargables", href: "/recursos" },
  { label: "Blog", href: "/blog" },
];

function NavDropdown({ label, links }: { label: string; links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-sm font-semibold tracking-wide text-white/90 hover:text-gold-light transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-3 z-50">
          <div className="min-w-[220px] rounded-lg border border-white/10 bg-navy-dark shadow-xl overflow-hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-sm text-white/85 hover:bg-white/5 hover:text-gold-light transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function navLinkClass(active: boolean) {
  return active
    ? "text-sm font-semibold tracking-wide text-gold-light border-b-2 border-gold-light pb-1"
    : "text-sm font-semibold tracking-wide text-white/90 hover:text-gold-light transition-colors";
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-navy sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <LogoMark className="h-10 w-10 text-white" />
          <div>
            <div className="font-serif text-lg font-semibold leading-tight text-white">
              FINANZAS
              <br />
              SANAS
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className={navLinkClass(pathname === "/")}>
            INICIO
          </Link>
          <Link href="/sobre-nosotros" className={navLinkClass(pathname === "/sobre-nosotros")}>
            SOBRE NOSOTROS
          </Link>
          <NavDropdown label="ENTRENAMIENTO" links={entrenamientoLinks} />
          <NavDropdown label="RECURSOS" links={recursosLinks} />
          <Link href="/blog" className={navLinkClass(pathname === "/blog")}>
            BLOG
          </Link>
          <Link href="/contacto" className={navLinkClass(pathname === "/contacto")}>
            CONTACTO
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href="/taller/index.html"
            className="flex items-center gap-2 rounded-full border border-sage/50 px-4 py-2 text-sm font-semibold text-sage hover:bg-sage/10 transition-colors"
          >
            <Sparkles size={16} />
            TALLER INTERACTIVO
          </a>
          <a
            href="#"
            className="flex items-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-bold text-white hover:bg-gold-dark transition-colors"
          >
            <User size={16} />
            ACCESO ALUMNOS
          </a>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-navy-dark px-6 py-5 flex flex-col gap-4">
          <Link href="/" className="text-white font-semibold" onClick={() => setMobileOpen(false)}>
            INICIO
          </Link>
          <Link href="/sobre-nosotros" className="text-white/90" onClick={() => setMobileOpen(false)}>
            SOBRE NOSOTROS
          </Link>
          <Link href="/entrenamiento" className="text-white/90" onClick={() => setMobileOpen(false)}>
            ENTRENAMIENTO
          </Link>
          <Link href="/recursos" className="text-white/90" onClick={() => setMobileOpen(false)}>
            RECURSOS
          </Link>
          <Link href="/blog" className="text-white/90" onClick={() => setMobileOpen(false)}>
            BLOG
          </Link>
          <Link href="/contacto" className="text-white/90" onClick={() => setMobileOpen(false)}>
            CONTACTO
          </Link>
          <a href="/taller/index.html" className="flex items-center gap-2 text-sage font-semibold">
            <Sparkles size={16} />
            TALLER INTERACTIVO
          </a>
          <a href="#" className="flex items-center justify-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-bold text-white">
            <User size={16} />
            ACCESO ALUMNOS
          </a>
        </div>
      )}
    </header>
  );
}
