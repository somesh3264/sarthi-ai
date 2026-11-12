import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Decorative looping video that loads nothing until it nears the viewport, plays while visible
// and pauses when scrolled away. Visitors who prefer reduced motion see the poster image instead.
export default function InViewVideo({ src, poster, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [load, setLoad] = useState(false);

  // Watch visibility; attach the video file the first time the card comes near the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setLoad(true);
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  // Play only once the file is attached (it renders after `load` flips), pause when out of view.
  useEffect(() => {
    const el = ref.current;
    if (!el || !load) return;
    if (inView) el.play().catch(() => {});
    else el.pause();
  }, [inView, load]);

  if (reduce) {
    return <img src={poster} alt="" aria-hidden="true" loading="lazy" className={className} />;
  }

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={poster}
      autoPlay={load && inView}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={className}
    />
  );
}
