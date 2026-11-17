import { useId, useState } from "react";
import { Link } from "react-router-dom";
import ServiceIcon from "../components/graphics/ServiceIcons";
import ContourLines from "../components/graphics/ContourLines";
import { ArrowRightIcon } from "../components/Icons";
import { focusRing } from "../components/ui";
import { home, services, sectors } from "../data/content";
import { imageryExamples } from "../data/pages";
import satBhadla from "../assets/satellite/bhadla-solar-park.jpg";

/* ------------------------------- Small pieces ------------------------------- */

function Eyebrow({ children, dark = false }) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.08em] ${
        dark ? "text-brand-light" : "text-brand"
      }`}
    >
      <span aria-hidden="true" className={`h-px w-6 ${dark ? "bg-brand-light" : "bg-brand"}`} />
      {children}
    </p>
  );
}

function SectionHead({ eyebrow, title, body, dark = false, id }) {
  return (
    <div className="max-w-3xl">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={`mt-4 text-3xl font-bold leading-[1.15] sm:text-4xl ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {body && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/75" : "text-muted"}`}>{body}</p>
      )}
    </div>
  );
}

function Button({ to, children, variant = "primary" }) {
  const styles = {
    primary: "bg-brand text-white hover:bg-brand-dark",
    onDark: "bg-white text-ink hover:bg-brand-tint focus-visible:outline-brand-light",
    ghostOnDark:
      "border border-white/30 text-white hover:border-brand-light hover:text-brand-light focus-visible:outline-brand-light",
  };
  const className = `inline-flex min-h-11 items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${focusRing} ${styles[variant]}`;
  const content = (
    <>
      {children}
      <ArrowRightIcon className="h-4 w-4" />
    </>
  );
  return to.startsWith("#") ? (
    <a href={to} className={className}>
      {content}
    </a>
  ) : (
    <Link to={to} className={className}>
      {content}
    </Link>
  );
}

// Visible pre-launch marker for content only the client can supply. Remove before launch.
function NeedsInput({ children, className = "" }) {
  return (
    <div className={`relative rounded-lg border border-dashed border-accent-strong/70 bg-accent/5 ${className}`}>
      <span className="absolute -top-2.5 left-3 bg-white px-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-accent-strong">
        Needs client input
      </span>
      {children}
    </div>
  );
}

/* ----------------------------------- Hero ----------------------------------- */

