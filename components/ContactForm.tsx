"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-forest/30 bg-forest/5 p-6 text-forest">
        <p className="font-serif font-semibold">¡Gracias por escribirnos!</p>
        <p className="mt-1 text-sm text-ink-soft">
          Este formulario es de ejemplo por ahora — no envía datos a ningún servidor todavía.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-navy mb-1" htmlFor="nombre">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          className="w-full rounded-md border border-ink/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-navy mb-1" htmlFor="correo">
          Correo
        </label>
        <input
          id="correo"
          name="correo"
          type="email"
          required
          className="w-full rounded-md border border-ink/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-navy mb-1" htmlFor="mensaje">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={4}
          className="w-full rounded-md border border-ink/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-gold px-6 py-3 text-sm font-bold text-white hover:bg-gold-dark transition-colors"
      >
        ENVIAR MENSAJE
      </button>
    </form>
  );
}
