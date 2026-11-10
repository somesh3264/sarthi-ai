import { Link, useLocation } from "react-router-dom";

// Compact Contact Us action, shown only while the header is scrolled out of view.
// Hidden on the Contact page itself so it never sits over the enquiry form.
export default function FloatingContact({ visible }) {
  const { pathname } = useLocation();
  const show = visible && !pathname.startsWith("/contact");

  return (
    <Link
      to="/contact"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure sm:right-6 sm:bottom-6 sm:px-5 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d="M3 5.5A1.5 1.5 0 014.5 4h11A1.5 1.5 0 0117 5.5v9a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 14.5v-9zM3.5 5l6.5 5 6.5-5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Contact Us
    </Link>
  );
}
