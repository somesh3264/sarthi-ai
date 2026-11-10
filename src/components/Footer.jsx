import { Link } from "react-router-dom";
import logo from "../assets/sarthi-logo.svg";
import {
  exploreLinks,
  serviceLinks,
  legalLinks,
  contactInfo,
  socialLinks,
} from "../data/site";

const linkClass =
  "rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure";

function Column({ title, children }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-azure">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const backToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <footer className="border-t border-white/10 bg-navy text-white/70">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <Column title="Company">
          <li className="pb-2">
            <img src={logo} alt="Sarthi AI Solutions" className="h-12 w-auto brightness-0 invert" />
            <p className="mt-4 max-w-xs leading-relaxed text-white/60">
              Turning complex geospatial data into actionable intelligence for better land,
              infrastructure and environmental decisions.
            </p>
          </li>
          <li>
            <Link to="/about" className={linkClass}>About Us</Link>
          </li>
          <li>
            <Link to="/#why-sarthi" className={linkClass}>Why Sarthi AI</Link>
          </li>
        </Column>

        <Column title="Explore">
          {exploreLinks.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className={linkClass}>{item.label}</Link>
            </li>
          ))}
          {socialLinks.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {item.label}
              </a>
            </li>
          ))}
        </Column>

        <Column title="Services">
          {serviceLinks.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className={linkClass}>{item.label}</Link>
            </li>
          ))}
        </Column>

        <Column title="Contact">
          <li className="text-white/60">Phone: {contactInfo.phone}</li>
          <li className="text-white/60">Email: {contactInfo.email}</li>
          <li className="text-white/60">Address: {contactInfo.address}</li>
          <li className="pt-2">
            <Link to="/contact" className={`font-semibold text-white ${linkClass}`}>
              Contact Us →
            </Link>
          </li>
        </Column>

        <Column title="Legal">
          {legalLinks.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className={linkClass}>{item.label}</Link>
            </li>
          ))}
        </Column>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-white/50 sm:flex-row lg:px-8">
          <p>© {year} Sarthi AI Solutions. All rights reserved.</p>
          <button
            type="button"
            onClick={backToTop}
            className={`inline-flex cursor-pointer items-center gap-1.5 font-semibold text-white/70 ${linkClass}`}
          >
            Back to Top
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M10 16V4M10 4L5 9M10 4l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
