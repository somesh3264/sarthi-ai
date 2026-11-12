import { Link } from "react-router-dom";
import SectionLabel from "./graphics/SectionLabel";
import { ArrowRightIcon } from "./Icons";

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure";

export function ButtonLink({ to, children, variant = "primary", className = "" }) {
  const styles = {
    primary: "bg-navy text-white hover:bg-teal",
    secondary: "border border-navy/20 text-navy hover:bg-grey-light",
    light: "bg-white text-navy hover:bg-azure hover:text-navy",
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
        className={`mt-4 font-heading text-3xl font-bold sm:text-4xl ${dark ? "text-white" : "text-navy"}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-base leading-relaxed ${dark ? "text-white/70" : "text-grey-dark/70"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function StatusBadge({ children, tone = "amber" }) {
  const tones = {
    amber: "bg-emerald/15 text-[#7a5210] ring-emerald/40",
    amberOnDark: "bg-emerald/30 text-[#f6d38c] ring-emerald/50",
    teal: "bg-teal/10 text-teal ring-teal/30",
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
