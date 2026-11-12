import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/graphics/Reveal";
import { DocumentChartIcon } from "../components/graphics/PointIcons";
import { ButtonLink, SampleNote, SectionHeading, StatusBadge, focusRing } from "../components/ui";
import { newsletterHero, newsletterCategories, articles } from "../data/pages";
import { formatDate } from "../data/format";
import { ArrowRightIcon } from "../components/Icons";

const categoryName = Object.fromEntries(newsletterCategories.map((c) => [c.id, c.title]));

function ArticleCard({ article }) {
  return (
    <li className="group relative flex flex-col overflow-hidden rounded-2xl border border-grey-dark/10 bg-white shadow-sm transition-shadow focus-within:shadow-lg hover:shadow-lg">
      {article.image && <img src={article.image} alt="" className="h-44 w-full object-cover" loading="lazy" />}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">{categoryName[article.category]}</p>
          {article.sample && <StatusBadge tone="sample">Sample</StatusBadge>}
        </div>
        <h3 className="mt-2 font-heading text-lg font-semibold text-navy">
          {/* The stretched link makes the whole card clickable while keeping one link per card. */}
          <Link to={`/newsletter/${article.slug}`} className={`after:absolute after:inset-0 ${focusRing}`}>
            {article.title}
          </Link>
        </h3>
        <time dateTime={article.date} className="mt-1 text-xs text-grey-dark/60">
          {formatDate(article.date)}
        </time>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-grey-dark/75">{article.summary}</p>
        <span aria-hidden="true" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
          Read More <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </li>
  );
}

export default function Newsletter() {
  const [category, setCategory] = useState("all");
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const visible = sorted.filter((a) => category === "all" || a.category === category);

  return (
    <>
      <PageHero eyebrow="Sarthi Newsletter" title={newsletterHero.title} description={newsletterHero.body} />

      <section id="latest" className="scroll-mt-6 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <SectionHeading index="01" label="Latest" title="Latest insights and updates" />
          </Reveal>

          {articles.length === 0 ? (
            <Reveal className="mt-10 rounded-3xl border border-dashed border-grey-dark/20 bg-grey-light p-8 text-center sm:p-12">
              <DocumentChartIcon className="mx-auto h-8 w-8 text-teal" />
              <h3 className="mt-4 font-heading text-xl font-semibold text-navy">First articles coming soon</h3>
              <p className="mx-auto mt-3 max-w-xl text-base text-grey-dark/75">
                We're preparing articles on geospatial technology, remote sensing, AI and sustainable
                development. Browse the topics we'll cover below.
              </p>
            </Reveal>
          ) : (
            <>
              <div role="group" aria-label="Filter by category" className="mt-8 flex flex-wrap gap-2">
                {[{ id: "all", title: "All" }, ...newsletterCategories].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={category === c.id}
                    onClick={() => setCategory(c.id)}
                    className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${focusRing} ${
                      category === c.id ? "bg-navy text-white" : "bg-grey-light text-grey-dark hover:bg-grey-dark/10"
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
              {articles.some((a) => a.sample) && (
                <SampleNote className="mt-6">
                  <strong>Sample articles</strong> are shown to preview the layout. They are not published content.
                </SampleNote>
              )}
              <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visible.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <section id="categories" className="scroll-mt-6 bg-grey-light py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <SectionHeading index="02" label="Categories" title="What we write about" />
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsletterCategories.map((c, i) => (
              <Reveal as="li" key={c.id} delay={(i % 3) * 0.06} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-navy">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-grey-dark/70">{c.themes}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Subscription stays switched off until the mailing list owner, cadence, sending platform
          and unsubscribe process are approved (blueprint, Sarthi Newsletter page). */}
      <section id="subscribe" className="scroll-mt-6 px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-4xl rounded-3xl bg-navy px-6 py-14 text-center text-white sm:px-12">
          <h2 className="font-heading text-3xl font-bold">Get Sarthi AI insights and updates in your inbox</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/75">
            Email subscriptions are coming soon. In the meantime, get in touch if you'd like to hear
            about our work.
          </p>
          <div className="mt-8">
            <ButtonLink to="/contact" variant="light">Contact Us</ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
