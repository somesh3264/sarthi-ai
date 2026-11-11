import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import ServiceAccordion from "../components/ServiceAccordion";
import Reveal from "../components/graphics/Reveal";
import { SatelliteIcon, DroneIcon, AIIcon } from "../components/graphics/ThemeIcons";
import { ButtonLink, SectionHeading, focusRing } from "../components/ui";
import { sectorVideos, sectorPosters } from "../data/media";
import InViewVideo from "../components/InViewVideo";
import {
  competencyIntro,
  serviceGroups,
  services,
  supportingCapabilities,
  sectors,
} from "../data/content";

const serviceById = Object.fromEntries(services.map((s) => [s.id, s]));
const CAPABILITY_ICONS = [SatelliteIcon, DroneIcon, AIIcon];

function ServiceGroups() {
  return (
    <section id="services" className="mx-auto max-w-5xl scroll-mt-6 px-6 py-20 lg:px-8">
      <Reveal>
        <SectionHeading index="01" label="Core services" title="Six core services" />
      </Reveal>
      <div className="mt-12 space-y-14">
        {serviceGroups.map((group) => (
          <div key={group.name}>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-teal">
              {group.name}
            </p>
            <div className="mt-4 space-y-4">
              {group.services.map((id) => (
                <Reveal key={id}>
                  <ServiceAccordion service={serviceById[id]} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SupportingCapabilities() {
  return (
    <section id="capabilities" className="scroll-mt-6 bg-navy py-20 text-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            index="02"
            label="Supporting capabilities"
            title="The technology behind every engagement"
            dark
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {supportingCapabilities.map((cap, i) => {
            const Icon = CAPABILITY_ICONS[i];
            return (
              <Reveal key={cap.title} delay={i * 0.08} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-azure/15 text-azure">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">{cap.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {cap.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm leading-relaxed text-white/70">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-azure" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectorPanel({ sector, reverse }) {
  return (
    <article
      id={sector.id}
      className="scroll-mt-6 grid grid-cols-1 overflow-hidden rounded-3xl border border-grey-dark/10 bg-white shadow-sm lg:grid-cols-2"
    >
      <div className={`relative min-h-60 ${reverse ? "lg:order-2" : ""}`}>
        <InViewVideo
          src={sectorVideos[sector.id]}
          poster={sectorPosters[sector.id]}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
        <span className="absolute bottom-3 left-4 text-[11px] text-white/70">Illustrative footage</span>
      </div>
      <div className="p-6 sm:p-8">
        <h3 className="font-heading text-2xl font-semibold text-navy">{sector.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-grey-dark/75">{sector.description}</p>

        <h4 className="mt-6 text-xs font-semibold uppercase tracking-widest text-teal">Typical support</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {sector.themes.map((t) => (
            <li key={t} className="rounded-full bg-grey-light px-3 py-1 text-xs font-medium text-grey-dark/80">
              {t}
            </li>
          ))}
        </ul>

        <h4 className="mt-6 text-xs font-semibold uppercase tracking-widest text-teal">Relevant services</h4>
        <ul className="mt-3 space-y-1.5">
          {sector.services.map((id) => (
            <li key={id}>
              <Link
                to={`/competency#${id}`}
                className={`rounded-sm text-sm font-medium text-navy underline decoration-teal/40 underline-offset-4 hover:decoration-teal ${focusRing}`}
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
  return (
    <section id="sectors" className="scroll-mt-6 bg-grey-light py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            index="03"
            label="Industry sectors we support"
            title="Applying geospatial intelligence by sector"
          />
        </Reveal>
        <div className="mt-12 space-y-8">
          {sectors.map((sector, i) => (
            <Reveal key={sector.id}>
              <SectorPanel sector={sector} reverse={i % 2 === 1} />
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
      <PageHero eyebrow="Our Competency" title="Services that power better decisions" description={competencyIntro} />
      <ServiceGroups />
      <SupportingCapabilities />
      <SectorsSection />
    </>
  );
}
