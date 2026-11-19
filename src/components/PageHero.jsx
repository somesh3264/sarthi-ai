import ContourLines from "./graphics/ContourLines";
import CornerFrame from "./graphics/CornerFrame";

export default function PageHero({ id, index, eyebrow, title, description }) {
  return (
    <section id={id} className="relative scroll-mt-20 overflow-hidden bg-stone">
      <ContourLines opacity={0.35} className="text-brand-light" />
      <CornerFrame inset={20} color="rgba(15,51,36,0.22)" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-brand-tint),transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center lg:px-8">
        {eyebrow && (
          <p className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            {index && <span className="font-mono text-xs text-muted">{index}</span>}
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-heading text-4xl font-light text-ink sm:text-[3.4rem] sm:leading-[1.08]">{title}</h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-graphite">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
