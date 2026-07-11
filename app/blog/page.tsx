import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Blog | Finanzas Sanas" };

const posts = [
  {
    title: "[Título de artículo de ejemplo 1]",
    excerpt: "Reemplaza este espacio con un resumen breve de tu primer artículo del blog.",
    date: "Próximamente",
  },
  {
    title: "[Título de artículo de ejemplo 2]",
    excerpt: "Aquí puedes escribir sobre principios bíblicos de mayordomía, deudas o generosidad.",
    date: "Próximamente",
  },
  {
    title: "[Título de artículo de ejemplo 3]",
    excerpt: "Historias de transformación de alumnos del entrenamiento, testimonios o devocionales.",
    date: "Próximamente",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="BLOG"
        title="Reflexiones sobre fe y finanzas"
        text="[Contenido de ejemplo — aquí irán tus artículos publicados.]"
      />

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="flex flex-col gap-3 rounded-lg border border-ink/10 p-6">
              <span className="text-xs font-semibold tracking-wide text-gold-dark">{post.date}</span>
              <h3 className="font-serif font-semibold text-navy leading-snug">{post.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
