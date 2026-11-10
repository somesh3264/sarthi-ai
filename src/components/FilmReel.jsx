import { useEffect, useRef, useState } from "react";
import poster from "../assets/photos/earth-satellite.jpg";
import heroSatellite from "../assets/video/hero-satellite.mp4";
import heroAI from "../assets/video/hero-ai.mp4";
import heroEnvironment from "../assets/video/hero-environment.mp4";
import heroInfrastructure from "../assets/video/hero-infrastructure.mp4";

// Stand-in reel until the approved Earth-to-Bhopal film is supplied (blueprint, Home section 02).
// Plays only while in view, starts muted, has a pause control and a poster fallback.
const CLIPS = [
  { src: heroSatellite, label: "Satellite & GIS mapping" },
  { src: heroAI, label: "AI & data intelligence" },
  { src: heroEnvironment, label: "Environmental & disaster risk mapping" },
  { src: heroInfrastructure, label: "Infrastructure & engineering" },
];

const CROSSFADE_MS = 900;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function FilmReel() {
  const frameRef = useRef(null);
  const [current, setCurrent] = useState({ id: 0, index: 0 });
  const [incoming, setIncoming] = useState(null);
  const [incomingVisible, setIncomingVisible] = useState(false);
  const [inView, setInView] = useState(false);
  const [userPaused, setUserPaused] = useState(() => prefersReducedMotion());
  const [failed, setFailed] = useState(false);
  const nextId = useRef(1);

  const playing = inView && !userPaused && !failed;

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    frameRef.current?.querySelectorAll("video").forEach((v) => {
      if (playing) v.play().catch(() => {});
      else v.pause();
    });
  }, [playing, current, incoming]);

  useEffect(() => {
    if (!incoming) return;
    setIncomingVisible(false);
    const timer = setTimeout(() => setIncomingVisible(true), 30);
    return () => clearTimeout(timer);
  }, [incoming]);

  useEffect(() => {
    if (!incoming || !incomingVisible) return;
    const timer = setTimeout(() => {
      setCurrent(incoming);
      setIncoming(null);
    }, CROSSFADE_MS);
    return () => clearTimeout(timer);
  }, [incoming, incomingVisible]);

  const advance = () => {
    setIncoming({ id: nextId.current++, index: (current.index + 1) % CLIPS.length });
  };

  const activeIndex = incoming ? incoming.index : current.index;

  return (
    <figure className="mx-auto max-w-6xl">
      <div
        ref={frameRef}
        className="relative aspect-video overflow-hidden rounded-3xl bg-navy shadow-[0_30px_80px_-30px_rgba(15,42,34,0.6)] ring-1 ring-navy/10"
      >
        {failed ? (
          <img src={poster} alt="Satellite view of Earth" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <>
            <video
              key={current.id}
              className="absolute inset-0 h-full w-full object-cover"
              src={CLIPS[current.index].src}
              poster={poster}
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              onEnded={!incoming ? advance : undefined}
              onError={() => setFailed(true)}
            />
            {incoming && (
              <video
                key={incoming.id}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out ${
                  incomingVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
                src={CLIPS[incoming.index].src}
                muted
                playsInline
                aria-hidden="true"
              />
            )}
          </>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-4 sm:p-6">
          <span className="text-xs font-medium text-white/85 sm:text-sm">
            {CLIPS[activeIndex].label}
          </span>
          {!failed && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure"
              aria-label={userPaused ? "Play film" : "Pause film"}
            >
              {userPaused ? (
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M6 4.5v11l9-5.5-9-5.5z" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M5.5 4h3v12h-3zM11.5 4h3v12h-3z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
      <figcaption className="sr-only">
        A short film moving from satellite views of Earth to geospatial, AI, environmental and
        infrastructure mapping.
      </figcaption>
    </figure>
  );
}
