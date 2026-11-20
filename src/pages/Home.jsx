import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import ServiceIcon from "../components/graphics/ServiceIcons";
import ContourLines from "../components/graphics/ContourLines";
import { ArrowRightIcon } from "../components/Icons";
import { focusRing } from "../components/ui";
import { home, services, sectors } from "../data/content";
import { sectorVideos, sectorPosters } from "../data/media";
import { CountUp, Reveal } from "../components/motion";
import { Eyebrow, NeedsInput, SectionHead } from "../components/home/parts";
import PlaceExplorer from "../components/home/PlaceExplorer";
import AnalysisStory from "../components/home/AnalysisStory";
import EngagementTabs from "../components/home/EngagementTabs";
import earthFilm from "../assets/video/earth-to-bhopal-720.mp4";
import earthPoster from "../assets/photos/earth-to-bhopal-poster.jpg";
import earthEnd from "../assets/photos/earth-to-bhopal-end.jpg";

/* ------------------------------- Small pieces ------------------------------- */

function Button({ to, children, variant = "primary" }) {
  const styles = {
    primary: "bg-ink text-white hover:bg-brand-dark",
    highlight: "bg-brand-light text-ink hover:bg-ink hover:text-white",
    outline: "border border-ink/25 text-ink hover:border-ink hover:bg-white",
    onDark: "bg-white text-ink hover:bg-brand-tint focus-visible:outline-brand-light",
    ghostOnDark:
      "border border-white/30 text-white hover:border-brand-light hover:text-brand-light focus-visible:outline-brand-light",
  };
  const className = `inline-flex min-h-11 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${focusRing} ${styles[variant]}`;
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

/* ----------------------------------- Hero ----------------------------------- */

// The hero plays a short film from orbit down to Bhopal and back out to the Sarthi end card,
// then holds on that final frame (logo over the Earth). Visitors who prefer reduced motion, or
// whose browser blocks autoplay, see the final frame straight away. The film can be skipped and
// replayed.
function HeroMedia() {
  const reduce = useReducedMotion();
  // film: playing (or waiting to be on screen) · blocked: autoplay refused · end: final frame held
  const [phase, setPhase] = useState(reduce ? "end" : "film");
  const videoRef = useRef(null);
  const boxRef = useRef(null);
  // On phones the film sits below the text, so it only plays while it is on screen.
  const inView = useInView(boxRef, { amount: 0.5 });

  // Restart from the beginning whenever the film is (re)started.
  useEffect(() => {
    const v = videoRef.current;
    if (v && phase === "film") v.currentTime = 0;
  }, [phase]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (phase !== "film" || !inView) {
      v.pause();
      return;
    }
    // iOS only autoplays when the muted attribute itself is present.
    v.muted = true;
    v.setAttribute("muted", "");
    v.playbackRate = 1.25;
    v.play().catch((err) => setPhase(err?.name === "NotAllowedError" ? "blocked" : "end"));
  }, [phase, inView]);

  // If autoplay was refused (e.g. iOS Low Power Mode), the first tap or touch anywhere starts it.
  useEffect(() => {
    if (phase !== "blocked") return;
    const go = () => {
      const v = videoRef.current;
      if (!v) return;
      v.playbackRate = 1.25;
      v.play().then(() => setPhase("film")).catch(() => {});
    };
    window.addEventListener("pointerdown", go, { once: true });
    return () => window.removeEventListener("pointerdown", go);
  }, [phase]);

  const film = phase === "film";
  return (
    <div ref={boxRef} className="relative h-full w-full overflow-hidden bg-ink">
      {!reduce && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={earthFilm}
          poster={earthPoster}
          muted
          playsInline
          preload="auto"
          onEnded={() => setPhase("end")}
          onError={() => setPhase("end")}
          aria-hidden="true"
        />
      )}
      {/* Final frame, held after the film */}
      <AnimatePresence>
        {phase === "end" && (
          <motion.img
            key="end"
            src={earthEnd}
            alt="Sarthi AI Solutions logo above the Earth: Intelligence beyond boundaries"
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
      {film && (
        <p className="absolute right-0 bottom-0 left-0 bg-ink/85 px-4 py-3 font-mono text-[11px] text-white/80 sm:px-5">
          <span className="font-medium text-white">Earth → Bhopal</span>
          <span className="mx-2 text-white/40">·</span>
          From orbit to the ground we work on
        </p>
      )}
      {!reduce && (
        <button
          type="button"
          onClick={() => {
            if (phase === "blocked") {
              const v = videoRef.current;
              v.playbackRate = 1.25;
              v.play().then(() => setPhase("film")).catch(() => setPhase("end"));
            } else setPhase(film ? "end" : "film");
          }}
          className={`absolute top-4 right-4 cursor-pointer rounded bg-ink/80 px-3 py-1.5 font-mono text-[11px] font-medium text-white hover:bg-ink ${focusRing} focus-visible:outline-brand-light`}
        >
          {phase === "blocked" ? "Play intro" : film ? "Skip intro" : "Replay intro"}
        </button>
      )}
    </div>
  );
}

function Hero() {
  const { hero } = home;
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-white text-ink">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,var(--color-brand-tint),transparent_60%)] lg:w-1/2" />
      <ContourLines opacity={0.35} className="text-brand-light lg:w-1/2" />
      <div className="container-page relative grid lg:min-h-[min(calc(100svh-4.5rem),46rem)] lg:grid-cols-12">
        <Reveal className="flex flex-col justify-center py-10 sm:py-20 lg:col-span-5 lg:py-24 lg:pr-10" y={16}>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1
            id="hero-heading"
            className="mt-5 font-heading text-[2.6rem] leading-[1.04] font-light text-ink sm:text-6xl lg:text-[4.5rem]"
          >
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite sm:text-lg">{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={hero.primaryCta.to} variant="highlight">
              {hero.primaryCta.label}
            </Button>
            <Button to={hero.secondaryCta.to} variant="outline">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </div>
      {/* Imagery: bleeds to the right edge on desktop, full width under the text on phones. */}
      <div className="relative h-[24rem] sm:h-[30rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[54%]">
        <HeroMedia />
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
                <dd className="mt-1 font-heading text-4xl font-light text-ink">
                  <CountUp value={item.value} />
                </dd>
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
          {services.map((service, i) => {
            const item = copy.items[service.id];
            return (
              <Reveal as="li" key={service.id} delay={Math.min(i, 3) * 0.06} className="border-b border-line">
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
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------------- Sectors ---------------------------------- */

// A sector's short clip. It plays on its own while the tile is on screen (desktop and phone
// alike) and pauses when scrolled away. Reduced-motion visitors see the still poster.
function SectorClip({ id }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35 });

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduce]);

  if (reduce) {
    return <img src={sectorPosters[id]} alt="" loading="lazy" className="h-full w-full object-cover" />;
  }
  return (
    <video
      ref={ref}
      src={sectorVideos[id]}
      poster={sectorPosters[id]}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}

function SectorTile({ sector, index, text }) {
  return (
    <Link
      to={`/competency#${sector.id}`}
      className={`group flex h-full flex-col transition-colors hover:bg-brand-tint ${focusRing} focus-visible:-outline-offset-2`}
    >
      <span className="relative block aspect-[16/9] overflow-hidden bg-ink">
        <SectorClip id={sector.id} />
        <span className="absolute top-3 left-3 rounded bg-ink/85 px-2 py-1 font-mono text-[11px] font-medium text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>
      <span className="flex flex-1 flex-col p-6 lg:p-8">
        <h3 className="text-xl font-semibold text-ink">{sector.name}</h3>
        <span className="mt-3 block flex-1 leading-relaxed text-graphite">{text}</span>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          How we help <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  );
}

function Sectors() {
  const copy = home.sectors;
  return (
    <section aria-labelledby="sectors-heading" className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead id="sectors-heading" eyebrow={copy.eyebrow} title={copy.title} />
        <ul className="mt-12 grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, i) => (
            <Reveal as="li" key={sector.id} delay={(i % 3) * 0.08} className="border-r border-b border-line">
              <SectorTile sector={sector} index={i} text={copy.items[sector.id]} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------- Process ---------------------------------- */

// The process band draws itself step by step: each dot lands, then its line runs on to the next.
function ProcessDot({ delay }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className="h-2.5 w-2.5 rounded-full bg-accent" />;
  return (
    <motion.span
      className="h-2.5 w-2.5 rounded-full bg-accent"
      initial={{ scale: 0 }}
      whileInView={{ scale: [0, 1.6, 1] }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, delay }}
    />
  );
}

function ProcessLine({ delay }) {
  const reduce = useReducedMotion();
  const cls = "absolute inset-0 origin-left bg-brand";
  if (reduce) return <span className={cls} />;
  return (
    <motion.span
      className={cls}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    />
  );
}

function Process() {
  const copy = home.process;
  return (
    <section aria-labelledby="process-heading" className="relative overflow-hidden bg-brand-tint py-16 text-ink lg:py-24">
      <ContourLines opacity={0.25} className="text-brand" />
      <div className="container-page relative">
        <SectionHead id="process-heading" eyebrow={copy.eyebrow} title={copy.title} />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {copy.steps.map((step, i) => (
            <Reveal as="li" key={step.label} delay={i * 0.35} y={12}>
              <div className="flex items-center gap-3" aria-hidden="true">
                <ProcessDot delay={i * 0.35} />
                <span className="relative h-px flex-1 bg-ink/10">
                  <ProcessLine delay={i * 0.35 + 0.2} />
                </span>
              </div>
              <p className="mt-5 font-mono text-xs font-medium text-brand">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-ink">{step.label}</h3>
              <p className="mt-3 leading-relaxed text-graphite">{step.body}</p>
            </Reveal>
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
            {copy.points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="border-t-2 border-brand pt-5">
                <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-graphite">{p.body}</p>
              </Reveal>
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
              <blockquote className="font-heading text-2xl leading-snug text-ink">{copy.testimonial.quote}</blockquote>
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
    <section aria-labelledby="cta-heading" className="relative overflow-hidden bg-brand-light py-16 text-ink lg:py-20">
      <ContourLines opacity={0.2} className="text-ink" />
      <div className="container-page relative grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h2 id="cta-heading" className="font-heading text-3xl leading-[1.12] font-normal sm:text-[2.6rem]">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">{copy.body}</p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <Button to={copy.primary.to} variant="primary">
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
      <AnalysisStory />
      <PlaceExplorer />
      <Sectors />
      <Process />
      <EngagementTabs />
      <Why />
      <Cta />
    </>
  );
}
