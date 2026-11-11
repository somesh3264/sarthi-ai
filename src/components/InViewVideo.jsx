import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Decorative looping video that loads nothing until it nears the viewport, plays only while
// visible, and shows its poster instead for visitors who prefer reduced motion.
export default function InViewVideo({ src, poster, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  if (reduce) {
    return <img src={poster} alt="" aria-hidden="true" loading="lazy" className={className} />;
  }

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={className}
    />
  );
}
