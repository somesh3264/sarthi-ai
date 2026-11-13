import { useEffect, useRef, useState } from "react";
import poster from "../assets/photos/earth-to-bhopal-poster.jpg";
import film1080 from "../assets/video/earth-to-bhopal-1080.mp4";
import film720 from "../assets/video/earth-to-bhopal-720.mp4";

// Earth-to-Bhopal film (blueprint, Home section 02).
// Plays only while in view, muted (the film has no soundtrack), loops, has a pause control
// and falls back to a poster with descriptive text if the video cannot load.
const DESCRIPTION =
  "A short film zooming from Earth to Asia, India, Madhya Pradesh and Bhopal's Upper Lake, ending on the Sarthi AI logo.";

const CREDIT =
  "Imagery: NASA Earth Observatory (Blue Marble) · Contains modified Copernicus Sentinel data";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function FilmReel() {
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [userPaused, setUserPaused] = useState(() => prefersReducedMotion());
  const [failed, setFailed] = useState(false);
  // Lighter 720p file for phones; chosen once on mount (source `media` isn't supported everywhere).
  const [src] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches ? film720 : film1080,
  );

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
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing]);

  return (
    <figure className="mx-auto max-w-6xl">
      <div
        ref={frameRef}
        className="relative aspect-video overflow-hidden rounded-3xl bg-navy shadow-[0_30px_80px_-30px_rgba(15,42,34,0.6)] ring-1 ring-navy/10"
      >
        {failed ? (
          <img src={poster} alt={DESCRIPTION} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={DESCRIPTION}
            src={src}
            onError={() => setFailed(true)}
          />
        )}

        {!failed && (
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            className="absolute right-4 bottom-4 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure sm:right-6 sm:bottom-6"
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
      <figcaption className="mt-3 text-center text-xs leading-relaxed text-grey-dark/55">
        <span className="sr-only">{DESCRIPTION} </span>
        {CREDIT}
      </figcaption>
    </figure>
  );
}
