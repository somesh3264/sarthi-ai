import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

// Holding page for routes defined in the blueprint whose content is not built yet.
export default function Placeholder({ eyebrow, title, description, note }) {
  return (
    <div>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <section className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
        <p className="text-graphite/70">
          {note ?? "This page is being prepared and will be available soon."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Contact Us
          </Link>
          <Link
            to="/"
            className="rounded-full border border-ink/20 px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
