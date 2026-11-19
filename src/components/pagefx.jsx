import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import ContourLines from "./graphics/ContourLines";
import { Eyebrow } from "./home/parts";
import { Reveal } from "./motion";

/* Motion pieces shared by the inner pages (About, Projects), in the homepage's style.
   Every piece falls back to a still, readable layout for visitors who prefer reduced motion. */

// Map-sheet frame drawn over imagery: faint grid, corner ticks and a centre crosshair.
export function MapSheet({ grid = true }) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      {grid && (
        <span className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-[size:12.5%_20%]" />
      )}
      {["top-4 left-4 border-t-2 border-l-2", "top-4 right-4 border-t-2 border-r-2", "bottom-4 left-4 border-b-2 border-l-2", "right-4 bottom-4 border-r-2 border-b-2"].map((c) => (
        <span key={c} className={`absolute h-4 w-4 border-white/90 ${c}`} />
      ))}
      <span className="absolute top-1/2 left-1/2 h-7 w-px -translate-1/2 bg-white/90" />
      <span className="absolute top-1/2 left-1/2 h-px w-7 -translate-1/2 bg-white/90" />
    </span>
  );
}

// Split page hero: text on the left, a slideshow of satellite scenes on the right that
// crossfade and slowly zoom, like a camera passing over the ground.
export function MediaHero({ eyebrow, title, body, slides, children, interval = 5500, first = 2200 }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const cycled = useRef(false);
  useEffect(() => {
    if (reduce || slides.length < 2) return;
    // The first scene moves on quickly so the motion is noticed straight away.
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), i === 0 && !cycled.current ? first : interval);
    if (i === slides.length - 1) cycled.current = true;
    return () => clearTimeout(t);
  }, [i, reduce, slides.length, interval, first]);
  const s = slides[i];

  return (
    <section className="relative overflow-hidden bg-white text-ink">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,var(--color-brand-tint),transparent_60%)] lg:w-1/2" />
      <ContourLines opacity={0.35} className="text-brand-light lg:w-1/2" />
      <div className="container-page relative grid lg:min-h-[min(calc(100svh-4.5rem),38rem)] lg:grid-cols-12">
        <Reveal className="flex flex-col justify-center py-12 sm:py-20 lg:col-span-5 lg:py-20 lg:pr-10" y={16}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 font-heading text-[2.4rem] leading-[1.06] font-light text-ink sm:text-[3.4rem] lg:text-[3.75rem]">{title}</h1>
          {body && <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite sm:text-lg">{body}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </div>
      <div className="relative h-[22rem] overflow-hidden bg-ink sm:h-[28rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[54%]">
        <AnimatePresence>
          <motion.img
            key={s.src}
            src={s.src}
            alt={s.alt || ""}
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduce ? false : { opacity: i === 0 && !cycled.current ? 1 : 0, scale: 1.14 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1 }, scale: { duration: reduce ? 0 : (i === 0 && !cycled.current ? first : interval) / 1000 + 1.2, ease: "easeOut" } }}
          />
        </AnimatePresence>
        <MapSheet />
        {s.coords && (
          <span className="absolute top-4 left-1/2 -translate-x-1/2 rounded bg-ink/85 px-2 py-1 font-mono text-[11px] whitespace-nowrap text-white">{s.coords}</span>
        )}
        <div className="absolute right-0 bottom-0 left-0 flex items-center justify-between gap-4 bg-ink/85 px-4 py-3 font-mono text-[11px] text-white/80 sm:px-5" aria-live="polite">
          <span className="truncate">
            <span className="font-medium text-white">{s.label}</span>
            {s.note && (
              <>
                <span className="mx-2 text-white/40">·</span>
                {s.note}
              </>
            )}
          </span>
          {slides.length > 1 && (
            <span className="flex shrink-0 gap-1.5" aria-hidden="true">
              {slides.map((x, k) => (
                <span key={x.src} className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-5 bg-brand-light" : "w-1.5 bg-white/40"}`} />
              ))}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

// An exploded stack of map layers that separates as it scrolls through the screen, each layer
// labelled. On phones and for reduced motion the layers sit fanned out without scroll linking.
export function LayerStack({ layers }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const spread = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const n = layers.length;

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[34rem] [perspective:1600px]" aria-hidden="true">
      {layers.map((l, k) => (
        <Plate key={l.label} layer={l} k={k} n={n} spread={spread} reduce={reduce} />
      ))}
    </div>
  );
}

function Plate({ layer, k, n, spread, reduce }) {
  // k = 0 is the bottom plate
  const lift = useTransform(spread, (v) => `${-(k - (n - 1) / 2) * 22 * v}%`);
  const fade = useTransform(spread, (v) => 0.55 + 0.45 * Math.min(1, v * 1.4));
  const y = reduce ? `${-(k - (n - 1) / 2) * 22}%` : lift;
  return (
    <motion.div className="absolute top-[30%] right-[34%] left-[2%] aspect-[1400/960] sm:right-[24%] sm:left-[8%]" style={{ y, opacity: reduce ? 1 : fade, zIndex: k }}>
      <div className="h-full w-full [transform:rotateX(58deg)_rotateZ(-38deg)] [transform-style:preserve-3d]">
        <img src={layer.src} alt="" className="h-full w-full rounded-md object-cover shadow-[0_18px_40px_-12px_rgba(15,51,36,0.55)] ring-1 ring-white/60" />
      </div>
      <span className="absolute top-1/2 -right-1 flex translate-x-full -translate-y-1/2 items-center gap-1.5 whitespace-nowrap sm:-right-4 sm:gap-2">
        <span className="h-px w-4 bg-ink/40 sm:w-6" />
        <span className="font-mono text-[10px] font-medium text-ink sm:text-[11px]">{layer.label}</span>
      </span>
    </motion.div>
  );
}

// A statement whose words light up one by one as it scrolls through the middle of the screen.
export function ScrollWords({ text, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  if (reduce) return <p ref={ref} className={className}>{text}</p>;
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

// Numbered steps joined by a line that draws itself from one step to the next.
export function DrawnSteps({ steps }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });
  const on = reduce || inView;
  return (
    <ol ref={ref} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {steps.map((s, i) => (
        <li key={s.label}>
          <div className="flex items-center gap-3" aria-hidden="true">
            <motion.span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs font-semibold text-white"
              initial={reduce ? false : { scale: 0 }}
              animate={on ? { scale: [0, 1.25, 1] } : {}}
              transition={{ duration: 0.5, delay: i * 0.35 }}
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>
            <span className="relative h-px flex-1 bg-ink/10">
              <motion.span
                className="absolute inset-0 origin-left bg-brand"
                initial={reduce ? false : { scaleX: 0 }}
                animate={on ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.35 + 0.25, ease: "easeOut" }}
              />
            </span>
          </div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={on ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.35 + 0.1 }}
          >
            <h3 className="mt-5 text-xl font-semibold text-ink">{s.label}</h3>
            <p className="mt-2 leading-relaxed text-graphite">{s.body}</p>
          </motion.div>
        </li>
      ))}
    </ol>
  );
}

// Full-width photo band whose image moves slower than the page (parallax).
export function ParallaxBand({ src, children, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img src={src} alt="" aria-hidden="true" loading="lazy" style={reduce ? undefined : { y }} className="absolute inset-x-0 -top-[14%] h-[128%] w-full object-cover" />
      {children}
    </section>
  );
}
