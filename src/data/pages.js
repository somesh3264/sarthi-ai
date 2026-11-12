import { sampleArticles } from "./sampleArticles";

// Copy for Projects, Careers and Newsletter, from the website blueprint (v1.0).
// Blueprint rule: never present suggested roles as live vacancies, illustrative imagery as client
// work, or an in-development platform as a finished product.

/* ---------------------------------- Projects --------------------------------- */

export const projectsIntro =
  "How Sarthi AI applies geospatial, environmental and AI-enabled capabilities. Every item is labelled as a completed project, a capability in development, a demonstration or an illustrative example.";

export const featuredPlatform = {
  title: "City Master Plan & Urban Land Intelligence",
  status: "In development",
  tagline:
    "Bringing cadastral information, land-use planning and geospatial technology together to support smarter, more informed urban development.",
  body: "We are developing a GIS-powered City Master Plan and Urban Land Intelligence platform that brings land-parcel information, cadastral boundaries and planning layers into an interactive digital environment. It is designed to make complex spatial information easier to explore, understand and use in planning-related decisions.",
  stack: ["GIS", "PostGIS", "AI / ML", "Web & Mobile"],
  mobile: {
    title: "Mobile application preview",
    body: "The platform is also being developed for mobile access, bringing land-search and map-based information closer to users.",
    features: [
      "Parcel search using current location",
      "Search by address or Khasra details",
      "Nearby landmark search",
      "A map-oriented experience",
    ],
  },
};

// Add client-approved case studies here (shown at /projects/<slug>). Shape:
// {
//   slug: "solar-site-screening-rajasthan",   // URL-safe, unique
//   title, sector, location,                    // location only where the client permits
//   challenge, studyArea, approach, outcome,    // short paragraphs
//   tools: ["QGIS", "Sentinel-2"], outputs: ["Suitability maps", "Technical report"],
//   image, imageAlt, imageCredit,               // approved visual (import it from src/assets)
// }
export const caseStudies = [];

export const demonstrationTypes = [
  "Sample parcel mapping",
  "Land-use visualisation",
  "Interactive GIS views",
  "Automated report examples",
  "Technical demos",
];

export const imageryExamples = [
  {
    title: "Bhadla Solar Park, Rajasthan",
    theme: "Land transformation and site monitoring",
    detail: "Same-area comparison between 2016 and January 2025.",
  },
  { title: "Delhi and the Yamuna River", theme: "Urban and infrastructure mapping" },
  { title: "Singrauli coalfield", theme: "Mining and natural-resource mapping" },
  { title: "Punjab plains near Bathinda", theme: "Agriculture and land use" },
  { title: "Brahmaputra River at Majuli", theme: "Flood and river risk" },
  { title: "Sundarbans", theme: "Forest and coastal ecosystems" },
  { title: "Mumbai and Thane Creek", theme: "Coastal city and infrastructure" },
];

export const imageryCaption =
  "Public imagery shown for illustration; not client project work. Source and licence credits are retained with each image.";

/* ---------------------------------- Careers ---------------------------------- */

export const careersHero = {
  title: "Build Your Future with Sarthi AI",
  body: "Be part of a team combining geospatial intelligence, artificial intelligence and technology to solve real-world challenges. Explore opportunities to learn, innovate and contribute to meaningful projects.",
};

// Proposed employer-value messages: confirm they reflect the actual working environment.
export const whyWorkWithUs = [
  {
    title: "Work on real-world projects",
    body: "Contribute to GIS, urban planning, environmental and infrastructure applications.",
  },
  {
    title: "Explore emerging technologies",
    body: "Work with GIS, AI/ML, remote sensing, spatial analytics and software development.",
  },
  {
    title: "Learn and grow",
    body: "Build technical knowledge through practical work and collaboration.",
  },
  {
    title: "Make an impact",
    body: "Contribute ideas and solutions that support smarter, more sustainable decisions.",
  },
];

