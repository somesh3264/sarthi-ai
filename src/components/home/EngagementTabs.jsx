import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { home } from "../../data/content";
import { imageryExamples } from "../../data/pages";
import { sectorPosters, sectorVideos } from "../../data/media";
import { ArrowRightIcon } from "../Icons";
import { NeedsInput, SectionHead } from "./parts";

const ROTATE_MS = 8000;

// Tabbed switcher in the style of a customer-story carousel. It advances on its own while on
// screen, with a progress bar under the active tab, pauses on hover or focus and stops for good
// once the visitor picks a tab. Arrow keys move between tabs. No auto-advance for reduced motion.
export default function EngagementTabs() {
  const copy = home.engagements;
  const items = copy.items.map((it) => ({ ...it, image: imageryExamples.find((e) => e.title === it.scene)?.image }));
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const tabRefs = useRef([]);
  const base = useId();
  const auto = !reduce && !stopped && !paused && inView;

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % items.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [auto, idx, items.length]);

  const choose = (i, focus = false) => {
    setStopped(true);
    setIdx(i);
    if (focus) tabRefs.current[i]?.focus();
  };
  const onKey = (e) => {
    const n = items.length;
    if (e.key === "ArrowRight") choose((idx + 1) % n, true);
    else if (e.key === "ArrowLeft") choose((idx - 1 + n) % n, true);
    else if (e.key === "Home") choose(0, true);
    else if (e.key === "End") choose(n - 1, true);
    else return;
    e.preventDefault();
  };

  const it = items[idx];

  return (
    <section ref={ref} aria-labelledby="engagements-heading" className="bg-stone py-16 lg:py-24">
      <div className="container-page" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        <SectionHead id="engagements-heading" eyebrow={copy.eyebrow} title={copy.title} />

        <div role="tablist" aria-label="Example engagements" className="mt-10 grid grid-cols-3 border-b border-ink/15" onKeyDown={onKey}>
          {items.map((t, i) => {
            const on = i === idx;
            return (
              <button
                key={t.id}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={`${base}-tab-${i}`}
                aria-selected={on}
                aria-controls={`${base}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => choose(i)}
                className={`relative cursor-pointer px-1 pt-2 pb-4 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-base ${
                  on ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span className="font-mono text-xs font-medium text-brand">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-1 block">{t.tab}</span>
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-ink/10" aria-hidden="true">
                  {on && (
                    <span
                      key={`${idx}-${auto}`}
                      className="block h-full origin-left bg-brand"
                      style={auto ? { animation: `tab-progress ${ROTATE_MS}ms linear forwards` } : undefined}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${idx}`} className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={it.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <figure className="lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink">
                  {reduce ? (
                    <img src={sectorPosters[it.media]} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <video
                      src={sectorVideos[it.media]}
                      poster={sectorPosters[it.media]}
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-hidden="true"
                      className="h-full w-full object-cover"
                    />
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" aria-hidden="true" />
                  <span className="absolute top-3 left-3 rounded bg-white/90 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink">
                    Example engagement · illustrative
                  </span>
                  {/* The same kind of place, seen from orbit */}
                  {it.image && (
                    <span className="absolute right-3 bottom-3 w-[38%] overflow-hidden rounded-md bg-white p-1 shadow-lg">
                      <img src={it.image} alt={`Sentinel-2 image: ${it.scene}`} className="aspect-square w-full rounded-sm object-cover" />
                      <span className="block px-1 pt-1 font-mono text-[10px] leading-tight text-ink">From orbit · Sentinel-2</span>
                    </span>
                  )}
                  <span className="absolute bottom-3 left-3 max-w-[55%] font-mono text-[11px] leading-snug text-white">On the ground</span>
                </div>
                <figcaption className="mt-2 font-mono text-xs text-muted">Inset: {it.scene}</figcaption>
              </figure>
              <div className="lg:col-span-7">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand">The question</p>
                <p className="mt-3 font-heading text-2xl leading-snug font-normal text-ink sm:text-[1.9rem]">{it.question}</p>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand">The work</p>
                    <ul className="mt-3 space-y-2.5">
                      {it.work.map((w) => (
                        <li key={w} className="flex gap-2.5 leading-relaxed text-graphite">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand">What you get</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {it.deliver.map((d) => (
                        <li key={d} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-ink ring-1 ring-ink/10">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <NeedsInput className="mt-8 px-4 pt-5 pb-4">
                  <p className="text-sm text-muted">[ Result from a real project of this kind, for example time or cost saved, with the client's permission ]</p>
                </NeedsInput>
                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  Discuss a project like this <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
