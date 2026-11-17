import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/graphics/Reveal";
import ContourLines from "../components/graphics/ContourLines";
import { LayersIcon } from "../components/graphics/PointIcons";
import { CheckIcon, ArrowRightIcon } from "../components/Icons";
import { ButtonLink, SectionHeading, StatusBadge, focusRing } from "../components/ui";
import topoMap from "../assets/photos/topo-map.jpg";
import {
  projectsIntro,
  featuredPlatform,
  caseStudies,
  demonstrationTypes,
  imageryExamples,
} from "../data/pages";

function PhonePreview() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-[420px] w-[210px] rounded-[2.2rem] border-[6px] border-ink bg-ink shadow-2xl"
    >
      <div className="absolute inset-0 overflow-hidden rounded-[1.7rem] bg-surface">
        <ContourLines opacity={0.35} />
        <div className="absolute inset-x-3 top-6 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] text-graphite/60 shadow">
          <span className="h-2 w-2 rounded-full bg-brand" /> Search Khasra, address…
        </div>
        <div className="absolute left-[38%] top-[42%] h-20 w-24 rotate-6 border-2 border-accent bg-accent/20" />
        <div className="absolute left-[18%] top-[30%] h-14 w-16 -rotate-3 border border-brand/60 bg-brand/10" />
        <div className="absolute left-[60%] top-[24%] h-12 w-14 rotate-12 border border-brand/60 bg-brand/10" />
        <div className="absolute inset-x-3 bottom-4 rounded-2xl bg-white p-3 text-[10px] shadow-lg">
          <p className="font-semibold text-ink">Parcel details</p>
          <p className="mt-1 text-graphite/60">Land use · Area · Nearby landmarks</p>
        </div>
      </div>
    </div>
  );
}

function FeaturedCapability() {
  return (
    <section id="featured-capabilities" className="scroll-mt-6 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading index="01" label="Featured capability" title={featuredPlatform.title} />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <article className="h-full overflow-hidden rounded-3xl border border-graphite/10 bg-white shadow-sm">
              <div className="relative h-56">
                <img src={topoMap} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <StatusBadge tone="light">Featured capability</StatusBadge>
                  <StatusBadge tone="amberOnDark">{featuredPlatform.status}</StatusBadge>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="font-heading text-lg font-semibold text-ink">{featuredPlatform.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-graphite/75">{featuredPlatform.body}</p>
                <h3 className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand">
                  Technology foundation
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {featuredPlatform.stack.map((t) => (
                    <li key={t} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col items-center gap-8 rounded-3xl bg-surface p-6 sm:p-8">
              <PhonePreview />
              <div className="w-full">
                <h3 className="font-heading text-lg font-semibold text-ink">{featuredPlatform.mobile.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite/75">{featuredPlatform.mobile.body}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-brand">Proposed capabilities</p>
                <ul className="mt-2 space-y-2">
                  {featuredPlatform.mobile.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-graphite/80">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[11px] text-graphite/50">Concept preview; not the final interface.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  return (
    <section id="case-studies" className="scroll-mt-6 bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading index="02" label="Verified projects" title="Case studies" />
        </Reveal>
        {caseStudies.length === 0 ? (
          <Reveal className="mt-10 rounded-3xl border border-dashed border-graphite/20 bg-white p-8 text-center sm:p-12">
            <LayersIcon className="mx-auto h-8 w-8 text-brand" />
            <p className="mx-auto mt-4 max-w-xl text-base text-graphite/75">
              Client-approved case studies will be published here, covering the challenge, study
              area, approach, tools, outputs and outcome of each project.
            </p>
            <div className="mt-6">
              <ButtonLink to="/contact" variant="secondary">Discuss Your Project</ButtonLink>
            </div>
          </Reveal>
        ) : (
          <>
          <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <li
                key={cs.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow focus-within:shadow-lg hover:shadow-lg"
              >
                {cs.image && <img src={cs.image} alt="" className="h-44 w-full object-cover" />}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge tone="brand">Case study</StatusBadge>
                  </div>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-ink">
                    {/* Stretched link: the whole card opens the case study. */}
                    <Link to={`/projects/${cs.slug}`} className={`after:absolute after:inset-0 ${focusRing}`}>
                      {cs.title}
                    </Link>
                  </h3>
                  {cs.location && <p className="text-xs text-graphite/60">{cs.location}</p>}
                  <p className="mt-3 text-sm text-graphite/75">
                    <strong className="text-ink">Challenge:</strong> {cs.challenge}
                  </p>
                  <p className="mt-2 flex-1 text-sm text-graphite/75">
                    <strong className="text-ink">Approach:</strong> {cs.approach}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {cs.outputs.map((o) => (
                      <li key={o} className="rounded-full bg-surface px-2.5 py-0.5 text-xs">{o}</li>
                    ))}
                  </ul>
                  <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Read Case Study <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </li>
            ))}
          </ul>
          </>
        )}
      </div>
    </section>
  );
}

function Demonstrations({ index }) {
  return (
    <section id="demonstrations" className="scroll-mt-6 bg-ink py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            index={index}
            label="Demonstrations & applications"
            title="Satellite imagery applications"
            intro="Examples of how satellite imagery and geospatial analysis reveal change, risk and opportunity across very different landscapes."
            dark
          />
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {imageryExamples.map((ex, i) => (
            <Reveal
              as="li"
              key={ex.title}
              delay={(i % 4) * 0.05}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-brand-light/50 hover:shadow-[0_0_0_4px_rgba(29,111,165,0.15),0_20px_44px_-18px_rgba(0,0,0,0.6)]"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={ex.image}
                  alt={`Sentinel-2 satellite image of ${ex.title}, ${ex.captured}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <span className="absolute top-3 right-3 rounded-full bg-ink/75 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white ring-1 ring-white/25 backdrop-blur-sm">
                  Sentinel-2 · {ex.captured}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-base font-semibold">{ex.title}</h3>
                <p className="mt-1 text-sm text-white/70">{ex.theme}</p>
                {ex.detail && <p className="mt-2 text-xs text-white/55">{ex.detail}</p>}
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl border border-white/10 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge tone="light">Demonstration</StatusBadge>
            <h3 className="font-heading text-base font-semibold">Technical demonstrations</h3>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {demonstrationTypes.map((d) => (
              <li key={d} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function Projects() {
  return (
    <>
      <PageHero eyebrow="Projects" title="Projects, case studies and applications" description={projectsIntro} />
      <FeaturedCapability />
      {/* Hidden until Sarthi AI has client-approved case studies (client call, 12 Nov 2026). */}
      {caseStudies.length > 0 && <CaseStudies />}
      <Demonstrations index={caseStudies.length > 0 ? "03" : "02"} />
      <section className="py-16 text-center">
        <ButtonLink to="/contact">Discuss Your Project</ButtonLink>
      </section>
    </>
  );
}