export const careerAreas = [
  {
    title: "GIS & Geospatial Technology",
    roles: "GIS Analyst, GIS Developer, Spatial Data Specialist",
    skills: "QGIS / ArcGIS, PostGIS, spatial processing",
  },
  {
    title: "Drone & Remote Sensing",
    roles: "Remote Sensing Analyst, Photogrammetry Specialist, Drone Survey Associate",
    skills: "Imagery processing and terrain products",
  },
  {
    title: "AI & Machine Learning",
    roles: "AI/ML Engineer, Computer Vision Engineer, Data Scientist",
    skills: "Python, ML/DL, OpenCV and image analytics",
  },
  {
    title: "Software Development",
    roles: "Full Stack Developer, Python Developer, Mobile Application Developer",
    skills: "React, APIs, databases and application development",
  },
  {
    title: "Environmental & Planning",
    roles: "Environmental Analyst, EIA Specialist, Urban Planning GIS Associate",
    skills: "Assessment, mapping and planning context",
  },
];

// Only add management-approved, active requisitions (shown at /careers/<id>). Shape:
// { id: "gis-analyst-2027", title, area, type: "Full-time" | "Internship", location,
//   mode: "On-site" | "Hybrid" | "Remote", experience, status: "Open" | "Closing soon",
//   summary, responsibilities: [], skills: [] }
export const openings = [];

export const internshipAreas = [
  {
    title: "GIS & Remote Sensing",
    body: "GIS mapping, spatial analysis, satellite imagery and drone data processing.",
  },
  {
    title: "AI/ML",
    body: "Machine learning, computer vision, image processing and geospatial AI applications.",
  },
  {
    title: "Web Development",
    body: "React, Python, APIs, databases and GIS application development.",
  },
  {
    title: "Drone Survey & Photogrammetry",
    body: "Drone data acquisition, orthomosaic generation, mapping and terrain modelling.",
  },
];

export const applicationSteps = [
  { title: "Choose a role", description: "Apply for an open position, or send a general application." },
  { title: "Complete the form", description: "Share your details, skills and links, and upload your resume." },
  { title: "We review", description: "Our team reviews every application against current and future needs." },
  { title: "We get in touch", description: "If there's a match, we contact you about next steps." },
];

/* --------------------------------- Newsletter -------------------------------- */

export const newsletterHero = {
  title: "Insights from a world shaped by location and data",
  body: "Explore perspectives, technology updates and practical applications across geospatial intelligence, remote sensing, AI and sustainable development.",
};

export const newsletterCategories = [
  {
    id: "gis",
    title: "GIS & Geospatial Technology",
    themes: "GIS methods, spatial data, cadastral mapping, PostGIS and location intelligence.",
  },
  {
    id: "ai-remote-sensing",
    title: "AI/ML & Remote Sensing",
    themes: "Image classification, computer vision, change detection and geospatial AI.",
  },
  {
    id: "drone",
    title: "Drone & Aerial Survey",
    themes: "Photogrammetry, orthomosaics, terrain models, field workflows and applications.",
  },
  {
    id: "environment",
    title: "Environment & Disaster Management",
    themes: "EIA, environmental monitoring, hazards, exposure, vulnerability and resilience.",
  },
  {
    id: "urban",
    title: "Land Intelligence & Urban Planning",
    themes: "Master plans, zoning, land-use visualisation, parcel intelligence and planning.",
  },
  {
    id: "updates",
    title: "Sarthi Updates",
    themes: "Company announcements, approved project updates, events and service news.",
  },
];

// Add published articles here (shown at /newsletter/<slug>). Shape:
// {
//   slug: "what-is-lulc-classification", category: "gis" (an id above), title,
//   date: "YYYY-MM-DD", author: "Sarthi AI editorial team" (only if approved), summary,
//   image, imageAlt, imageCredit,
//   body: [{ heading: "Optional section heading", paragraphs: ["...", "..."] }],
//   sources: [{ label: "Source name", url: "https://..." }],
// }
// TODO before launch: remove the sample articles (and src/data/sampleArticles.js) and add real ones.
export const articles = [...sampleArticles];
