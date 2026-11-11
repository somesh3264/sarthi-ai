import PageHero from "../components/PageHero";
import Reveal from "../components/graphics/Reveal";
import ContourLines from "../components/graphics/ContourLines";
import { GlobeIcon, LayersIcon } from "../components/graphics/PointIcons";
import { CheckIcon } from "../components/Icons";
import { ButtonLink, SectionHeading, StatusBadge } from "../components/ui";
import cityNight from "../assets/photos/city-night.jpg";
import {
  projectsIntro,
  featuredPlatform,
  caseStudies,
  demonstrationTypes,
  imageryExamples,
  imageryCaption,
} from "../data/pages";

function PhonePreview() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-[420px] w-[210px] rounded-[2.2rem] border-[6px] border-navy bg-navy shadow-2xl"
    >
      <div className="absolute inset-0 overflow-hidden rounded-[1.7rem] bg-[#e9efe9]">
        <ContourLines opacity={0.35} />
        <div className="absolute inset-x-3 top-6 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] text-grey-dark/60 shadow">
          <span className="h-2 w-2 rounded-full bg-teal" /> Search Khasra, address…
        </div>
        <div className="absolute left-[38%] top-[42%] h-20 w-24 rotate-6 border-2 border-emerald bg-emerald/20" />
        <div className="absolute left-[18%] top-[30%] h-14 w-16 -rotate-3 border border-teal/60 bg-teal/10" />
        <div className="absolute left-[60%] top-[24%] h-12 w-14 rotate-12 border border-teal/60 bg-teal/10" />
        <div className="absolute inset-x-3 bottom-4 rounded-2xl bg-white p-3 text-[10px] shadow-lg">
          <p className="font-semibold text-navy">Parcel details</p>
          <p className="mt-1 text-grey-dark/60">Land use · Area · Nearby landmarks</p>
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
            <article className="h-full overflow-hidden rounded-3xl border border-grey-dark/10 bg-white shadow-sm">
              <div className="relative h-56">
                <img src={cityNight} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <StatusBadge tone="light">Featured capability</StatusBadge>
                  <StatusBadge tone="amberOnDark">{featuredPlatform.status}</StatusBadge>
                </div>
                <span className="absolute right-4 bottom-4 text-[11px] text-white/70">Illustrative image</span>
              </div>
              <div className="p-6 sm:p-8">
                <p className="font-heading text-lg font-semibold text-navy">{featuredPlatform.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-grey-dark/75">{featuredPlatform.body}</p>
                <h3 className="mt-6 text-xs font-semibold uppercase tracking-widest text-teal">
                  Technology foundation
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {featuredPlatform.stack.map((t) => (
                    <li key={t} className="rounded-full bg-grey-light px-3 py-1 text-xs font-medium text-navy">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col items-center gap-8 rounded-3xl bg-grey-light p-6 sm:p-8">
              <PhonePreview />
              <div className="w-full">
                <h3 className="font-heading text-lg font-semibold text-navy">{featuredPlatform.mobile.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-grey-dark/75">{featuredPlatform.mobile.body}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-teal">Proposed capabilities</p>
                <ul className="mt-2 space-y-2">
                  {featuredPlatform.mobile.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-grey-dark/80">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[11px] text-grey-dark/50">Concept preview; not the final interface.</p>
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
    <section id="case-studies" className="scroll-mt-6 bg-grey-light py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading index="02" label="Verified projects" title="Case studies" />
        </Reveal>
        {caseStudies.length === 0 ? (
          <Reveal className="mt-10 rounded-3xl border border-dashed border-grey-dark/20 bg-white p-8 text-center sm:p-12">
            <LayersIcon className="mx-auto h-8 w-8 text-teal" />
            <p className="mx-auto mt-4 max-w-xl text-base text-grey-dark/75">
              Client-approved case studies will be published here, covering the challenge, study
              area, approach, tools, outputs and outcome of each project.
            </p>
            <div className="mt-6">
              <ButtonLink to="/contact" variant="secondary">Discuss Your Project</ButtonLink>
            </div>
          </Reveal>
        ) : (
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <li key={cs.title} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                {cs.image && <img src={cs.image} alt="" className="h-44 w-full object-cover" />}
                <div className="p-6">
                  <StatusBadge tone="teal">Case study</StatusBadge>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-navy">{cs.title}</h3>
                  {cs.location && <p className="text-xs text-grey-dark/60">{cs.location}</p>}
                  <p className="mt-3 text-sm text-grey-dark/75">
                    <strong className="text-navy">Challenge:</strong> {cs.challenge}
                  </p>
                  <p className="mt-2 text-sm text-grey-dark/75">
                    <strong className="text-navy">Approach:</strong> {cs.approach}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {cs.outputs.map((o) => (
                      <li key={o} className="rounded-full bg-grey-light px-2.5 py-0.5 text-xs">{o}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function Demonstrations() {
  return (
    <section id="demonstrations" className="scroll-mt-6 bg-navy py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            index="03"
            label="Demonstrations & applications"
            title="Satellite imagery applications"
            intro="Examples of how satellite imagery and geospatial analysis reveal change, risk and opportunity across very different landscapes."
            dark
          />
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {imageryExamples.map((ex, i) => (
            <Reveal as="li" key={ex.title} delay={(i % 4) * 0.05} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <GlobeIcon className="h-5 w-5 text-azure" />
                <StatusBadge tone="light">Illustrative</StatusBadge>
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold">{ex.title}</h3>
              <p className="mt-1 text-sm text-white/70">{ex.theme}</p>
              {ex.detail && <p className="mt-2 text-xs text-white/55">{ex.detail}</p>}
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-xs text-white/55">{imageryCaption}</p>

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
      <CaseStudies />
      <Demonstrations />
      <section className="py-16 text-center">
        <ButtonLink to="/contact">Discuss Your Project</ButtonLink>
      </section>
    </>
  );
}
