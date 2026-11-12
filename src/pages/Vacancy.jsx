import { Link, useParams } from "react-router-dom";
import ContourLines from "../components/graphics/ContourLines";
import DetailNotFound from "../components/DetailNotFound";
import { useDocumentMeta } from "../components/documentMeta";
import { ButtonLink, SampleNote, StatusBadge, focusRing } from "../components/ui";
import { openings } from "../data/pages";

function List({ title, items }) {
  if (!items?.length) return null;
  return (
    <section className="mt-10">
      <h2 className="font-heading text-xl font-semibold text-navy">{title}</h2>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-relaxed text-grey-dark/80">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function VacancyView({ job }) {
  useDocumentMeta(`${job.title} | Careers at Sarthi AI`, job.summary);

  const facts = [
    ["Career area", job.area],
    ["Employment type", job.type],
    ["Location", job.location],
    ["Work mode", job.mode],
    ["Experience", job.experience],
  ].filter(([, value]) => value);

  return (
    <article>
      <header className="relative overflow-hidden bg-navy text-white">
        <ContourLines opacity={0.15} />
        <div className="relative mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <Link to="/careers#openings" className={`text-sm font-semibold text-azure hover:underline ${focusRing}`}>
            ← All openings
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <StatusBadge tone="light">{job.type}</StatusBadge>
            <StatusBadge tone="amberOnDark">{job.status}</StatusBadge>
            {job.sample && <StatusBadge tone="light">Sample</StatusBadge>}
          </div>
          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight sm:text-4xl">{job.title}</h1>
          <div className="mt-8">
            <ButtonLink to={`/careers/apply?position=${job.id}`} variant="light">Apply Now</ButtonLink>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-14 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          {job.sample && (
            <SampleNote className="mb-8">
              <strong>Sample vacancy.</strong> This page previews the layout; this position is not open.
            </SampleNote>
          )}
          <section>
            <h2 className="font-heading text-xl font-semibold text-navy">About the role</h2>
            <p className="mt-3 text-base leading-relaxed text-grey-dark/80">{job.summary}</p>
          </section>
          <List title="What you'll do" items={job.responsibilities} />
          <List title="Skills we're looking for" items={job.skills} />
        </div>

        <aside className="h-fit rounded-2xl bg-grey-light p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-teal">Role details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="text-grey-dark/60">{label}</dt>
                <dd className="font-medium text-navy">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <ButtonLink to={`/careers/apply?position=${job.id}`} className="w-full justify-center">Apply Now</ButtonLink>
          </div>
        </aside>
      </div>
    </article>
  );
}

export default function Vacancy() {
  const { id } = useParams();
  const job = openings.find((j) => j.id === id);
  if (!job) {
    return <DetailNotFound eyebrow="Careers" what="Vacancy" backTo="/careers#openings" backLabel="See current openings" />;
  }
  return <VacancyView job={job} />;
}
