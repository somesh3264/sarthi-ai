import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/graphics/Reveal";
import ProcessWorkflow from "../components/graphics/ProcessWorkflow";
import {
  LayersIcon,
  CpuIcon,
  TrendingUpIcon,
  LeafIcon,
  GlobeIcon,
  RadarIcon,
  NetworkIcon,
  DocumentChartIcon,
  PeopleIcon,
} from "../components/graphics/PointIcons";
import { ButtonLink, SampleNote, SectionHeading, StatusBadge, focusRing } from "../components/ui";
import aiDataStreams from "../assets/photos/ai-data-streams.jpg";
import {
  careersHero,
  whyWorkWithUs,
  careerAreas,
  openings,
  internshipAreas,
  applicationSteps,
} from "../data/pages";

const VALUE_ICONS = [GlobeIcon, CpuIcon, TrendingUpIcon, LeafIcon];
const AREA_ICONS = [GlobeIcon, RadarIcon, CpuIcon, LayersIcon, LeafIcon];
const STEP_ICONS = [PeopleIcon, DocumentChartIcon, NetworkIcon, CheckCircle];
const FILTERS = ["All", "Full-time", "Internship"];

function CheckCircle({ className }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.8 10.2l2.2 2.2 4.2-4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <img src={aiDataStreams} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-azure">Careers</p>
        <h1 className="mt-3 max-w-2xl font-heading text-4xl font-bold sm:text-5xl">{careersHero.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">{careersHero.body}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink to="#openings" variant="light">Explore Opportunities</ButtonLink>
          <Link
            to="/careers/apply"
            className={`inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 ${focusRing}`}
          >
            Submit Your Resume
          </Link>
        </div>
      </div>
    </section>
  );
}

function OpeningCard({ job }) {
  return (
    <li className="flex flex-col rounded-2xl border border-grey-dark/10 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge tone="teal">{job.type}</StatusBadge>
        <StatusBadge>{job.status}</StatusBadge>
        {job.sample && <StatusBadge tone="sample">Sample</StatusBadge>}
      </div>
      <h3 className="mt-3 font-heading text-lg font-semibold text-navy">{job.title}</h3>
      <p className="text-xs text-grey-dark/60">{job.area}</p>
      <p className="mt-2 text-xs text-grey-dark/70">
        {[job.location, job.mode, job.experience].filter(Boolean).join(" · ")}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-grey-dark/75">{job.summary}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <ButtonLink to={`/careers/apply?position=${job.id}`}>Apply Now</ButtonLink>
        <Link
          to={`/careers/${job.id}`}
          className={`rounded-full px-4 py-3 text-sm font-semibold text-navy underline-offset-4 hover:underline ${focusRing}`}
        >
          View Details<span className="sr-only">: {job.title}</span>
        </Link>
      </div>
    </li>
  );
}

function Openings() {
  const [filter, setFilter] = useState("All");
  const visible = openings.filter((j) => filter === "All" || j.type === filter);

  return (
    <section id="openings" className="scroll-mt-6 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading index="03" label="Current openings" title="Open positions" />
        </Reveal>

        {openings.length === 0 ? (
          <Reveal className="mt-10 rounded-3xl border border-dashed border-grey-dark/20 bg-grey-light p-8 text-center sm:p-12">
            <h3 className="font-heading text-xl font-semibold text-navy">No Current Openings</h3>
            <p className="mx-auto mt-3 max-w-xl text-base text-grey-dark/75">
              We don't have active vacancies right now, but we're interested in connecting with
              talented people.
            </p>
            <div className="mt-6">
              <ButtonLink to="/careers/apply">Submit Your Resume</ButtonLink>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-xs text-grey-dark/60">
              With your consent, we may keep your application on file for future opportunities, as
              described in our{" "}
              <Link to="/recruitment-privacy" className={`underline underline-offset-2 ${focusRing}`}>
                Recruitment Privacy Notice
              </Link>
              .
            </p>
          </Reveal>
        ) : (
          <>
            {openings.some((j) => j.sample) && (
              <SampleNote className="mt-8">
                <strong>Sample vacancies</strong> are shown to preview the layout. They are not open positions.
              </SampleNote>
            )}
            <div role="group" aria-label="Filter openings" className="mt-6 flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${focusRing} ${
                    filter === f ? "bg-navy text-white" : "bg-grey-light text-grey-dark hover:bg-grey-dark/10"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            {visible.length ? (
              <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visible.map((job) => (
                  <OpeningCard key={job.id} job={job} />
                ))}
              </ul>
            ) : (
              <p className="mt-8 text-grey-dark/70">No {filter.toLowerCase()} openings right now.</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default function Careers() {
  return (
    <>
      <Hero />

      <section id="why-sarthi-careers" className="scroll-mt-6 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <SectionHeading index="01" label="Why work with Sarthi AI?" title="Meaningful work with emerging technology" />
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyWorkWithUs.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <Reveal as="li" key={v.title} delay={i * 0.06} className="rounded-2xl bg-grey-light p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-navy">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-grey-dark/70">{v.body}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="career-areas" className="scroll-mt-6 bg-grey-light py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              index="02"
              label="Career areas"
              title="Where you could contribute"
              intro="The kinds of roles and skills our work draws on. These are career areas, not open vacancies."
            />
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {careerAreas.map((a, i) => {
              const Icon = AREA_ICONS[i];
              return (
                <Reveal as="li" key={a.title} delay={(i % 3) * 0.06} className="rounded-2xl bg-white p-6 shadow-sm">
                  <Icon className="h-6 w-6 text-teal" />
                  <h3 className="mt-4 font-heading text-lg font-semibold text-navy">{a.title}</h3>
                  <p className="mt-2 text-sm text-grey-dark/80">{a.roles}</p>
                  <p className="mt-2 text-xs text-grey-dark/60">{a.skills}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <Openings />

      <section id="internships" className="scroll-mt-6 bg-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              index="04"
              label="Internship programme"
              title="Learn by working on real geospatial problems"
              intro="Areas where internships may be offered. Open internships are listed under Current openings when available."
              dark
            />
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {internshipAreas.map((it, i) => (
              <Reveal as="li" key={it.title} delay={i * 0.05} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-heading text-base font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{it.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="application-process" className="scroll-mt-6 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <SectionHeading index="05" label="Application process" title="How to apply" />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <ProcessWorkflow steps={applicationSteps} icons={STEP_ICONS} />
          </Reveal>
        </div>
      </section>

      <section id="general-application" className="scroll-mt-6 px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-6xl rounded-3xl bg-teal px-6 py-14 text-center text-white sm:px-12">
          <h2 className="font-heading text-3xl font-bold">Don't see the right role?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Send a general application and tell us where your skills could fit.
          </p>
          <div className="mt-8">
            <ButtonLink to="/careers/apply" variant="light">Submit Your Resume</ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
