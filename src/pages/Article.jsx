import { Link, useParams } from "react-router-dom";
import ContourLines from "../components/graphics/ContourLines";
import DetailNotFound from "../components/DetailNotFound";
import { useDocumentMeta } from "../components/documentMeta";
import { focusRing } from "../components/ui";
import { articles, newsletterCategories } from "../data/pages";
import { formatDate } from "../data/format";

const categoryName = Object.fromEntries(newsletterCategories.map((c) => [c.id, c.title]));

function ArticleView({ article }) {
  useDocumentMeta(`${article.title} | Sarthi Newsletter`, article.summary);

  // Related: newest other articles, same category first.
  const related = articles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => (b.category === article.category) - (a.category === article.category) || b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <article>
      <header className="relative overflow-hidden bg-navy text-white">
        <ContourLines opacity={0.15} />
        <div className="relative mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <Link to="/newsletter" className={`text-sm font-semibold text-azure hover:underline ${focusRing}`}>
            ← Sarthi Newsletter
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-azure">
            {categoryName[article.category]}
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">{article.title}</h1>
          <p className="mt-4 text-sm text-white/70">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            {article.author && <> · {article.author}</>}
          </p>
        </div>
      </header>

      {article.image && (
        <figure className="mx-auto max-w-4xl px-6 pt-10 lg:px-8">
          <img src={article.image} alt={article.imageAlt ?? ""} className="w-full rounded-2xl object-cover shadow-sm" />
          {article.imageCredit && (
            <figcaption className="mt-2 text-xs text-grey-dark/60">{article.imageCredit}</figcaption>
          )}
        </figure>
      )}

      <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
        <p className="text-lg leading-relaxed text-grey-dark/85">{article.summary}</p>
        {article.body?.map((section, i) => (
          <section key={section.heading ?? i} className="mt-8">
            {section.heading && (
              <h2 className="font-heading text-2xl font-semibold text-navy">{section.heading}</h2>
            )}
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 text-base leading-relaxed text-grey-dark/80">
                {p}
              </p>
            ))}
          </section>
        ))}

        {article.sources?.length > 0 && (
          <section className="mt-12 border-t border-grey-dark/10 pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-teal">Sources and credits</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {article.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className={`text-navy underline underline-offset-2 ${focusRing}`}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {related.length > 0 && (
        <aside aria-labelledby="related-heading" className="bg-grey-light py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 id="related-heading" className="font-heading text-2xl font-semibold text-navy">Related articles</h2>
            <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((a) => (
                <li key={a.slug} className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-widest text-teal">{categoryName[a.category]}</p>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-navy">
                    <Link to={`/newsletter/${a.slug}`} className={`hover:underline ${focusRing}`}>{a.title}</Link>
                  </h3>
                  <time dateTime={a.date} className="mt-1 block text-xs text-grey-dark/60">{formatDate(a.date)}</time>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </article>
  );
}

export default function Article() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    return <DetailNotFound eyebrow="Sarthi Newsletter" what="Article" backTo="/newsletter" backLabel="Back to the Newsletter" />;
  }
  return <ArticleView article={article} />;
}
