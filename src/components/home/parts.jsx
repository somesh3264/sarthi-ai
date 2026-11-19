import { Reveal } from "../motion";

export function Eyebrow({ children, dark = false }) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.08em] ${
        dark ? "text-brand-light" : "text-brand"
      }`}
    >
      <span aria-hidden="true" className={`h-px w-6 ${dark ? "bg-brand-light" : "bg-brand"}`} />
      {children}
    </p>
  );
}

export function SectionHead({ eyebrow, title, body, dark = false, id }) {
  return (
    <Reveal className="max-w-3xl">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={`mt-4 font-heading text-3xl leading-[1.12] font-normal sm:text-[2.6rem] ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {body && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/75" : "text-muted"}`}>{body}</p>
      )}
    </Reveal>
  );
}

// Visible pre-launch marker for content only the client can supply. Remove before launch.
export function NeedsInput({ children, className = "" }) {
  return (
    <div className={`relative rounded-lg border border-dashed border-accent-strong/70 bg-accent/5 ${className}`}>
      <span className="absolute -top-2.5 left-3 bg-white px-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-accent-strong">
        Needs client input
      </span>
      {children}
    </div>
  );
}

