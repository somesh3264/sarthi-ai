import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

// Fades and lifts its children into place the first time they scroll into view.
// Visitors who prefer reduced motion see the content in place, with no movement.
export function Reveal({ children, delay = 0, y = 24, as = "div", className = "" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

// Counts a figure up from zero when it scrolls into view. Values that do not start with a number
// (such as the "[ ## ]" placeholders) are shown as they are.
export function CountUp({ value, duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduce = useReducedMotion();
  const match = /^([\d,]+(?:\.\d+)?)(.*)$/.exec(String(value));
  const target = match ? Number(match[1].replace(/,/g, "")) : null;
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const isYear = target !== null && /^\d{4}$/.test(match[1]);
  const [shown, setShown] = useState(reduce || target === null ? value : `0${match[2]}`);

  useEffect(() => {
    if (!inView || reduce || target === null) return;
    // Years count up from a nearby year, not from zero.
    const from = isYear ? target - 25 : 0;
    const controls = animate(from, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const n = isYear ? Math.round(v) : v.toLocaleString("en-IN", { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
        setShown(`${n}${match[2]}`);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref}>
      {/* Screen readers get the final figure straight away. */}
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