// Before/after comparison of one Sentinel-2 composite (left half 2017, right half 2025).
// A native range input drives it, so it works with keyboard, touch and screen readers.
function ChangeSlider({ plate }) {
  const [pos, setPos] = useState(55);
  const inputId = useId();

  // Each layer shows the full composite at twice the frame width, so one half fills the frame.
  const layer = "absolute inset-y-0 h-full w-[200%] max-w-none object-cover select-none";

  return (
    <figure className="relative h-full w-full overflow-hidden bg-ink-soft">
      <img src={satBhadla} alt="" className={`${layer} left-0`} fetchPriority="high" draggable="false" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <img src={satBhadla} alt="" className={`${layer} -left-full`} draggable="false" />
      </div>

      {/* Date chips */}
      <span className="absolute top-4 left-4 rounded bg-ink/85 px-2 py-1 font-mono text-[11px] font-medium text-white">
        {plate.before}
      </span>
      <span className="absolute top-4 right-4 rounded bg-ink/85 px-2 py-1 font-mono text-[11px] font-medium text-white">
        {plate.after}
      </span>

      {/* Divider and handle */}
      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${pos}%` }}>
        <span className="peer-handle absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-md">
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="M7 5L2 10l5 5M13 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <label htmlFor={inputId} className="sr-only">
        Compare {plate.place}: {plate.before} on the left, {plate.after} on the right
      </label>
      <input
        id={inputId}
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="peer absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
      />
      {/* Focus ring for the invisible range input */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-md outline-2 outline-brand-light opacity-0 peer-focus-visible:opacity-100"
      />

      {/* Map plate */}
      <figcaption className="absolute right-0 bottom-0 left-0 bg-ink/90 px-4 py-3 font-mono text-[11px] leading-relaxed text-white/80 sm:px-5">
        <span className="font-medium text-white">{plate.place}</span>
        <span className="mx-2 text-white/40">·</span>
        {plate.coords}
        <span className="mx-2 text-white/40">·</span>
        {plate.sensor}
        <span className="block text-white/55">{plate.note} Drag to compare.</span>
      </figcaption>
    </figure>
  );
}

function Hero() {
  const { hero } = home;
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-ink text-white">
      <ContourLines opacity={0.1} className="lg:w-1/2" />
      <div className="container-page relative grid lg:min-h-[min(calc(100svh-4.5rem),46rem)] lg:grid-cols-12">
        <div className="flex flex-col justify-center py-10 sm:py-20 lg:col-span-5 lg:py-24 lg:pr-10">
          <Eyebrow dark>{hero.eyebrow}</Eyebrow>
          <h1
            id="hero-heading"
            className="mt-5 text-[2.5rem] leading-[1.05] font-bold sm:text-6xl lg:text-[4.25rem]"
          >
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={hero.primaryCta.to} variant="onDark">
              {hero.primaryCta.label}
            </Button>
            <Button to={hero.secondaryCta.to} variant="ghostOnDark">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>
      {/* Imagery: bleeds to the right edge on desktop, full width under the text on phones. */}
      <div className="relative h-[24rem] sm:h-[30rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[54%]">
        <ChangeSlider plate={hero.plate} />
      </div>
    </section>
  );
}

/* ------------------------------- Proof strip -------------------------------- */

function ProofStrip() {
  return (
    <section aria-label="Sarthi AI in numbers" className="border-b border-line bg-white">
      <div className="container-page py-10">
        <NeedsInput className="px-4 pt-6 pb-4 sm:px-6">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
            {home.proof.map((item) => (
              <div key={item.label}>
                <dt className="text-sm text-muted">{item.label}</dt>
                <dd className="mt-1 font-heading text-3xl font-bold text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </NeedsInput>
      </div>
    </section>
  );
}

/* --------------------------------- Services --------------------------------- */

function Services() {
  const copy = home.services;
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-18 bg-white py-16 lg:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead id="services-heading" eyebrow={copy.eyebrow} title={copy.title} body={copy.body} />
            <div className="mt-8">
              <Link to="/competency" className={`inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-dark hover:underline ${focusRing}`}>
                Full service details <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <ol className="border-t border-line lg:col-span-8">
          {services.map((service) => {
            const item = copy.items[service.id];
            return (
              <li key={service.id} className="border-b border-line">
                <Link
                  to={`/competency#${service.id}`}
                  className={`group grid gap-4 py-7 sm:grid-cols-[3rem_1fr_auto] sm:gap-6 ${focusRing}`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-tint text-brand">
                    <ServiceIcon id={service.id} className="h-8 w-8" />
                  </span>
                  <span>
                    <span className="font-mono text-xs font-medium text-muted">{service.number}</span>
                    <h3 className="mt-1 text-xl font-semibold text-ink group-hover:text-brand">{item.title}</h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-graphite">{item.outcome}</p>
                    <span className="mt-4 flex flex-wrap gap-2">
                      {item.deliverables.map((d) => (
                        <span key={d} className="rounded border border-line bg-surface px-2 py-1 text-xs font-medium text-graphite">
                          {d}
                        </span>
                      ))}
                    </span>
                  </span>
                  <ArrowRightIcon className="hidden h-5 w-5 self-center text-brand transition-transform group-hover:translate-x-1 sm:block" />
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------------- Imagery ---------------------------------- */

const IMAGERY = ["Delhi and the Yamuna River", "Singrauli coalfield", "Brahmaputra River at Majuli", "Punjab plains near Bathinda", "Sundarbans"];

function Imagery() {
  const copy = home.imagery;
  const scenes = IMAGERY.map((t) => imageryExamples.find((e) => e.title === t)).filter(Boolean);
  return (
    <section aria-labelledby="imagery-heading" className="bg-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead id="imagery-heading" eyebrow={copy.eyebrow} title={copy.title} body={copy.body} />
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {scenes.map((scene, i) => (
            <li key={scene.title} className={i === 0 ? "sm:col-span-2 lg:row-span-2" : ""}>
              <figure className="flex h-full flex-col">
                <div className={`overflow-hidden rounded-lg ${i === 0 ? "aspect-[3/2] lg:aspect-auto lg:flex-1" : "aspect-[3/2]"}`}>
                  <img src={scene.image} alt={`Satellite image: ${scene.title}`} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <figcaption className="mt-3">
                  <span className="block font-semibold text-ink">{scene.theme}</span>
                  <span className="mt-0.5 block font-mono text-xs text-muted">
                    {scene.title} · {scene.captured}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-mono text-xs text-muted">{copy.credit}</p>
      </div>
    </section>
  );
}

/* --------------------------------- Sectors ---------------------------------- */

function Sectors() {
  const copy = home.sectors;
  return (
    <section aria-labelledby="sectors-heading" className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead id="sectors-heading" eyebrow={copy.eyebrow} title={copy.title} />
        <ul className="mt-12 grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, i) => (
            <li key={sector.id} className="border-r border-b border-line">
              <Link
                to={`/competency#${sector.id}`}
                className={`group flex h-full flex-col p-6 transition-colors hover:bg-brand-tint lg:p-8 ${focusRing} focus-visible:-outline-offset-2`}
              >
                <span className="font-mono text-xs font-medium text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-semibold text-ink">{sector.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-graphite">{copy.items[sector.id]}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  How we help <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------- Process ---------------------------------- */

function Process() {
  const copy = home.process;
  return (
    <section aria-labelledby="process-heading" className="relative overflow-hidden bg-ink py-16 text-white lg:py-24">
      <ContourLines opacity={0.08} />
      <div className="container-page relative">
        <SectionHead id="process-heading" eyebrow={copy.eyebrow} title={copy.title} dark />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {copy.steps.map((step, i) => (
            <li key={step.label}>
              <div className="flex items-center gap-3" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="h-px flex-1 bg-white/20" />
              </div>
              <p className="mt-5 font-mono text-xs font-medium text-brand-light">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">{step.label}</h3>
              <p className="mt-3 leading-relaxed text-white/75">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------- Why ------------------------------------ */

function Why() {
  const copy = home.why;
  return (
    <section id="why-sarthi" aria-labelledby="why-heading" className="scroll-mt-18 bg-white py-16 lg:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHead id="why-heading" eyebrow={copy.eyebrow} title={copy.title} />
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {copy.points.map((p) => (
              <li key={p.title} className="border-t-2 border-brand pt-5">
                <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-graphite">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-8 lg:col-span-5 lg:pl-6">
          <article className="rounded-lg border border-line bg-surface p-6 lg:p-8">
            <span className="inline-flex rounded bg-accent/15 px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-accent-strong">
              {copy.featured.status}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-ink">{copy.featured.title}</h3>
            <p className="mt-3 leading-relaxed text-graphite">{copy.featured.body}</p>
            <Link to="/projects" className={`mt-6 inline-flex items-center gap-2 font-semibold text-brand hover:underline ${focusRing}`}>
              See projects <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </article>
          <NeedsInput className="p-6 lg:p-8">
            <figure>
              <blockquote className="font-heading text-xl leading-snug text-ink">{copy.testimonial.quote}</blockquote>
              <figcaption className="mt-4 text-sm text-muted">{copy.testimonial.who}</figcaption>
            </figure>
          </NeedsInput>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- CTA ------------------------------------ */

function Cta() {
  const copy = home.cta;
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden bg-brand-dark py-16 text-white lg:py-20">
      <ContourLines opacity={0.12} />
      <div className="container-page relative grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h2 id="cta-heading" className="text-3xl font-bold leading-[1.15] sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">{copy.body}</p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <Button to={copy.primary.to} variant="onDark">
            {copy.primary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Services />
      <Imagery />
      <Sectors />
      <Process />
      <Why />
      <Cta />
    </>
  );
}
