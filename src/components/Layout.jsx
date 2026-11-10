import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FloatingContact from "./FloatingContact";
import RouteEffects from "./RouteEffects";

export default function Layout() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setHeaderVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <RouteEffects />
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-navy px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <Header ref={headerRef} />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact visible={!headerVisible} />
    </div>
  );
}
