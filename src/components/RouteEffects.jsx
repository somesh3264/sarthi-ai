import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageMeta, notFoundMeta } from "../data/site";

function setMetaDescription(content) {
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

// Updates the page title / description and handles scroll position on navigation:
// scroll to the #anchor when there is one, otherwise to the top of the new page.
export default function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
    const meta = pageMeta[path] ?? notFoundMeta;
    document.title = meta.title;
    setMetaDescription(meta.description);
  }, [pathname]);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    // Defer so the new page has rendered before looking up the anchor.
    // Jump straight to the section: a smooth scroll from the top of a long page is slow and
    // the html element's CSS smooth scrolling would otherwise apply.
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
