import { Link } from "react-router-dom";
import BrandIntro from "../components/BrandIntro";
import cityNight from "../assets/photos/city-night.jpg";
import ContourLines from "../components/graphics/ContourLines";
import ProcessWorkflow from "../components/graphics/ProcessWorkflow";
import Reveal from "../components/graphics/Reveal";
import { CheckIcon, ArrowRightIcon } from "../components/Icons";
import { RadarIcon, LayersIcon, NetworkIcon, DocumentChartIcon, GlobeIcon } from "../components/graphics/PointIcons";
import FilmReel from "../components/FilmReel";
import ServiceIcon from "../components/graphics/ServiceIcons";
import { ButtonLink, SectionHeading, StatusBadge, focusRing } from "../components/ui";
import { sectorVideos, sectorPosters } from "../data/media";
import InViewVideo from "../components/InViewVideo";
import {
  homeFilm,
  whoWeAre,
  services,
  sectors,
  howWeWork,
  featuredCapability,
  demonstrations,
  illustrativeCaption,
  whyChooseUs,
  contactInvitation,
} from "../data/content";

const PROCESS_ICONS = [RadarIcon, LayersIcon, NetworkIcon, DocumentChartIcon];

function FilmSection() {
  return (
    <section aria-labelledby="film-heading" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="mx-auto mb-10 max-w-3xl text-center">
        <h2 id="film-heading" className="font-heading text-3xl font-bold text-navy sm:text-4xl">
          {homeFilm.heading}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-grey-dark/70">{homeFilm.body}</p>
      </Reveal>
      <Reveal>
        <FilmReel />
      </Reveal>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section id="who-we-are" className="scroll-mt-4 bg-grey-light py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <Reveal>
          <SectionHeading index="01" label="Who we are" title={whoWeAre.heading} intro={whoWeAre.body} />
        </Reveal>
        <Reveal delay={0.1}>
          <ButtonLink to="/about">About Us</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

function CoreServices() {
  return (
    <section id="services" className="scroll-mt-4 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading index="02" label="Core services" title="Six services, one integrated approach" />
        </Reveal>
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="li" key={service.id} delay={(i % 3) * 0.06} className="h-full">
                <Link
                  to={`/competency#${service.id}`}
                  className={`group flex h-full flex-col rounded-2xl border border-grey-dark/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_0_0_4px_rgba(63,182,192,0.12),0_18px_40px_-16px_rgba(47,111,94,0.45)] focus-visible:shadow-[0_0_0_4px_rgba(63,182,192,0.12),0_18px_40px_-16px_rgba(47,111,94,0.45)] ${focusRing}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal/15 group-focus-visible:bg-teal/15">
                      <ServiceIcon id={service.id} delay={(i % 3) * 0.12} className="h-9 w-9" />
                    </span>
                    <span className="font-mono text-sm font-semibold text-teal">{service.number}</span>
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-navy">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-grey-dark/70">{service.card}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
                    View details
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <ButtonLink to="/competency">Explore Our Competency</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Sectors() {
  return (
    <section id="sectors" className="scroll-mt-4 bg-grey-light py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading index="03" label="Sectors we support" title="Insight for critical industries" />
        </Reveal>
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, i) => (
            <li key={sector.id}>
              <Link
                to={`/competency#${sector.id}`}
                className={`group relative block h-72 overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_4px_rgba(63,182,192,0.22),0_20px_44px_-16px_rgba(15,42,34,0.6)] focus-visible:shadow-[0_0_0_4px_rgba(63,182,192,0.22),0_20px_44px_-16px_rgba(15,42,34,0.6)] ${focusRing}`}
              >
                <InViewVideo
                  src={sectorVideos[sector.id]}
                  poster={sectorPosters[sector.id]}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/10" />
                <span className="absolute top-5 left-5 flex h-14 w-14 items-center justify-center rounded-xl bg-navy/60 text-white shadow-lg ring-1 ring-white/25 backdrop-blur-sm transition-colors duration-300 group-hover:bg-teal/80 group-hover:ring-azure/60 group-focus-visible:bg-teal/80 group-focus-visible:ring-azure/60">
                  <ServiceIcon id={sector.id} delay={(i % 3) * 0.12} className="h-9 w-9" />
                </span>
                <div className="relative flex h-full flex-col justify-end p-6">
                  <h3 className="font-heading text-lg font-semibold text-white">{sector.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{sector.card}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-azure">
                    Learn more <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HowWeWork() {
  return (
    <section id="how-we-work" className="scroll-mt-4 py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading index="04" label="How we work" title="From requirement to decision-ready outputs" />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <ProcessWorkflow steps={howWeWork} icons={PROCESS_ICONS} />
        </Reveal>
        <div className="mt-12">
          <ButtonLink to="/competency" variant="secondary">Explore Our Competency</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function SelectedWork() {
  return (
    <section id="selected-work" className="scroll-mt-4 bg-navy py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            index="05"
            label="Selected projects / applications"
            title="Capabilities in practice"
            dark
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <article className="relative h-full min-h-80 overflow-hidden rounded-2xl">
              <img src={cityNight} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20" />
              <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone="light">Featured capability</StatusBadge>
                  <StatusBadge tone="amberOnDark">{featuredCapability.status}</StatusBadge>
                </div>
                <h3 className="mt-4 font-heading text-2xl font-semibold">{featuredCapability.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">
                  {featuredCapability.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {featuredCapability.points.map((p) => (
                    <li key={p} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[11px] text-white/50">Illustrative image.</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <StatusBadge tone="light">Demonstrations</StatusBadge>
              <h3 className="mt-4 font-heading text-lg font-semibold">Satellite imagery applications</h3>
              <ul className="mt-4 flex-1 space-y-4">
                {demonstrations.map((d) => (
                  <li key={d.title} className="flex gap-3">
                    <GlobeIcon className="mt-0.5 h-5 w-5 shrink-0 text-azure" />
                    <span>
                      <span className="block text-sm font-semibold">{d.title}</span>
                      <span className="block text-sm text-white/65">{d.theme}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-white/50">{illustrativeCaption}</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-10">
          <ButtonLink to="/projects" variant="light">View All Projects</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function WhySarthi() {
  return (
    <section id="why-sarthi" className="scroll-mt-4 py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading index="06" label="Why Sarthi AI" title="What you can expect from us" center />
        </Reveal>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {whyChooseUs.map((item, i) => (
            <Reveal
              as="li"
              key={item}
              delay={(i % 2) * 0.08}
              className="flex h-full items-center gap-4 rounded-2xl bg-grey-light p-5"
            >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-grey-dark">{item}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContactInvitation() {
  return (
    <section id="contact-invitation" className="scroll-mt-4 px-4 pb-20 sm:px-6 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-teal px-6 py-16 text-center text-white sm:px-12">
        <ContourLines opacity={0.12} />
        <div className="relative">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">{contactInvitation.heading}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            {contactInvitation.body}
          </p>
          <div className="mt-8">
            <ButtonLink to="/contact" variant="light">Discuss Your Project</ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <BrandIntro />
      <FilmSection />
      <WhoWeAre />
      <CoreServices />
      <Sectors />
      <HowWeWork />
      <SelectedWork />
      <WhySarthi />
      <ContactInvitation />
    </>
  );
}
