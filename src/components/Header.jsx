import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/sarthi-logo.svg";
import { primaryNav } from "../data/site";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure";

function navLinkClass({ isActive }) {
  return `relative rounded-md px-1 py-2 text-sm font-medium transition-colors ${focusRing} ${
    isActive ? "text-teal" : "text-grey-dark/80 hover:text-navy"
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
        scrolled ? "border-grey-dark/10 shadow-[0_6px_20px_-12px_rgba(15,42,34,0.35)]" : "border-grey-dark/10"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className={`shrink-0 rounded-md ${focusRing}`} aria-label="Sarthi AI Solutions — Home">
          <img src={logo} alt="Sarthi AI Solutions" className="h-14 w-auto" />
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
                        <span className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-teal" aria-hidden="true" />
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
                  `rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors ${focusRing} ${
                    isActive ? "bg-teal" : "bg-navy hover:bg-teal"
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
          className={`inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy hover:bg-grey-light lg:hidden ${focusRing}`}
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
          className="absolute inset-x-0 top-full border-b border-grey-dark/10 bg-white shadow-lg lg:hidden"
        >
          <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 text-base font-medium ${focusRing} ${
                      isActive ? "bg-grey-light text-teal" : "text-grey-dark hover:bg-grey-light"
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
