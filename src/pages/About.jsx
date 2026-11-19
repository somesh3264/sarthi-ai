import { GlobeIcon, PrecisionIcon } from "../components/graphics/PointIcons";
import { ButtonLink } from "../components/ui";
import { Reveal } from "../components/motion";
import { Eyebrow, SectionHead } from "../components/home/parts";
import { DrawnSteps, LayerStack, MapSheet, MediaHero, ParallaxBand, ScrollWords } from "../components/pagefx";
import bhopal from "../assets/places/bhopal.jpg";
import earthIndia from "../assets/photos/earth-india.jpg";
import satDelhi from "../assets/satellite/delhi-yamuna.jpg";
import droneMountains from "../assets/photos/drone-mountains.jpg";
import forestCanopy from "../assets/photos/forest-canopy.jpg";
import imagery from "../assets/story/imagery.jpg";
import terrain from "../assets/story/terrain.jpg";
import landcover from "../assets/story/landcover.jpg";
import constraints from "../assets/story/constraints.jpg";
import suitability from "../assets/story/suitability.jpg";
import { company } from "../data/content";

const HERO_SLIDES = [
  { src: bhopal, label: "Bhopal, Madhya Pradesh", note: "Where we are based", coords: "23.26° N · 77.41° E", alt: "Satellite image of Bhopal" },
  { src: earthIndia, label: "The Indian subcontinent", note: "The ground we work across" },
  { src: satDelhi, label: "Delhi and the Yamuna River", note: "Sentinel-2 · Oct 2024", coords: "28.61° N · 77.25° E", alt: "Satellite image of Delhi" },
];

// What the company combines, shown as the layers of one analysis.
const STACK = [
  { src: imagery, label: "Remote sensing" },
  { src: terrain, label: "GIS and terrain" },
  { src: landcover, label: "AI classification" },
  { src: constraints, label: "Environment" },
  { src: suitability, label: "Decision support" },
];

const APPROACH = [
  { label: "Data", body: "Field data, satellite and aerial imagery, gathered and checked for the question at hand." },
  { label: "Context", body: "Environmental, regulatory and site context, so the numbers mean something on the ground." },
  { label: "Analysis", body: "Spatial analysis and intelligent technology turn the layers into findings." },
  { label: "Decision support", body: "Maps, reports, software and dashboards that help you evaluate options and act." },
];

export default function About() {
  return (
    <>
      <MediaHero
        eyebrow="About Sarthi AI Solutions"
        title="Geospatial intelligence. Real-world impact."
        body={company.intro}
        slides={HERO_SLIDES}
      >
        <ButtonLink to="/competency">Explore Our Competency</ButtonLink>
        <ButtonLink to="/contact" variant="secondary">Talk to us</ButtonLink>
      </MediaHero>

      {/* Who we are: the capabilities as the layers of one analysis */}
      <section id="overview" className="scroll-mt-20 overflow-hidden bg-white py-16 lg:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Who we are" title="A geospatial intelligence and technology company" />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-graphite">{company.about}</p>
            </Reveal>
          </div>
          <div className="min-w-0 lg:col-span-7 lg:pl-6">
            <LayerStack layers={STACK} />
            <p className="mt-2 text-center font-mono text-[11px] text-muted">One study, five layers: what we bring together on every project.</p>
          </div>
        </div>
      </section>

      {/* Vision, lit word by word, and mission */}
      <section id="vision-mission" className="scroll-mt-20 bg-brand-tint py-16 lg:py-24">
        <div className="container-page">
          <Eyebrow>Our vision</Eyebrow>
          <ScrollWords text={company.vision} className="mt-6 max-w-5xl font-heading text-3xl leading-[1.2] font-light text-ink sm:text-[2.75rem]" />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal className="h-full">
              <div className="h-full rounded-2xl bg-white p-8 transition-shadow duration-300 hover:shadow-[0_20px_44px_-24px_rgba(15,51,36,0.45)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-tint text-brand">
                  <PrecisionIcon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-ink">Our mission</h2>
                <p className="mt-4 leading-relaxed text-graphite">{company.mission}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="h-full rounded-2xl bg-white p-8 transition-shadow duration-300 hover:shadow-[0_20px_44px_-24px_rgba(15,51,36,0.45)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-tint text-brand">
                  <GlobeIcon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-ink">Where we work</h2>
                <p className="mt-4 leading-relaxed text-graphite">
                  Land, infrastructure, industry and the environment: from site selection and
                  environmental assessment to monitoring and disaster preparedness.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="scroll-mt-20 bg-white py-16 lg:py-24">
        <div className="container-page">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHead eyebrow="Our approach" title="Data, context and technology, together" body={company.approach} />
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                <img src={droneMountains} alt="Drone surveying mountainous terrain" loading="lazy" className="drift h-full w-full object-cover" />
                <MapSheet grid={false} />
              </div>
            </Reveal>
          </div>
          <div className="mt-14">
            <DrawnSteps steps={APPROACH} />
          </div>
          <div className="mt-12">
            <ButtonLink to="/projects" variant="secondary">View Projects</ButtonLink>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <ParallaxBand src={forestCanopy} className="scroll-mt-20 py-24 text-white lg:py-32">
        <div className="absolute inset-0 bg-ink/70" />
        <Reveal className="relative container-page max-w-3xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand-light">Commitment to sustainability</p>
          <h2 className="mt-4 font-heading text-3xl leading-[1.12] font-light sm:text-[2.6rem]">Responsible development, by design</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/85">{company.sustainability}</p>
          <div className="mt-8">
            <ButtonLink to="/contact" variant="light">Discuss Your Project</ButtonLink>
          </div>
        </Reveal>
      </ParallaxBand>
    </>
  );
}
