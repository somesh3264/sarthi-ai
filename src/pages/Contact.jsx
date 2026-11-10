import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { focusRing } from "../components/ui";
import { Field } from "../components/FormField";
import { inputBase as inputClass } from "../components/formUtils";
import { contactInfo } from "../data/site";
import { services, sectors } from "../data/content";

// Formspree form endpoint, e.g. https://formspree.io/f/abcdwxyz (see README, "Contact form").
// Until VITE_CONTACT_ENDPOINT is set at build time, the form reports that it can't send.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your full name.";
  const email = form.email.trim();
  const phone = form.phone.trim();
  if (!email && !phone) {
    errors.email = "Please give an email address or a phone number.";
  } else {
    if (email && !EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
    if (phone && !PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number.";
  }
  if (!form.message.trim()) errors.message = "Please describe your project or challenge.";
  if (!form.consent) errors.consent = "Please confirm you have read the privacy notice.";
  return errors;
}

export default function Contact() {
  const [params] = useSearchParams();
  const preSector = sectors.some((s) => s.id === params.get("sector")) ? params.get("sector") : "";
  const preService = services.some((s) => s.id === params.get("service")) ? params.get("service") : "";

  const [form, setForm] = useState({
    name: "",
    organisation: "",
    email: "",
    phone: "",
    service: preService,
    sector: preSector,
    location: "",
    message: "",
    consent: false,
    _gotcha: "", // Formspree honeypot: real visitors never see or fill this field.
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const describedBy = (id, hasHint = false) =>
    errors[id] ? `${id}-error` : hasHint ? `${id}-hint` : undefined;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setStatus("sending");
    try {
      if (!ENDPOINT) throw new Error("Enquiry endpoint is not configured");
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Website enquiry from ${form.name.trim()}`,
          _gotcha: form._gotcha,
          "Full name": form.name.trim(),
          "Organisation / designation": form.organisation.trim(),
          email: form.email.trim(), // Formspree uses this as the reply-to address
          Phone: form.phone.trim(),
          "Service of interest":
            services.find((s) => s.id === form.service)?.title ?? (form.service === "other" ? "Other" : ""),
          Sector: sectors.find((s) => s.id === form.sector)?.name ?? (form.sector === "other" ? "Other" : ""),
          "Project location": form.location.trim(),
          Message: form.message.trim(),
          "Privacy consent": form.consent ? "Yes" : "No",
        }),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Discuss Your Next Project"
        description="Tell us about your project requirements. Our team will explore how geospatial intelligence, environmental analysis and AI-enabled solutions can support your objectives."
      />

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-5 lg:px-8">
        <div id="details" className="scroll-mt-6 space-y-8 lg:col-span-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-teal">Phone</h2>
            <p className="mt-2 text-lg text-grey-dark">{contactInfo.phone}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-teal">Email</h2>
            <p className="mt-2 text-lg text-grey-dark">{contactInfo.email}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-teal">Office</h2>
            <p className="mt-2 text-lg text-grey-dark">{contactInfo.address}</p>
          </div>
        </div>

        <div id="enquiry-form" className="scroll-mt-6 lg:col-span-3">
          {status === "success" ? (
            <div role="status" className="rounded-2xl border border-azure/30 bg-grey-light p-8 text-center">
              <h2 className="font-heading text-xl font-semibold text-navy">Thank you for contacting Sarthi AI</h2>
              <p className="mt-2 text-grey-dark/75">
                Your enquiry has been received. Our team will review the information and contact you
                using the details provided.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <h2 className="font-heading text-xl font-semibold text-navy">Project enquiry</h2>
              <input
                type="text"
                name="_gotcha"
                value={form._gotcha}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <p className="text-xs text-grey-dark/60">
                Fields marked <span className="text-red-700">*</span> are required.
              </p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id="name" label="Full name" required error={errors.name}>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={describedBy("name")}
                    className={`${inputClass} ${errors.name ? "border-red-700" : "border-grey-dark/20"}`}
                  />
                </Field>
                <Field id="organisation" label="Organisation / designation">
                  <input
                    id="organisation"
                    name="organisation"
                    autoComplete="organization"
                    value={form.organisation}
                    onChange={handleChange}
                    className={`${inputClass} border-grey-dark/20`}
                  />
                </Field>
                <Field
                  id="email"
                  label="Email"
                  error={errors.email}
                  hint="Give an email address, a phone number, or both."
                >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={describedBy("email", true)}
                    className={`${inputClass} ${errors.email ? "border-red-700" : "border-grey-dark/20"}`}
                  />
                </Field>
                <Field id="phone" label="Phone" error={errors.phone}>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    aria-invalid={!!errors.phone}
                    aria-describedby={describedBy("phone")}
                    className={`${inputClass} ${errors.phone ? "border-red-700" : "border-grey-dark/20"}`}
                  />
                </Field>
                <Field id="service" label="Service of interest">
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={`${inputClass} border-grey-dark/20 bg-white`}
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                </Field>
                <Field id="sector" label="Sector">
                  <select
                    id="sector"
                    name="sector"
                    value={form.sector}
                    onChange={handleChange}
                    className={`${inputClass} border-grey-dark/20 bg-white`}
                  >
                    <option value="">Select a sector</option>
                    {sectors.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                </Field>
              </div>

              <Field id="location" label="Project location" hint="City, district, state or project site.">
                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  aria-describedby={describedBy("location", true)}
                  className={`${inputClass} border-grey-dark/20`}
                />
              </Field>

              <Field
                id="message"
                label="Message / requirements"
                required
                error={errors.message}
                hint="A short description of the challenge or what you'd like to achieve."
              >
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={describedBy("message", true)}
                  className={`${inputClass} ${errors.message ? "border-red-700" : "border-grey-dark/20"}`}
                />
              </Field>

              <div>
                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? "consent-error" : undefined}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-teal"
                  />
                  <label htmlFor="consent" className="text-sm text-grey-dark/80">
                    I agree that Sarthi AI may use these details to respond to my enquiry, as described
                    in the{" "}
                    <Link to="/privacy" className={`font-medium text-teal underline underline-offset-2 ${focusRing}`}>
                      Privacy Policy
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
                    Sorry, we couldn't send your enquiry just now. Please try again, or contact us
                    directly using the details on this page.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`cursor-pointer rounded-full bg-navy px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal disabled:cursor-wait disabled:opacity-70 ${focusRing}`}
              >
                {status === "sending" ? "Sending…" : "Send Enquiry"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
