// Site-wide navigation, contact details and per-page SEO, per the website blueprint (v1.0).

export const primaryNav = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Competency", to: "/competency" },
  { label: "Projects", to: "/projects" },
  { label: "Careers", to: "/careers" },
  { label: "Sarthi Newsletter", to: "/newsletter" },
  { label: "Contact Us", to: "/contact" },
];

export const exploreLinks = [
  { label: "Our Competency", to: "/competency" },
  { label: "Projects", to: "/projects" },
  { label: "Careers", to: "/careers" },
  { label: "Sarthi Newsletter", to: "/newsletter" },
];

export const serviceLinks = [
  { label: "Site Suitability Analysis", to: "/competency#site-suitability" },
  { label: "Environmental Impact Assessment", to: "/competency#eia" },
  { label: "Disaster Management Plans", to: "/competency#dmp" },
  { label: "Drone & Aerial Surveys", to: "/competency#drone-surveys" },
  { label: "AI & ML Solutions", to: "/competency#ai-ml" },
  { label: "Data Analytics & Decision Intelligence", to: "/competency#analytics" },
];

export const legalLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Use", to: "/terms" },
  { label: "Recruitment Privacy Notice", to: "/recruitment-privacy" },
];

// Placeholders until Sarthi AI verifies the brochure details (see blueprint, Contact Us page).
export const contactInfo = {
  email: "[your email address]",
  phone: "[your phone number]",
  address: "[your office address]",
};

// Only add verified official profiles, e.g. { label: "LinkedIn", href: "https://..." }.
export const socialLinks = [];

export const pageMeta = {
  "/": {
    title: "Sarthi AI Solutions | Geospatial Intelligence, GIS & AI Solutions",
    description:
      "Sarthi AI Solutions transforms complex geospatial data into actionable intelligence through GIS, AI and advanced technology.",
  },
  "/about": {
    title: "About Us | Sarthi AI Solutions",
    description:
      "A geospatial intelligence and technology company combining GIS, remote sensing, environmental analysis, AI and software capabilities.",
  },
  "/competency": {
    title: "Our Competency | GIS, Drone Surveys, EIA, DMP & AI/ML | Sarthi AI",
    description:
      "Site suitability analysis, environmental impact assessment, disaster management plans, drone surveys, AI/ML and spatial analytics.",
  },
  "/projects": {
    title: "Projects & Applications | Sarthi AI Solutions",
    description:
      "GIS case studies, land intelligence applications and drone mapping demonstrations from Sarthi AI Solutions.",
  },
  "/careers": {
    title: "Careers | Sarthi AI Solutions",
    description:
      "Explore career areas and internships in GIS, remote sensing, AI/ML and software development at Sarthi AI Solutions.",
  },
  "/careers/apply": {
    title: "Apply | Careers at Sarthi AI Solutions",
    description: "Submit your application or resume to Sarthi AI Solutions.",
  },
  "/newsletter": {
    title: "Sarthi Newsletter | GIS, Remote Sensing & AI Insights",
    description:
      "Insights, technology updates and practical applications across geospatial intelligence, remote sensing, AI and sustainable development.",
  },
  "/contact": {
    title: "Contact Us | Geospatial Project Enquiry | Sarthi AI",
    description:
      "Discuss your geospatial, environmental or AI project with Sarthi AI Solutions.",
  },
  "/privacy": {
    title: "Privacy Policy | Sarthi AI Solutions",
    description: "How Sarthi AI Solutions collects, uses and protects personal information.",
  },
  "/terms": {
    title: "Terms of Use | Sarthi AI Solutions",
    description: "Terms governing the use of the Sarthi AI Solutions website.",
  },
  "/recruitment-privacy": {
    title: "Recruitment Privacy Notice | Sarthi AI Solutions",
    description: "How Sarthi AI Solutions handles information submitted by job applicants.",
  },
};

export const notFoundMeta = {
  title: "Page not found | Sarthi AI Solutions",
  description: "The page you are looking for could not be found.",
};
