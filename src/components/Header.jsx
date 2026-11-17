import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
// Header version of the logo: same artwork without the small tagline line.
import logo from "../assets/sarthi-logo-header.svg";
import { primaryNav } from "../data/site";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function navLinkClass({ isActive }) {
  return `relative rounded-md px-1 py-2 text-sm font-medium transition-colors ${focusRing} ${
    isActive ? "text-brand" : "text-graphite hover:text-brand"
  }`;
}

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}

export default function Header({ scrolled = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const links = primaryNav.filter((item) => item.to !== "/contact");

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? "border-line shadow-[0_8px_24px_-16px_rgba(11,31,51,0.35)]" : "border-line"
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Link to="/" className={`shrink-0 rounded-md ${focusRing}`} aria-label="Sarthi AI Solutions — Home">
          <img src={logo} alt="Sarthi AI Solutions" className="h-13 w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-7">
            {links.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === "/"} className={navLinkClass}>
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <span className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-brand" aria-hidden="true" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `inline-flex min-h-11 items-center rounded-lg px-5 text-sm font-semibold text-white transition-colors ${focusRing} ${
                    isActive ? "bg-brand-dark" : "bg-brand hover:bg-brand-dark"
                  }`
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink hover:bg-surface lg:hidden ${focusRing}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="absolute inset-x-0 top-full border-b border-line bg-white shadow-lg lg:hidden"
        >
          <ul className="container-page space-y-1 py-4">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 text-base font-medium ${focusRing} ${
                      isActive ? "bg-surface text-brand" : "text-graphite hover:bg-surface"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
