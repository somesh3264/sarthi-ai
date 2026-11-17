import ContourLines from "./graphics/ContourLines";
import CornerFrame from "./graphics/CornerFrame";

export default function PageHero({ id, index, eyebrow, title, description }) {
  return (
    <section id={id} className="relative scroll-mt-20 overflow-hidden bg-ink">
      <ContourLines opacity={0.15} />
      <CornerFrame inset={20} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(111,179,220,0.2),_transparent_55%)]" />
      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center lg:px-8">
        {eyebrow && (
          <p className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-light">
            {index && <span className="font-mono text-xs text-white/50">{index}</span>}
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
