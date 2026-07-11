export default function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        <span className="text-xs font-bold tracking-widest text-gold-light">{eyebrow}</span>
        <h1 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-white">{title}</h1>
        {text && <p className="mt-4 text-white/75 max-w-2xl mx-auto leading-relaxed">{text}</p>}
      </div>
    </section>
  );
}
