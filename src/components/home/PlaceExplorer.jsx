import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { imageryExamples } from "../../data/pages";
import { home } from "../../data/content";
import { Reveal } from "../motion";
import { SectionHead } from "./parts";
import locator from "../../assets/places/south-asia-locator.jpg";
import bhopal from "../../assets/places/bhopal.jpg";

// Bounds of the locator image (Web Mercator crop of NASA Blue Marble).
const B = { west: 64, east: 100, north: 38, south: 4 };
const my = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const pos = (lat, lon) => ({
  left: `${((lon - B.west) / (B.east - B.west)) * 100}%`,
  top: `${((my(B.north) - my(lat)) / (my(B.north) - my(B.south))) * 100}%`,
});

const PLACES = [
  { id: "bhopal", label: "Bhopal", theme: "Where we are based", lat: 23.26, lon: 77.41, image: bhopal, captured: "Sentinel-2 cloudless 2016 by EOX (CC BY 4.0)" },
  { id: "bhadla", scene: "Bhadla Solar Park, Rajasthan", label: "Bhadla Solar Park", lat: 27.53, lon: 71.92 },
  { id: "delhi", scene: "Delhi and the Yamuna River", label: "Delhi", lat: 28.61, lon: 77.25 },
  { id: "singrauli", scene: "Singrauli coalfield", label: "Singrauli", lat: 24.2, lon: 82.67 },
  { id: "bathinda", scene: "Punjab plains near Bathinda", label: "Punjab plains", lat: 30.21, lon: 74.95 },
  { id: "majuli", scene: "Brahmaputra River at Majuli", label: "Majuli", lat: 26.95, lon: 94.17 },
  { id: "sundarbans", scene: "Sundarbans", label: "Sundarbans", lat: 21.95, lon: 89.18 },
  { id: "mumbai", scene: "Mumbai and Thane Creek", label: "Mumbai", lat: 19.1, lon: 72.95 },
].map((p) => {
  const ex = p.scene && imageryExamples.find((e) => e.title === p.scene);
  return ex ? { ...p, theme: ex.theme, image: ex.image, captured: `Sentinel-2 · ${ex.captured}` } : p;
});

const ROTATE_MS = 6000;
const coords = (p) => `${p.lat.toFixed(2)}° N · ${p.lon.toFixed(2)}° E`;

// Pick a place on the locator (or from the list) and its satellite scene fills the frame.
// While on screen it moves through the places on its own; picking one stops that.
export default function PlaceExplorer() {
  const copy = home.explore;
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const auto = !reduce && !stopped && !paused && inView;

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % PLACES.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [auto, idx]);

  const pick = (i) => {
    setStopped(true);
    setIdx(i);
  };
  const p = PLACES[idx];

  return (
    <section ref={ref} aria-labelledby="explore-heading" className="bg-surface py-16 lg:py-24">
      <div className="container-page" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <SectionHead id="explore-heading" eyebrow={copy.eyebrow} title={copy.title} body={copy.body} />

        <Reveal className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8" y={16}>
          {/* Locator */}
          <div className="min-w-0 lg:col-span-4">
            <div className="relative mx-auto aspect-[819/845] max-w-sm overflow-hidden rounded-xl ring-1 ring-ink/10 lg:max-w-none">
              <img src={locator} alt="" className="absolute inset-0 h-full w-full object-cover" />
              {PLACES.map((pl, i) => {
                const on = i === idx;
                return (
                  <button
                    key={pl.id}
                    type="button"
                    onClick={() => pick(i)}
                    aria-label={`Show ${pl.label}`}
                    aria-pressed={on}
                    style={pos(pl.lat, pl.lon)}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full p-2 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
                  >
                    <span className={`relative block rounded-full border-2 border-ink transition-all ${on ? "h-4 w-4 bg-brand-light" : "h-3 w-3 bg-white group-hover:bg-brand-light"}`}>
                      {on && !reduce && <span className="absolute -inset-1 animate-ping rounded-full bg-brand-light/70" />}
                    </span>
                    {on && (
                      <span className="absolute top-1/2 left-full ml-1 -translate-y-1/2 rounded bg-ink/85 px-2 py-0.5 font-mono text-[11px] whitespace-nowrap text-white">
                        {pl.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {/* Same places as a list, for keyboard and screen-reader users and small screens */}
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Places">
              {PLACES.map((pl, i) => (
                <li key={pl.id}>
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    aria-pressed={i === idx}
                    className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                      i === idx ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-ink/10 hover:ring-brand"
                    }`}
                  >
                    {pl.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Scene */}
          <figure className="min-w-0 lg:col-span-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink sm:aspect-[16/10]">
              <AnimatePresence initial={false}>
                <motion.img
                  key={p.id}
                  src={p.image}
                  alt={`Satellite image: ${p.label}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={reduce ? false : { opacity: 0, scale: 1.12 }}
                  animate={{ opacity: 1, scale: 1.02 }}
                  exit={{ opacity: 0 }}
                  transition={{ opacity: { duration: 0.8 }, scale: { duration: reduce ? 0 : ROTATE_MS / 1000 + 1, ease: "easeOut" } }}
                />
              </AnimatePresence>
              {/* map-sheet frame */}
              <span aria-hidden="true" className="pointer-events-none absolute inset-0">
                <span className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-[size:12.5%_20%]" />
                {["top-4 left-4 border-t-2 border-l-2", "top-4 right-4 border-t-2 border-r-2", "bottom-4 left-4 border-b-2 border-l-2", "right-4 bottom-4 border-r-2 border-b-2"].map((c) => (
                  <span key={c} className={`absolute h-4 w-4 border-white/90 ${c}`} />
                ))}
                <span className="absolute top-1/2 left-1/2 h-7 w-px -translate-1/2 bg-white/90" />
                <span className="absolute top-1/2 left-1/2 h-px w-7 -translate-1/2 bg-white/90" />
              </span>
              <span className="absolute top-4 left-1/2 -translate-x-1/2 rounded bg-ink/85 px-2 py-1 font-mono text-[11px] whitespace-nowrap text-white">
                {coords(p)}
              </span>
              {/* progress while it moves on its own */}
              {auto && (
                <span className="absolute inset-x-0 bottom-0 h-1 bg-white/20" aria-hidden="true">
                  <span key={idx} className="block h-full origin-left bg-brand-light" style={{ animation: `tab-progress ${ROTATE_MS}ms linear forwards` }} />
                </span>
              )}
            </div>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1" aria-live="polite">
              <span>
                <span className="block text-xl font-semibold text-ink">{p.label}</span>
                <span className="text-graphite">{p.theme}</span>
              </span>
              <span className="font-mono text-xs text-muted">{p.captured}</span>
            </figcaption>
          </figure>
        </Reveal>
        <p className="mt-8 font-mono text-xs text-muted">{copy.credit}</p>
      </div>
    </section>
  );
}
