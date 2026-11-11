import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import FloatingContact from "./FloatingContact";
import RouteEffects from "./RouteEffects";

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [pastFirstScreen, setPastFirstScreen] = useState(false);

  // The header is sticky; the floating Contact Us appears once the visitor scrolls past most of
  // the first screen (handy on phones, where the header's Contact Us sits inside the menu).
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setPastFirstScreen(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <div className="flex min-h-screen flex-col">
      <RouteEffects />
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-navy px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <Header scrolled={scrolled} />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact visible={pastFirstScreen} />
    </div>
    </MotionConfig>
  );
}
