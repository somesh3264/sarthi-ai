import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import ServiceAccordion from "../components/ServiceAccordion";
import { Reveal } from "../components/motion";
import { SatelliteIcon, DroneIcon, AIIcon } from "../components/graphics/ThemeIcons";
import { ButtonLink, focusRing } from "../components/ui";
import { SectionHead } from "../components/home/parts";
import { MapSheet, MediaHero, ParallaxBand } from "../components/pagefx";
import { sectorVideos, sectorPosters } from "../data/media";
import InViewVideo from "../components/InViewVideo";
import satBhadla from "../assets/satellite/bhadla-solar-park.jpg";
import satSingrauli from "../assets/satellite/singrauli-coalfield.jpg";
import satSundarbans from "../assets/satellite/sundarbans.jpg";
import satDelhi from "../assets/satellite/delhi-yamuna.jpg";
import terrain from "../assets/story/terrain.jpg";
import landcover from "../assets/story/landcover.jpg";
import suitability from "../assets/story/suitability.jpg";
import aiStreams from "../assets/photos/ai-data-streams.jpg";
import powerLines from "../assets/photos/power-lines.jpg";
import { competencyIntro, serviceGroups, services, supportingCapabilities, sectors } from "../data/content";

const serviceById = Object.fromEntries(services.map((s) => [s.id, s]));

const HERO_SLIDES = [
  { src: satBhadla, label: "Bhadla Solar Park, Rajasthan", note: "Site suitability", coords: "27.53° N · 71.92° E", alt: "Satellite image of Bhadla Solar Park" },
  { src: satSingrauli, label: "Singrauli coalfield", note: "Environmental assessment", coords: "24.20° N · 82.67° E", alt: "Satellite image of the Singrauli coalfield" },
  { src: satSundarbans, label: "Sundarbans", note: "Disaster preparedness", coords: "21.95° N · 89.18° E", alt: "Satellite image of the Sundarbans" },
  { src: satDelhi, label: "Delhi and the Yamuna River", note: "Analytics and decision support", coords: "28.61° N · 77.25° E", alt: "Satellite image of Delhi" },
];

// One picture per service group; it changes as the visitor scrolls through the groups.
const GROUP_MEDIA = [
  { src: suitability, alt: "Ranked site-suitability map" },
  { src: satSundarbans, alt: "Satellite image of the Sundarbans delta" },
  { src: aiStreams, alt: "Data streams over a map" },
];

const CAPABILITIES = [
  { Icon: SatelliteIcon, src: satBhadla },
  { Icon: DroneIcon, src: terrain },
  { Icon: AIIcon, src: landcover },
];

const shortName = (name) => name.split(/ [&(]/)[0];

// Reports which of the observed elements sits in the middle band of the screen.
function useActive(count) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number(e.target.dataset.idx));
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    refs.current.slice(0, count).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [count]);
  return [active, refs];
}

