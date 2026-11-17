import { Link } from "react-router-dom";
import SectionLabel from "./graphics/SectionLabel";
import { ArrowRightIcon } from "./Icons";

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function ButtonLink({ to, children, variant = "primary", className = "" }) {
  const styles = {
    primary: "bg-ink text-white hover:bg-brand",
    secondary: "border border-ink/20 text-ink hover:bg-surface",
    light: "bg-white text-ink hover:bg-brand-light hover:text-ink",
  };
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${styles[variant]} ${focusRing} ${className}`}
    >
      {children}
      <ArrowRightIcon className="h-4 w-4" />
    </Link>
  );
}

export function SectionHeading({ index, label, title, intro, dark = false, center = false }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <SectionLabel index={index} label={label} dark={dark} className={center ? "justify-center" : ""} />
      <h2
        className={`mt-4 font-heading text-3xl font-bold sm:text-4xl ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-base leading-relaxed ${dark ? "text-white/70" : "text-graphite/70"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function StatusBadge({ children, tone = "amber" }) {
  const tones = {
    amber: "bg-accent/15 text-accent-strong ring-accent/40",
    amberOnDark: "bg-accent/30 text-accent ring-accent/50",
    brand: "bg-brand/10 text-brand ring-brand/30",
    light: "bg-white/15 text-white ring-white/30",
  };
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ring-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
