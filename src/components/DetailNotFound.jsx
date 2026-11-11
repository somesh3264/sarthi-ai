import { Link } from "react-router-dom";
import PageHero from "./PageHero";
import { focusRing } from "./ui";
import { useDocumentMeta } from "./documentMeta";

// Shown when a detail URL (article, case study, vacancy) doesn't match any published item.
export default function DetailNotFound({ eyebrow, what, backTo, backLabel }) {
  useDocumentMeta(`${what} not found | Sarthi AI Solutions`, `This ${what.toLowerCase()} could not be found.`);
  return (
    <>
      <PageHero eyebrow={eyebrow} title={`${what} not found`} />
      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="text-grey-dark/75">
          This {what.toLowerCase()} may have been moved, or isn't published yet.
        </p>
        <Link to={backTo} className={`mt-6 inline-block font-semibold text-teal underline underline-offset-4 ${focusRing}`}>
          {backLabel}
        </Link>
      </section>
    </>
  );
}
