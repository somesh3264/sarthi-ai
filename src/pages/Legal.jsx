import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { focusRing } from "../components/ui";
import { legalDocs } from "../data/legal";
import { contactInfo } from "../data/site";

export default function Legal({ doc }) {
  const page = legalDocs[doc];

  return (
    <>
      <PageHero eyebrow="Legal" title={page.title} />
      <article className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        {page.draft && (
          <p role="note" className="mb-8 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-graphite">
            <strong>Draft for review.</strong> This page has not yet been approved and may change.
          </p>
        )}
        <p className="text-xs text-graphite/60">Last updated: {page.updated}</p>
        <p className="mt-6 text-base leading-relaxed text-graphite/80">{page.intro}</p>

        {page.sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="font-heading text-xl font-semibold text-ink">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mt-3 text-base leading-relaxed text-graphite/80">
                {p}
              </p>
            ))}
          </section>
        ))}

        <section className="mt-10">
          <h2 className="font-heading text-xl font-semibold text-ink">Contact us</h2>
          <p className="mt-3 text-base leading-relaxed text-graphite/80">
            Email:{" "}
            <a href={`mailto:${contactInfo.email}`} className={`text-brand underline underline-offset-2 ${focusRing}`}>
              {contactInfo.email}
            </a>
            <br />
            Address: {contactInfo.address}
          </p>
          <p className="mt-3 text-base text-graphite/80">
            Or use our{" "}
            <Link to="/contact" className={`font-medium text-brand underline underline-offset-2 ${focusRing}`}>
              contact form
            </Link>
            .
          </p>
        </section>
      </article>
    </>
  );
}