function ServiceGroups() {
  const reduce = useReducedMotion();
  const [active, refs] = useActive(serviceGroups.length);

  return (
    <section id="services" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead
          eyebrow="Core services"
          title="Six core services"
          body="Grouped by the decision they support. Open a service to see what it covers and what you receive."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Pinned picture for the group in view (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <figure className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ink">
                {GROUP_MEDIA.map((m, i) => (
                  <img
                    key={m.src}
                    src={m.src}
                    alt={i === active ? m.alt : ""}
                    aria-hidden={i === active ? undefined : "true"}
                    className={`absolute inset-0 h-full w-full object-cover ${reduce ? "" : "transition-[opacity,transform] duration-[1200ms] ease-out"} ${
                      i === active ? "scale-100 opacity-100" : "scale-110 opacity-0"
                    }`}
                  />
                ))}
                <MapSheet />
                <span className="absolute top-4 left-1/2 -translate-x-1/2 rounded bg-ink/85 px-2 py-1 font-mono text-[11px] whitespace-nowrap text-white">
                  {String(active + 1).padStart(2, "0")} / {String(serviceGroups.length).padStart(2, "0")} · {serviceGroups[active].name}
                </span>
              </div>
              <div className="mt-3 flex gap-1.5" aria-hidden="true">
                {serviceGroups.map((g, i) => (
                  <span key={g.name} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= active ? "bg-brand" : "bg-line"}`} />
                ))}
              </div>
            </figure>
          </div>

          {/* Groups and their services */}
          <div className="min-w-0 space-y-14 lg:col-span-7 lg:space-y-24 lg:pb-24">
            {serviceGroups.map((group, gi) => (
              <div key={group.name} ref={(el) => (refs.current[gi] = el)} data-idx={gi}>
                <Reveal>
                  <p className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand">
                    <span className={`h-px bg-brand transition-all duration-500 ${gi === active ? "w-10" : "w-6"}`} aria-hidden="true" />
                    {group.name}
                  </p>
                </Reveal>
                {/* phones: the group's picture inline */}
                <Reveal className="mt-4 lg:hidden">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-ink">
                    <img src={GROUP_MEDIA[gi].src} alt={GROUP_MEDIA[gi].alt} loading="lazy" className="drift h-full w-full object-cover" />
                    <MapSheet grid={false} />
                  </div>
                </Reveal>
                <div className="mt-4 space-y-4">
                  {group.services.map((id, k) => (
                    <Reveal key={id} delay={k * 0.08}>
                      <div className="transition-transform duration-300 hover:-translate-y-0.5">
                        <ServiceAccordion service={serviceById[id]} />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({ cap, media, index }) {
  const reduce = useReducedMotion();
  const { Icon, src } = media;
  return (
    <Reveal delay={index * 0.1} className="h-full">
      <div className="group h-full overflow-hidden rounded-2xl bg-white ring-1 ring-ink/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgba(15,51,36,0.45)]">
        <div className="relative h-40 bg-ink">
          <div className="absolute inset-0 overflow-hidden">
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <MapSheet grid={false} />
          </div>
          <span className="absolute bottom-0 left-6 flex h-11 w-11 translate-y-1/2 items-center justify-center rounded-lg bg-brand-light text-ink shadow-sm">
            <Icon className="h-5 w-5" />
          </span>
        </div>
        <div className="p-6 pt-9">
          <h3 className="text-lg font-semibold text-ink">{cap.title}</h3>
          <ul className="mt-4 space-y-2">
            {cap.points.map((p, k) => (
              <motion.li
                key={p}
                className="flex gap-2 text-sm leading-relaxed text-graphite"
                initial={reduce ? false : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 + k * 0.08 }}
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>{p}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

function SupportingCapabilities() {
  return (
    <section id="capabilities" className="scroll-mt-24 bg-brand-tint py-16 lg:py-24">
      <div className="container-page">
        <SectionHead eyebrow="Supporting capabilities" title="The technology behind every engagement" />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {supportingCapabilities.map((cap, i) => (
            <CapabilityCard key={cap.title} cap={cap} media={CAPABILITIES[i]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectorPanel({ sector, reverse, index, innerRef }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.04, 1.18]);

  return (
    <article
      ref={(el) => {
        ref.current = el;
        innerRef(el);
      }}
      data-idx={index}
      id={sector.id}
      className="group grid scroll-mt-40 grid-cols-1 overflow-hidden rounded-3xl bg-white ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgba(15,51,36,0.5)] focus-within:shadow-[0_24px_50px_-28px_rgba(15,51,36,0.5)] lg:grid-cols-2"
    >
      <div className={`relative min-h-64 overflow-hidden bg-ink lg:min-h-[26rem] ${reverse ? "lg:order-2" : ""}`}>
        <motion.div className="absolute inset-0" style={reduce ? undefined : { scale }}>
          <InViewVideo src={sectorVideos[sector.id]} poster={sectorPosters[sector.id]} className="absolute inset-0 h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        <MapSheet grid={false} />
        <span className="absolute top-4 left-1/2 -translate-x-1/2 rounded bg-ink/85 px-2 py-1 font-mono text-[11px] font-medium text-white">
          {String(index + 1).padStart(2, "0")} / {String(sectors.length).padStart(2, "0")}
        </span>
      </div>
      <div className="p-6 sm:p-10">
        <h3 className="font-heading text-2xl font-normal text-ink sm:text-3xl">{sector.name}</h3>
        <p className="mt-3 leading-relaxed text-graphite">{sector.description}</p>

        <h4 className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand">Typical support</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {sector.themes.map((t, k) => (
            <motion.li
              key={t}
              className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-graphite"
              initial={reduce ? false : { opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.35, delay: 0.1 + k * 0.06 }}
            >
              {t}
            </motion.li>
          ))}
        </ul>

        <h4 className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand">Relevant services</h4>
        <ul className="mt-3 space-y-1.5">
          {sector.services.map((id) => (
            <li key={id}>
              <Link
                to={`/competency#${id}`}
                className={`rounded-sm text-sm font-medium text-ink underline decoration-brand/40 underline-offset-4 hover:decoration-brand ${focusRing}`}
              >
                {serviceById[id].title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <ButtonLink to={`/contact?sector=${sector.id}`}>Discuss a project in this sector</ButtonLink>
        </div>
      </div>
    </article>
  );
}

function SectorsSection() {
  const [active, refs] = useActive(sectors.length);
  const bar = useRef(null);
  // Keep the active sector's chip visible when the bar scrolls sideways (phones).
  useEffect(() => {
    const el = bar.current;
    const chip = el?.children[active];
    if (!chip) return;
    el.scrollTo({ left: chip.offsetLeft - el.clientWidth / 2 + chip.offsetWidth / 2, behavior: "smooth" });
  }, [active]);
  return (
    <section id="sectors" className="scroll-mt-24 bg-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead eyebrow="Industry sectors we support" title="Applying geospatial intelligence by sector" />
        {/* Sector index that follows the scroll */}
        <nav aria-label="Sectors" className="sticky top-[4.5rem] z-20 -mx-5 mt-10 bg-surface/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
          <ul ref={bar} className="relative flex gap-2 overflow-x-auto [scrollbar-width:none]">
            {sectors.map((s, i) => (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  aria-current={i === active ? "true" : undefined}
                  className={`block rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${focusRing} ${
                    i === active ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-ink/10 hover:ring-brand"
                  }`}
                >
                  {shortName(s.name)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 space-y-8">
          {sectors.map((sector, i) => (
            <Reveal key={sector.id} y={32}>
              <SectorPanel sector={sector} reverse={i % 2 === 1} index={i} innerRef={(el) => (refs.current[i] = el)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Competency() {
  return (
    <>
      <MediaHero eyebrow="Our Competency" title="Services that power better decisions" body={competencyIntro} slides={HERO_SLIDES}>
        <ButtonLink to="/competency#services">See the six services</ButtonLink>
        <ButtonLink to="/contact" variant="secondary">Discuss your project</ButtonLink>
      </MediaHero>
      <ServiceGroups />
      <SupportingCapabilities />
      <SectorsSection />
      <ParallaxBand src={powerLines} className="py-24 text-white lg:py-32">
        <div className="absolute inset-0 bg-ink/70" />
        <Reveal className="relative container-page max-w-3xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand-light">Not sure which service fits?</p>
          <h2 className="mt-4 font-heading text-3xl leading-[1.12] font-light sm:text-[2.6rem]">Start with the decision you need to make</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            Tell us about the site and the question. We will suggest the combination of services that answers it.
          </p>
          <div className="mt-8">
            <ButtonLink to="/contact" variant="light">Talk to us</ButtonLink>
          </div>
        </Reveal>
      </ParallaxBand>
    </>
  );
}
