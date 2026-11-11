import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import logo from "../assets/sarthi-logo.svg";
import ContourLines from "./graphics/ContourLines";
import { focusRing } from "./ui";
import { company } from "../data/content";

// Homepage section 01 (blueprint): the logo and company name animate in and float away, then the
// main line appears and floats up, then the short introduction settles below it.
// Skippable and replayable; visitors who prefer reduced motion get the final, static view.
const STAGE_MS = [2200, 2600]; // logo stage, line stage (includes the logo's 0.8s exit)
const FINAL = 2;

function Line({ className = "" }) {
  return (
    <>
      We turn Geospatial Data into Resilient{" "}
      <span className={`font-serif-accent font-normal italic text-azure ${className}`}>Decisions</span>.
    </>
  );
}

export default function BrandIntro() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(reduce ? FINAL : 0);

  useEffect(() => {
    if (reduce) setStage(FINAL);
  }, [reduce]);

  useEffect(() => {
    if (stage >= FINAL) return;
    const t = setTimeout(() => setStage((s) => s + 1), STAGE_MS[stage]);
    return () => clearTimeout(t);
  }, [stage]);

  const playing = stage < FINAL;

  return (
    <section
      aria-labelledby="intro-heading"
      className="relative flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-navy"
    >
      <ContourLines opacity={0.18} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(63,182,192,0.22),_transparent_60%)]" />

      <div className="relative mx-auto flex min-h-[22rem] w-full max-w-5xl flex-col items-center justify-center px-6 py-24 text-center lg:px-8">
        {/* The heading is always present for screen readers and search engines. */}
        {stage === 0 && (
          <h1 id="intro-heading" className="sr-only">
            We turn Geospatial Data into Resilient Decisions.
          </h1>
        )}

        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="logo"
              aria-hidden="true"
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -60, scale: 0.96 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="rounded-2xl bg-white/90 px-6 py-4 shadow-lg">
                <img src={logo} alt="" className="h-24 w-auto sm:h-28" />
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/75">
                {company.name}
              </p>
            </motion.div>
          )}

          {stage >= 1 && (
            <motion.div key="line" className="flex flex-col items-center">
              <motion.h1
                id="intro-heading"
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-heading text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
              >
                <Line />
              </motion.h1>
              {stage === FINAL && (
                <motion.p
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                  className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
                >
                  {company.intro}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!reduce && (
        <button
          type="button"
          onClick={() => setStage(playing ? FINAL : 0)}
          className={`absolute right-4 bottom-4 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-6 sm:bottom-6 ${focusRing}`}
        >
          {playing ? "Skip intro" : "Replay intro"}
        </button>
      )}
    </section>
  );
}
