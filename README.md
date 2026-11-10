# Sarthi AI Solutions website

React + Vite + Tailwind site for Sarthi AI Solutions, built to the website blueprint (v1.0).

## Development

```bash
npm install
npm run dev
```

`npm run build` creates the production build in `dist/`; `npm run lint` runs Oxlint.

## Contact form (Formspree)

The Contact Us enquiry form posts to a [Formspree](https://formspree.io) form.

1. Sign in to Formspree with the business mailbox that should receive enquiries and create a new form.
2. Copy the form endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. Set it as `VITE_CONTACT_ENDPOINT`:
   - **Locally:** copy `.env.example` to `.env.local` and paste the endpoint.
   - **GitHub Pages:** add a repository variable `VITE_CONTACT_ENDPOINT` under
     Settings → Secrets and variables → Actions → Variables.
   - **Vercel:** add the same name under Project → Settings → Environment Variables.
4. In Formspree, add the site's domain under the form's allowed domains, and turn on the
   autoresponse if visitors should get an acknowledgement email.

Until the variable is set, the form validates input but shows a "couldn't send" message on submit.
