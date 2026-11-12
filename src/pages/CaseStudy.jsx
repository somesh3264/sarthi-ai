import { Link, useParams } from "react-router-dom";
import ContourLines from "../components/graphics/ContourLines";
import DetailNotFound from "../components/DetailNotFound";
import { useDocumentMeta } from "../components/documentMeta";
import { ButtonLink, StatusBadge, focusRing } from "../components/ui";
import { caseStudies } from "../data/pages";

function Block({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-heading text-xl font-semibold text-navy">{title}</h2>
      <div className="mt-3 text-base leading-relaxed text-grey-dark/80">{children}</div>
    </section>
  );
}

function Chips({ items }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-full bg-grey-light px-3 py-1 text-sm text-navy">
          {item}
        </li>
      ))}
    </ul>
  );
}

function CaseStudyView({ cs }) {
  useDocumentMeta(`${cs.title} | Case Study | Sarthi AI`, cs.challenge);

  return (
    <article>
      <header className="relative overflow-hidden bg-navy text-white">
        <ContourLines opacity={0.15} />
        <div className="relative mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <Link to="/projects#case-studies" className={`text-sm font-semibold text-azure hover:underline ${focusRing}`}>
            ← All case studies
          </Link>
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone="light">Case study</StatusBadge>
            </div>
          </div>
          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight sm:text-4xl">{cs.title}</h1>
          {(cs.sector || cs.location) && (
            <p className="mt-3 text-sm text-white/70">{[cs.sector, cs.location].filter(Boolean).join(" · ")}</p>
          )}
        </div>
      </header>

      {cs.image && (
        <figure className="mx-auto max-w-5xl px-6 pt-10 lg:px-8">
          <img src={cs.image} alt={cs.imageAlt ?? ""} className="w-full rounded-2xl object-cover shadow-sm" />
          {cs.imageCredit && <figcaption className="mt-2 text-xs text-grey-dark/60">{cs.imageCredit}</figcaption>}
        </figure>
      )}

      <div className="mx-auto max-w-3xl px-6 pb-16 lg:px-8">
        <Block title="The challenge"><p>{cs.challenge}</p></Block>
        {cs.studyArea && <Block title="Study area"><p>{cs.studyArea}</p></Block>}
        <Block title="Our approach"><p>{cs.approach}</p></Block>
        {cs.tools?.length > 0 && <Block title="Tools and data"><Chips items={cs.tools} /></Block>}
        {cs.outputs?.length > 0 && <Block title="Key outputs"><Chips items={cs.outputs} /></Block>}
        {cs.outcome && <Block title="Outcome"><p>{cs.outcome}</p></Block>}

        <div className="mt-14 rounded-2xl bg-grey-light p-6 text-center sm:p-8">
          <p className="font-heading text-lg font-semibold text-navy">Planning something similar?</p>
          <div className="mt-4">
            <ButtonLink to="/contact">Discuss Your Project</ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) {
    return <DetailNotFound eyebrow="Projects" what="Case study" backTo="/projects" backLabel="Back to Projects" />;
  }
  return <CaseStudyView cs={cs} />;
}
