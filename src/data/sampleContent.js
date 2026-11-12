// SAMPLE CONTENT — for previewing the Newsletter, Projects and Careers layouts only.
// Every item is flagged `sample: true` and shown with a "Sample" label. None of it is real
// client work, a real vacancy or published writing. Remove it before launch (see the TODO
// notes above `caseStudies`, `openings` and `articles` in pages.js).
import solarFarm from "../assets/photos/solar-farm.jpg";
import miningQuarry from "../assets/photos/mining-quarry.jpg";
import droneMountains from "../assets/photos/drone-mountains.jpg";
import topoMap from "../assets/photos/topo-map.jpg";

export const sampleArticles = [
  {
    sample: true,
    slug: "sample-gis-site-suitability-for-solar",
    category: "gis",
    title: "How GIS site suitability analysis shortlists solar sites",
    date: "2026-11-05",
    summary:
      "Layering terrain, land use, access and constraints to narrow a large region down to a few strong candidate sites.",
    image: solarFarm,
    imageAlt: "Rows of solar panels",
    imageCredit: "Illustrative image.",
    body: [
      {
        heading: "Start with the constraints",
        paragraphs: [
          "Suitability analysis usually begins by removing land that cannot be used: protected areas, water bodies, settlements and regulatory exclusion zones.",
          "What remains is then scored on factors such as slope, solar irradiance, distance to roads and substations, and current land use.",
        ],
      },
      {
        heading: "From scores to a shortlist",
        paragraphs: [
          "Multi-criteria decision analysis combines these factors with weights agreed with the project team, producing a ranked map of candidate areas for field checks.",
        ],
      },
    ],
  },
  {
    sample: true,
    slug: "sample-what-a-drone-survey-delivers",
    category: "drone",
    title: "From drone flight to orthomosaic: what a drone survey delivers",
    date: "2026-10-28",
    summary:
      "A walk through the typical outputs of a drone survey, from orthomosaic maps to elevation models and contours.",
    image: droneMountains,
    imageAlt: "Drone flying over mountainous terrain",
    imageCredit: "Illustrative image.",
    body: [
      {
        heading: "Capturing the site",
        paragraphs: [
          "A drone flies a planned grid over the site, capturing overlapping images that can be stitched together and geo-referenced.",
        ],
      },
      {
        heading: "Typical outputs",
        paragraphs: [
          "Processing produces an orthomosaic map, digital surface and terrain models, contours and, where needed, cut-and-fill volumes, all ready to use in GIS.",
        ],
      },
    ],
  },
  {
    sample: true,
    slug: "sample-mapping-disaster-risk",
    category: "environment",
    title: "Mapping disaster risk: hazard, exposure and vulnerability",
    date: "2026-10-20",
    summary:
      "Why risk maps combine three layers, and how they feed into preparedness and emergency response planning.",
    image: topoMap,
    imageAlt: "Topographic contour map",
    imageCredit: "Illustrative image.",
    body: [
      {
        paragraphs: [
          "Risk is more than where a hazard might occur. It also depends on what is exposed, such as people and infrastructure, and how vulnerable they are.",
          "Mapping all three in GIS shows where preparedness, evacuation planning and mitigation will make the biggest difference.",
        ],
      },
    ],
  },
];

export const sampleCaseStudies = [
  {
    sample: true,
    slug: "sample-solar-site-screening",
    title: "Screening land for a utility-scale solar project",
    sector: "Renewable Energy",
    location: "Sample location",
    challenge:
      "A developer needed to narrow a large district down to a handful of buildable sites before committing to land acquisition and field surveys.",
    studyArea: "Sample study area of several hundred square kilometres.",
    approach:
      "Exclusion zones were removed first, then remaining land was scored on slope, irradiance, land use and distance to roads and substations using multi-criteria analysis.",
    tools: ["GIS", "Satellite imagery", "MCDA", "Solar irradiance data"],
    outputs: ["Suitability maps", "Ranked site shortlist", "Technical report"],
    outcome: "A ranked shortlist of candidate sites ready for field verification.",
    image: solarFarm,
    imageAlt: "Solar farm",
    imageCredit: "Illustrative image.",
  },
  {
    sample: true,
    slug: "sample-mine-drone-survey",
    title: "Drone survey and change monitoring at a mining site",
    sector: "Mining & Natural Resources",
    location: "Sample location",
    challenge:
      "Site managers needed up-to-date terrain data and a way to track land-cover change around the active pit.",
    approach:
      "Repeat drone surveys produced orthomosaics and elevation models, compared over time to measure excavation and surrounding land-cover change.",
    tools: ["Drone survey", "Photogrammetry", "DEM / DSM", "Change detection"],
    outputs: ["Orthomosaic maps", "Cut-and-fill volumes", "Change-detection maps"],
    outcome: "Regular, measurable updates on site progress and environmental change.",
    image: miningQuarry,
    imageAlt: "Open-cast mining quarry",
    imageCredit: "Illustrative image.",
  },
];

// Roles taken from the blueprint's suggested recruitment categories; NOT approved vacancies.
export const sampleOpenings = [
  {
    sample: true,
    id: "sample-gis-analyst",
    title: "GIS Analyst / GIS Developer",
    area: "GIS & Geospatial Technology",
    type: "Full-time",
    location: "Bhopal",
    mode: "On-site",
    experience: "1–3 years",
    status: "Open",
    summary:
      "Work on geospatial datasets, cadastral mapping, spatial analysis and GIS-based applications.",
    responsibilities: [
      "Prepare and maintain spatial datasets and cadastral layers",
      "Carry out spatial analysis for site suitability and planning projects",
      "Build maps and GIS outputs for reports and dashboards",
    ],
    skills: ["QGIS / ArcGIS", "PostGIS / PostgreSQL", "Spatial data processing", "GeoJSON", "Python fundamentals"],
  },
  {
    sample: true,
    id: "sample-full-stack-developer",
    title: "Full Stack Developer",
    area: "Software Development",
    type: "Full-time",
    location: "Bhopal",
    mode: "Hybrid",
    experience: "2–4 years",
    status: "Closing soon",
    summary:
      "Develop web and mobile-enabled applications, interactive GIS platforms, APIs and data-driven dashboards.",
    responsibilities: [
      "Build web interfaces and APIs for GIS applications",
      "Work with spatial databases and map libraries",
    ],
    skills: ["React", "Node.js / Python / FastAPI", "REST APIs", "PostgreSQL / PostGIS", "JavaScript"],
  },
  {
    sample: true,
    id: "sample-gis-rs-intern",
    title: "GIS & Remote Sensing Intern",
    area: "GIS & Geospatial Technology",
    type: "Internship",
    location: "Bhopal",
    mode: "On-site",
    experience: "Students and recent graduates",
    status: "Open",
    summary: "Learn GIS mapping, spatial analysis, satellite imagery and drone data processing on live work.",
    responsibilities: ["Support mapping and data preparation", "Assist with satellite and drone image processing"],
    skills: ["Basic GIS knowledge", "Interest in remote sensing"],
  },
];
