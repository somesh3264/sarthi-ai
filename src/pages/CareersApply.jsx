import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { focusRing } from "../components/ui";
import { Field, Fieldset } from "../components/FormField";
import { inputClass, fieldA11y } from "../components/formUtils";
import { openings } from "../data/pages";

// Endpoint that accepts multipart form data with file uploads (e.g. a paid Formspree form).
// Until VITE_CAREERS_ENDPOINT is set at build time, the form reports that it can't send.
const ENDPOINT = import.meta.env.VITE_CAREERS_ENDPOINT;

const MAX_FILE_MB = 5;
const DOC_TYPES = [".pdf", ".docx"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;
const URL_RE = /^https?:\/\/\S+\.\S+/i;

const EXPERIENCE = ["Fresher / student", "Less than 1 year", "1–3 years", "3–5 years", "5+ years"];

function makeReference() {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SAI-${date}-${rand}`;
}

function checkFile(file, required) {
  if (!file) return required ? "Please upload your resume." : undefined;
  const name = file.name.toLowerCase();
  if (!DOC_TYPES.some((ext) => name.endsWith(ext))) return "Please upload a PDF or DOCX file.";
  if (file.size > MAX_FILE_MB * 1024 * 1024) return `Files must be ${MAX_FILE_MB} MB or smaller.`;
  return undefined;
}

function validate(f) {
  const e = {};
  if (!f.fullName.trim()) e.fullName = "Please enter your full name.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(f.phone.trim())) e.phone = "Please enter a valid mobile number.";
  if (!f.city.trim()) e.city = "Please enter your current city and state.";
  if (!f.position) e.position = "Please choose a position.";
  if (!f.employmentType) e.employmentType = "Please choose an employment type.";
  for (const key of ["linkedin", "github", "portfolio"]) {
    if (f[key].trim() && !URL_RE.test(f[key].trim())) e[key] = "Please enter a full link starting with https://";
  }
  if (!f.skills.trim() && !f.linkedin.trim() && !f.github.trim() && !f.portfolio.trim()) {
    e.skills = "Please list your key skills or add at least one profile link.";
  }
  if (f.employmentType === "Internship" && !f.internshipDuration.trim()) {
    e.internshipDuration = "Please tell us how long you're available for an internship.";
  }
  const resumeErr = checkFile(f.resume, true);
  if (resumeErr) e.resume = resumeErr;
  const extraErr = checkFile(f.coverLetter, false);
  if (extraErr) e.coverLetter = extraErr;
  if (!f.consent) e.consent = "Please confirm your consent to continue.";
  return e;
}

export default function CareersApply() {
  const [params] = useSearchParams();
  const preset = openings.find((j) => j.id === params.get("position"));

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    position: preset ? preset.id : "general",
    employmentType: preset ? preset.type : "",
    experience: "",
    qualification: "",
    organisation: "",
    skills: "",
    linkedin: "",
    github: "",
    portfolio: "",
    availability: "",
    internshipDuration: "",
    resume: null,
    coverLetter: null,
    whyJoin: "",
    additional: "",
    consent: false,
    _gotcha: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [reference, setReference] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const next = type === "checkbox" ? checked : type === "file" ? files?.[0] ?? null : value;
    setForm((f) => ({ ...f, [name]: next }));
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    const ref = makeReference();
    const positionTitle =
      form.position === "general" ? "General Application" : openings.find((j) => j.id === form.position)?.title;

    const data = new FormData();
    data.append("_subject", `Job application: ${positionTitle} — ${form.fullName.trim()} (${ref})`);
    data.append("_gotcha", form._gotcha);
    data.append("Reference", ref);
    data.append("Full name", form.fullName.trim());
    data.append("email", form.email.trim());
    data.append("Mobile number", form.phone.trim());
    data.append("Current city / state", form.city.trim());
    data.append("Position applied for", positionTitle);
    data.append("Employment type", form.employmentType);
    data.append("Experience", form.experience);
    data.append("Highest qualification", form.qualification.trim());
    data.append("Current organisation", form.organisation.trim());
    data.append("Key skills", form.skills.trim());
    data.append("LinkedIn", form.linkedin.trim());
    data.append("GitHub", form.github.trim());
    data.append("Portfolio / website", form.portfolio.trim());
    data.append("Notice period / earliest joining date", form.availability.trim());
    data.append("Internship availability", form.internshipDuration.trim());
    data.append("Why join Sarthi AI", form.whyJoin.trim());
    data.append("Additional information", form.additional.trim());
    data.append("Recruitment consent", form.consent ? "Yes" : "No");
    data.append("resume", form.resume);
    if (form.coverLetter) data.append("coverLetter", form.coverLetter);

    setStatus("sending");
    try {
      if (!ENDPOINT) throw new Error("Careers endpoint is not configured");
      const res = await fetch(ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: data });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setReference(ref);
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const text = (id, label, opts = {}) => (
    <Field id={id} label={label} required={opts.required} error={errors[id]} hint={opts.hint}>
      <input
        {...fieldA11y(id, errors, { hint: !!opts.hint, required: opts.required })}
        type={opts.type ?? "text"}
        autoComplete={opts.autoComplete}
        placeholder={opts.placeholder}
        value={form[id]}
        onChange={onChange}
        className={inputClass(errors[id])}
      />
    </Field>
  );

  const textarea = (id, label, opts = {}) => (
    <div className="sm:col-span-2">
      <Field id={id} label={label} required={opts.required} error={errors[id]} hint={opts.hint}>
        <textarea
          {...fieldA11y(id, errors, { hint: !!opts.hint, required: opts.required })}
          rows={opts.rows ?? 3}
          value={form[id]}
          onChange={onChange}
          className={inputClass(errors[id])}
        />
      </Field>
    </div>
  );

  const file = (id, label, opts = {}) => (
    <Field id={id} label={label} required={opts.required} error={errors[id]} hint={`PDF or DOCX, up to ${MAX_FILE_MB} MB.`}>
      <input
        {...fieldA11y(id, errors, { hint: true, required: opts.required })}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={onChange}
        className={`${inputClass(errors[id])} cursor-pointer bg-white file:mr-3 file:rounded-full file:border-0 file:bg-grey-light file:px-3 file:py-1 file:text-xs file:font-semibold file:text-navy`}
      />
    </Field>
  );

  if (status === "success") {
    return (
      <>
        <PageHero eyebrow="Careers" title="Application received" />
        <section role="status" className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h2 className="font-heading text-2xl font-semibold text-navy">Thank you for applying to Sarthi AI</h2>
          <p className="mt-3 text-grey-dark/75">
            We've received your application. Your reference number is{" "}
            <strong className="font-mono text-navy">{reference}</strong>; please quote it if you contact us
            about this application.
          </p>
          <div className="mt-8">
            <Link to="/careers" className={`font-semibold text-teal underline underline-offset-4 ${focusRing}`}>
              Back to Careers
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Apply to Sarthi AI"
        description="Apply for an open position, or send a general application and tell us where your skills could fit."
      />

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <form onSubmit={onSubmit} noValidate className="space-y-8">
          <p className="text-xs text-grey-dark/60">
            Fields marked <span className="text-red-700">*</span> are required.
          </p>
          <input
            type="text"
            name="_gotcha"
            value={form._gotcha}
            onChange={onChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <Fieldset legend="Personal information">
            {text("fullName", "Full name", { required: true, autoComplete: "name" })}
            {text("email", "Email", { required: true, type: "email", autoComplete: "email" })}
            {text("phone", "Mobile number", { required: true, type: "tel", autoComplete: "tel" })}
            {text("city", "Current city / state", { required: true, autoComplete: "address-level2" })}
          </Fieldset>

          <Fieldset legend="Professional information">
            <Field id="position" label="Position applied for" required error={errors.position}>
              <select
                {...fieldA11y("position", errors, { required: true })}
                value={form.position}
                onChange={onChange}
                className={`${inputClass(errors.position)} bg-white`}
              >
                <option value="general">General Application</option>
                {openings.map((j) => (
                  <option key={j.id} value={j.id}>{j.title}</option>
                ))}
              </select>
            </Field>
            <Field id="employmentType" label="Employment type" required error={errors.employmentType}>
              <select
                {...fieldA11y("employmentType", errors, { required: true })}
                value={form.employmentType}
                onChange={onChange}
                className={`${inputClass(errors.employmentType)} bg-white`}
              >
                <option value="">Select</option>
                <option>Full-time</option>
                <option>Internship</option>
              </select>
            </Field>
            <Field id="experience" label="Experience">
              <select
                {...fieldA11y("experience", errors)}
                value={form.experience}
                onChange={onChange}
                className={`${inputClass(false)} bg-white`}
              >
                <option value="">Select</option>
                {EXPERIENCE.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </Field>
            {text("qualification", "Highest qualification")}
            {text("organisation", "Current organisation (optional)", { autoComplete: "organization" })}
          </Fieldset>

          <Fieldset legend="Skills and links">
            {textarea("skills", "Key technical skills", {
              hint: "For example: QGIS, PostGIS, Python, remote sensing. Add skills, a profile link, or both.",
            })}
            {text("linkedin", "LinkedIn", { type: "url", placeholder: "https://" })}
            {text("github", "GitHub", { type: "url", placeholder: "https://" })}
            {text("portfolio", "Portfolio / personal website", { type: "url", placeholder: "https://" })}
          </Fieldset>

          <Fieldset legend="Availability">
            {text("availability", "Notice period / earliest joining date")}
            {form.employmentType === "Internship" &&
              text("internshipDuration", "Internship availability", {
                required: true,
                hint: "For example: 3 months from June 2027.",
              })}
          </Fieldset>

          <Fieldset legend="Documents">
            {file("resume", "Resume / CV", { required: true })}
            {file("coverLetter", "Cover letter or work sample (optional)")}
          </Fieldset>

          <Fieldset legend="About you">
            {textarea("whyJoin", "Why would you like to join Sarthi AI?")}
            {textarea("additional", "Additional information")}
          </Fieldset>

          <div>
            <div className="flex items-start gap-3">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={form.consent}
                onChange={onChange}
                aria-required="true"
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                className="mt-0.5 h-4 w-4 shrink-0 accent-teal"
              />
              <label htmlFor="consent" className="text-sm text-grey-dark/80">
                I consent to Sarthi AI using the information I've submitted for recruitment purposes, as
                described in the{" "}
                <Link to="/recruitment-privacy" className={`font-medium text-teal underline underline-offset-2 ${focusRing}`}>
                  Recruitment Privacy Notice
                </Link>
                .<span className="text-red-700" aria-hidden="true"> *</span>
              </label>
            </div>
            {errors.consent && (
              <p id="consent-error" className="mt-1 text-xs font-medium text-red-700">
                {errors.consent}
              </p>
            )}
          </div>

          <div aria-live="polite">
            {status === "error" && (
              <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
                Sorry, we couldn't submit your application just now. Please try again later.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className={`cursor-pointer rounded-full bg-navy px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal disabled:cursor-wait disabled:opacity-70 ${focusRing}`}
          >
            {status === "sending" ? "Submitting…" : "Submit Application"}
          </button>
        </form>
      </section>
    </>
  );
}
