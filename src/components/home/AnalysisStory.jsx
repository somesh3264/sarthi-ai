import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { home } from "../../data/content";
import { SectionHead } from "./parts";
import imagery from "../../assets/story/imagery.jpg";
import terrain from "../../assets/story/terrain.jpg";
import landcover from "../../assets/story/landcover.jpg";
import constraints from "../../assets/story/constraints.jpg";
import suitability from "../../assets/story/suitability.jpg";

const LAYERS = [imagery, terrain, landcover, constraints, suitability];

// A map frame stays pinned while the steps scroll past; each step adds one layer of the
// analysis, like a story map. Visitors who prefer reduced motion get instant switches.
export default function AnalysisStory() {
  const copy = home.story;
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setStep(Number(e.target.dataset.step));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = copy.steps[step];

  return (
    <section aria-labelledby="story-heading" className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead id="story-heading" eyebrow={copy.eyebrow} title={copy.title} body={copy.body} />

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          {/* Pinned map frame: on top on phones, on the right on desktop */}
          <div className="sticky top-[4.75rem] z-10 -mx-5 bg-white px-5 pb-3 sm:-mx-8 sm:px-8 lg:order-2 lg:col-span-7 lg:top-28 lg:mx-0 lg:self-start lg:bg-transparent lg:px-0 lg:pb-0">
            <figure>
              <div className="relative aspect-[1400/960] overflow-hidden rounded-xl border border-line bg-surface">
                {LAYERS.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={i === step ? `${copy.steps[i].label}: illustrative map of an area west of Bhopal` : ""}
                    aria-hidden={i === step ? undefined : "true"}
                    loading={i === 0 ? "eager" : "lazy"}
                    className={`absolute inset-0 h-full w-full object-cover ${reduce ? "" : "transition-opacity duration-700 ease-out"} ${
                      i <= step ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <span className="absolute top-3 left-3 rounded bg-ink/85 px-2 py-1 font-mono text-[11px] font-medium text-white">
                  {String(step + 1).padStart(2, "0")} / {String(copy.steps.length).padStart(2, "0")} · {current.label}
                </span>
                <span className="absolute top-3 right-3 rounded bg-white/90 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink">
                  Illustrative
                </span>
                {current.legend.length > 0 && (
                  <ul className="absolute right-3 bottom-3 hidden flex-col gap-1.5 rounded-md bg-white/92 px-3 py-2.5 text-xs text-ink shadow-sm sm:flex">
                    {current.legend.map((l) => (
                      <li key={l.name} className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-sm ring-1 ring-ink/15" style={{ background: l.color }} aria-hidden="true" />
                        {l.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* progress */}
              <div className="mt-3 flex gap-1.5" aria-hidden="true">
                {copy.steps.map((s, i) => (
                  <span key={s.label} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-brand" : "bg-line"}`} />
                ))}
              </div>
              <figcaption className="mt-3 hidden font-mono text-[11px] leading-relaxed text-muted lg:block">{copy.note}</figcaption>
            </figure>
          </div>

          {/* Steps */}
          <ol className="lg:order-1 lg:col-span-5">
            {copy.steps.map((s, i) => (
              <li
                key={s.label}
                ref={(el) => (refs.current[i] = el)}
                data-step={i}
                className="flex min-h-[55vh] flex-col justify-center py-8 lg:min-h-[75vh] lg:py-0"
              >
                <div className={`border-l-2 pl-6 transition-colors duration-500 ${i === step ? "border-brand" : "border-line"}`}>
                  <p className="font-mono text-xs font-medium text-brand">Layer {String(i + 1).padStart(2, "0")}</p>
                  <h3 className={`mt-2 text-2xl font-semibold transition-colors duration-500 ${i === step ? "text-ink" : "text-ink/45"}`}>{s.label}</h3>
                  <p className={`mt-3 max-w-md leading-relaxed transition-colors duration-500 ${i === step ? "text-graphite" : "text-graphite/50"}`}>{s.body}</p>
                  {s.legend.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted sm:hidden">
                      {s.legend.map((l) => (
                        <li key={l.name} className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: l.color }} aria-hidden="true" />
                          {l.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-6 font-mono text-[11px] leading-relaxed text-muted lg:hidden">{copy.note}</p>
      </div>
    </section>
  );
}
