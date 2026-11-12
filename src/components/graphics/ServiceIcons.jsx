import { motion, useReducedMotion } from "framer-motion";

// Line icons for the six core services and six sectors. Each one draws itself, stroke by stroke,
// the first time its card scrolls into view; visitors who prefer reduced motion see the finished icon.
const SHAPES = {
  // Folded map with a location pin
  "site-suitability": [
    { d: "M6 11 L17 7 L29 11 L42 7 V37 L29 41 L17 37 L6 41 Z" },
    { d: "M17 7 V37" },
    { d: "M29 11 V41" },
    { d: "M35 17 a5 5 0 0 0 -10 0 c0 4.5 5 9.5 5 9.5 s5 -5 5 -9.5 z" },
    { circle: [30, 17, 1.6] },
  ],
  // Leaf over a ground line
  eia: [
    { d: "M12 34 C12 17 24 9 38 9 C38 25 30 34 14 34 Z" },
    { d: "M12 34 L30 17" },
    { d: "M20 26 L26 26" },
    { d: "M6 41 C12 38 18 44 24 41 S36 38 42 41" },
  ],
  // Shield with an alert mark
  dmp: [
    { d: "M24 5 L39 11 V23 C39 33 32 40 24 43 C16 40 9 33 9 23 V11 Z" },
    { d: "M24 15 V27" },
    { circle: [24, 32.5, 1.6] },
  ],
  // Quad-rotor drone with camera
  "drone-surveys": [
    { d: "M19 20 H29 V27 H19 Z" },
    { d: "M19 20 L13 14" },
    { d: "M29 20 L35 14" },
    { d: "M19 27 L13 33" },
    { d: "M29 27 L35 33" },
    { circle: [11, 12, 4.5] },
    { circle: [37, 12, 4.5] },
    { circle: [11, 35, 4.5] },
    { circle: [37, 35, 4.5] },
    { d: "M24 27 V31" },
  ],
  // Small neural network
  "ai-ml": [
    { circle: [10, 15, 3] },
    { circle: [10, 33, 3] },
    { circle: [24, 9, 3] },
    { circle: [24, 24, 3] },
    { circle: [24, 39, 3] },
    { circle: [38, 24, 3] },
    { d: "M13 14 L21 10 M13 16 L21 23 M13 32 L21 25 M13 34 L21 38" },
    { d: "M27 10 L35 22 M27 24 L35 24 M27 38 L35 26" },
  ],
  // Bar chart with a rising trend line
  analytics: [
    { d: "M8 7 V41 H42" },
    { d: "M15 41 V32 M23 41 V26 M31 41 V30 M39 41 V20" },
    { d: "M13 25 L21 17 L29 21 L39 10" },
    { d: "M33 10 H39 V16" },
  ],

  /* ----- Sectors ----- */
  // Sun over a solar panel
  "renewable-energy": [
    { circle: [14, 13, 4.5] },
    { d: "M14 4 V6 M14 20 V22 M5 13 H7 M21 13 H23" },
    { d: "M20 26 H42 L38 40 H16 Z" },
    { d: "M27.3 26 L23.3 40 M34.7 26 L30.7 40 M18 33 H40" },
    { d: "M27 40 V44 M22 44 H32" },
  ],
  // Factory with a chimney
  industrial: [
    { d: "M6 42 V24 L16 30 V24 L26 30 V24 L36 30 V10 H42 V42 Z" },
    { d: "M11 36 H15 M21 36 H25 M31 36 H35" },
    { d: "M39 6 C37 4 40 2 38 0" },
  ],
  // City buildings
  infrastructure: [
    { d: "M5 42 H43" },
    { d: "M9 42 V16 H19 V42" },
    { d: "M19 42 V26 H28 V42" },
    { d: "M28 42 V8 H39 V42" },
    { d: "M13 22 V24 M13 30 V32 M23.5 32 V34 M33 14 V16 M33 22 V24 M33 30 V32" },
  ],
  // Mountain with a pickaxe
  mining: [
    { d: "M4 40 L18 18 L26 28 L32 20 L44 40 Z" },
    { d: "M22 8 Q31 3 40 9" },
    { d: "M31 5.5 L27 18" },
  ],
  // Electricity pylon
  power: [
    { d: "M24 4 L14 44 M24 4 L34 44" },
    { d: "M10 14 H38 M13 24 H35" },
    { d: "M17 30 L31 38 M31 30 L17 38" },
    { d: "M9 44 H39" },
  ],
  // Columned public building
  government: [
    { d: "M6 18 L24 6 L42 18 Z" },
    { d: "M8 21 H40" },
    { d: "M12 24 V37 M20 24 V37 M28 24 V37 M36 24 V37" },
    { d: "M6 40 H42 M4 44 H44" },
  ],
};

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, delay: i * 0.12, ease: "easeInOut" },
      opacity: { duration: 0.01, delay: i * 0.12 },
    },
  }),
};

export default function ServiceIcon({ id, delay = 0, className = "h-10 w-10" }) {
  const reduce = useReducedMotion();
  const shapes = SHAPES[id] ?? [];
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (reduce) {
    return (
      <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...common}>
        {shapes.map((s, i) =>
          s.circle ? <circle key={i} cx={s.circle[0]} cy={s.circle[1]} r={s.circle[2]} /> : <path key={i} d={s.d} />,
        )}
      </svg>
    );
  }

  // `delay` staggers icons across cards; each stroke adds its own small delay.
  const offset = Math.round(delay / 0.12);
  return (
    <motion.svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      {...common}
    >
      {shapes.map((s, i) =>
        s.circle ? (
          <motion.circle key={i} cx={s.circle[0]} cy={s.circle[1]} r={s.circle[2]} variants={draw} custom={i + offset} />
        ) : (
          <motion.path key={i} d={s.d} variants={draw} custom={i + offset} />
        ),
      )}
    </motion.svg>
  );
}
