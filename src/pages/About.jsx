import PageHero from "../components/PageHero";
import Reveal from "../components/graphics/Reveal";
import { GlobeIcon, PrecisionIcon } from "../components/graphics/PointIcons";
import { ButtonLink, SectionHeading } from "../components/ui";
import earthIndia from "../assets/photos/earth-india.jpg";
import droneMountains from "../assets/photos/drone-mountains.jpg";
import forestCanopy from "../assets/photos/forest-canopy.jpg";
import { company } from "../data/content";

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="About Sarthi AI Solutions"
        description="Geospatial intelligence. Real-world impact."
      />

      {/* Company overview */}
      <section id="overview" className="scroll-mt-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <SectionHeading index="01" label="Who we are" title="A geospatial intelligence and technology company" />
            <p className="mt-6 text-base leading-relaxed text-grey-dark/75">{company.about}</p>
            <div className="mt-8">
              <ButtonLink to="/competency">Explore Our Competency</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <img
              src={earthIndia}
              alt="Satellite view of the Indian subcontinent"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
            />
          </Reveal>
        </div>
      </section>

      {/* Vision and mission */}
      <section id="vision-mission" className="scroll-mt-6 bg-grey-light py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="h-full">
            <div className="h-full rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <GlobeIcon className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-xl font-bold text-navy">Our Vision</h2>
              <p className="mt-4 leading-relaxed text-grey-dark/75">{company.vision}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <div className="h-full rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <PrecisionIcon className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-xl font-bold text-navy">Our Mission</h2>
              <p className="mt-4 leading-relaxed text-grey-dark/75">{company.mission}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="scroll-mt-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="lg:order-2">
            <SectionHeading index="02" label="Our approach" title="Data, context and technology, together" />
            <p className="mt-6 text-base leading-relaxed text-grey-dark/75">{company.approach}</p>
            <div className="mt-8">
              <ButtonLink to="/projects" variant="secondary">View Projects</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <img
              src={droneMountains}
              alt="Drone surveying mountainous terrain"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
            />
          </Reveal>
        </div>
      </section>

      {/* Sustainability banner */}
      <section id="sustainability" className="relative scroll-mt-6 overflow-hidden py-24 text-white">
        <img src={forestCanopy} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy/80" />
        <Reveal className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <SectionHeading label="Commitment to sustainability" title="Responsible development, by design" dark center />
          <p className="mt-6 text-lg leading-relaxed text-white/80">{company.sustainability}</p>
          <div className="mt-8">
            <ButtonLink to="/contact" variant="light">Discuss Your Project</ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
