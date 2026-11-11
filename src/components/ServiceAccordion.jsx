import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDownIcon } from "./Icons";

function BulletList({ items, dot = "bg-teal" }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-relaxed text-grey-dark/80">
          <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Opens automatically when the page is reached via its anchor, e.g. /competency#eia.
export default function ServiceAccordion({ service, defaultOpen = false }) {
  const { hash } = useLocation();
  const [open, setOpen] = useState(defaultOpen || hash === `#${service.id}`);
  const panelId = `${service.id}-panel`;

  useEffect(() => {
    if (hash === `#${service.id}`) setOpen(true);
  }, [hash, service.id]);

  return (
    <div
      id={service.id}
      className="scroll-mt-6 overflow-hidden rounded-2xl border border-grey-dark/10 bg-white shadow-sm"
    >
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full cursor-pointer items-center gap-5 px-6 py-6 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-azure"
          aria-expanded={open}
          aria-controls={panelId}
        >
          <span className="font-mono text-3xl font-bold text-teal">{service.number}</span>
          <span className="flex-1">
            <span className="block font-heading text-lg font-semibold text-navy">{service.title}</span>
            <span className="mt-1 block text-sm leading-relaxed text-grey-dark/70">{service.summary}</span>
          </span>
          <ChevronDownIcon
            className={`ml-2 h-6 w-6 shrink-0 text-teal transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h3>

      {open && (
        <div
          id={panelId}
          className="grid grid-cols-1 gap-8 border-t border-grey-dark/10 bg-grey-light/60 px-6 py-8 md:grid-cols-2"
        >
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-teal">Key capabilities</h4>
            <BulletList items={service.capabilities} />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-teal">
              {service.outputsLabel}
            </h4>
            <BulletList items={service.outputs} dot="bg-emerald" />
          </div>
        </div>
      )}
    </div>
  );
}
