// SAMPLE ARTICLES — for previewing the Newsletter layout only. Every item is flagged `sample: true`
// and shown with a "Sample" label. Remove them (see `articles` in pages.js) before launch.
import solarFarm from "../assets/photos/solar-farm.jpg";
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
