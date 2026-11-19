// Website copy. Facts come from the Sarthi AI website blueprint (v1.0, 04 November 2026).
// The homepage copy (`home`, at the end) was rewritten for the redesign; other pages still use
// the blueprint wording until they are rebuilt.

export const company = {
  name: "Sarthi AI Solutions",
  introLine: "We turn Geospatial Data into Resilient Decisions.",
  intro:
    "Sarthi AI Solutions transforms complex geospatial data into actionable intelligence through GIS, AI and advanced technology.",
  about:
    "Sarthi AI Solutions is a geospatial intelligence and technology company combining GIS, remote sensing, environmental analysis, artificial intelligence and software capabilities. We work to transform complex location-based and operational data into clear insights that support planning, assessment and decision-making across land, infrastructure, industry and the environment.",
  vision:
    "To enable sustainable development and resilient infrastructure through AI-driven geospatial and environmental solutions.",
  mission:
    "To deliver accurate, actionable insights through geospatial technology and intelligent analysis; strengthen regulatory compliance, environmental management and ESG objectives; and help organisations reduce risk and improve resilience against natural and industrial hazards.",
  approach:
    "We bring geospatial data, environmental context and intelligent technology together to help organisations understand locations, assess conditions and evaluate options. Our work may combine field data, satellite and aerial imagery, spatial analysis, software and decision-support outputs according to the needs of each engagement.",
  sustainability:
    "Promoting environmentally responsible development, nurturing young talent, minimising ecological impact and strengthening resilience against disasters through innovation and best practice.",
};

export const competencyIntro =
  "End-to-end geospatial, environmental and AI-enabled services powering decisions across industry, infrastructure, power and renewable energy.";

export const serviceGroups = [
  { name: "Planning & Compliance", services: ["site-suitability", "eia"] },
  { name: "Risk & Survey", services: ["dmp", "drone-surveys"] },
  { name: "Intelligence & Analytics", services: ["ai-ml", "analytics"] },
];

export const services = [
  {
    id: "site-suitability",
    number: "01",
    title: "Geospatial & Solar Project Site Suitability Analysis",
    card: "GIS-based assessment of land and project locations using terrain, land-use, access, environmental constraints and other relevant spatial factors to support site selection.",
    summary:
      "GIS-based assessment of land and project locations using terrain, land-use, access, environmental constraints and other relevant spatial factors to support site selection for solar and other industrial projects.",
    capabilities: [
      "Land-use / land-cover (LULC) analysis",
      "Topography, slope and aspect analysis",
      "Temporal change monitoring",
      "Solar irradiance and shading analysis",
      "Proximity analysis for roads, drainage, water and settlements",
      "Environmental and social constraints mapping",
      "Regulatory and exclusion-zone screening",
      "Site ranking and feasibility mapping",
      "Cropping pattern, crop area and production estimation; insurance compensation estimation where in scope",
    ],
    outputsLabel: "Typical outputs",
    outputs: [
      "GIS-based suitability maps",
      "Technical reports with site recommendations",
      "Decision-support dashboards",
      "Project progress monitoring tools and reports",
    ],
  },
  {
    id: "eia",
    number: "02",
    title: "Environmental Impact Assessment (EIA)",
    card: "Geospatial and environmental analysis to support baseline studies, impact assessment, constraint mapping and practical environmental management recommendations.",
    summary:
      "Geospatial and environmental analysis to support baseline studies, impact assessment, constraint mapping and practical environmental management recommendations.",
    capabilities: [
      "Baseline environmental data collection",
      "Air, water, soil, noise and ecological assessments",
      "Impact identification, prediction and evaluation",
      "Risk assessment and mitigation planning",
      "Environmental Management Plans (EMP)",
      "Regulatory documentation and compliance support",
    ],
    outputsLabel: "Typical outputs",
    outputs: [
      "EIA / EMP reports",
      "Thematic environmental maps",
      "Stakeholder- and regulator-ready documentation",
    ],
  },
  {
    id: "dmp",
    number: "03",
    title: "Disaster Management Plan (DMP) Preparation",
    card: "Risk-informed planning support through hazard, exposure and vulnerability mapping, GIS-based risk visualisation, preparedness and response planning.",
    summary:
      "Risk-informed planning support through hazard, exposure and vulnerability mapping, GIS-based risk visualisation, and inputs for preparedness, mitigation and response planning.",
    capabilities: [
      "Hazard, vulnerability and risk assessment (HVRA)",
      "Natural and technological disaster mapping",
      "Emergency response planning and SOPs",
      "Resource and evacuation planning",
      "GIS-based risk and emergency maps",
      "Alignment with relevant national disaster management frameworks",
    ],
    outputsLabel: "Typical outputs",
    outputs: [
      "On-site and off-site Disaster Management Plans",
      "Risk and emergency response maps",
      "Human settlement analysis",
    ],
  },
  {
    id: "drone-surveys",
    number: "04",
    title: "Drone & Aerial Surveys",
    card: "UAV-based data capture and mapping, including orthomosaics, elevation products and spatial datasets that help organisations inspect sites and understand ground conditions.",
    summary:
      "UAV-based data capture and mapping, including orthomosaics, elevation products and spatial datasets that help organisations inspect sites, measure change and understand ground conditions.",
    capabilities: [
      "High-resolution aerial mapping and orthophotos",
      "DEM, DSM / DTM and contour mapping",
      "Cut-and-fill analysis and feature extraction",
      "Solar site inspection and layout validation",
      "Environmental monitoring and change detection",
      "Crop identification and damage assessment",
      "Disaster damage assessment and rapid surveys",
    ],
    outputsLabel: "Typical outputs",
    outputs: [
      "Orthomosaic maps",
      "3D terrain and surface models",
      "Geo-referenced imagery for GIS integration",
      "Engineering contours, thematic maps and change-detection outputs",
    ],
  },
  {
    id: "ai-ml",
    number: "05",
    title: "AI & Machine Learning-Enabled Solutions",
    card: "Applied AI and machine learning for image classification, feature extraction, change detection, object recognition and workflow automation.",
    summary:
      "Applied AI and machine learning for image classification, feature extraction, change detection, object recognition and workflow automation using geospatial and other relevant data.",
    capabilities: [
      "Automated LULC classification",
      "Solar potential estimation",
      "Crop yield prediction and damage assessment",
      "Site suitability optimisation using ML",
      "Environmental change detection and trend analysis",
      "Image and video analytics from satellite and drone data",
      "Anomaly detection for environmental and safety monitoring",
    ],
    outputsLabel: "Typical outcomes",
    outputs: [
      "Higher accuracy and faster turnaround where validated",
      "Data-driven decisions",
      "AI-driven chatbots",
      "Relevant predictions and forecasts",
    ],
  },
  {
    id: "analytics",
    number: "06",
    title: "Data Analytics & Decision Intelligence",
    card: "Transform spatial and non-spatial datasets into clear analysis, visualisations and decision-support outputs.",
    summary:
      "Transform spatial and non-spatial datasets into clear analysis, visualisations and decision-support outputs that help teams identify patterns, compare options and plan next steps.",
    capabilities: [
      "Spatial and non-spatial data integration",
      "Predictive and scenario-based analysis",
      "Multi-criteria decision analysis (MCDA)",
      "Risk modelling and impact forecasting",
      "Interactive dashboards and dynamic reports",
    ],
    outputsLabel: "Typical outcomes",
    outputs: [
      "Faster evidence-based decisions",
      "Reduced project risk and uncertainty",
      "Monitoring dashboards for planning accuracy and compliance",
    ],
  },
];

export const supportingCapabilities = [
  {
    title: "Satellite Imagery & Earth Observation",
    points: [
      "Wide-area coverage",
      "Repeat observation",
      "Multispectral insight",
      "Historic archives",
    ],
  },
  {
    title: "GIS & Remote Sensing",
    points: [
      "Spatial data creation and standardisation",
      "Image processing",
      "Classification",
      "Prediction",
    ],
  },
  {
    title: "AI/ML & Visual Applications",
    points: [
      "AI-driven ranking and constraint optimisation for site suitability",
      "Predictive impact assessment and mitigation scenarios for EIA",
      "Early warning indicators and damage assessment for disaster management",
      "Image and video analytics and automated monitoring for drone workflows",
      "Satellite imagery, thematic maps, drone visuals, 3D models, GIS risk maps and analytics dashboards",
    ],
  },
];

export const sectors = [
  {
    id: "renewable-energy",
    name: "Renewable Energy (Solar & Wind)",
    card: "Geospatial screening and site suitability insights considering land characteristics, terrain, access and environmental constraints.",
    description:
      "Geospatial screening and site suitability insights for renewable energy projects, considering land characteristics, terrain, access, environmental constraints and location context.",
    themes: ["Site suitability", "Solar analysis", "Drone inspection", "Change monitoring"],
    services: ["site-suitability", "drone-surveys", "ai-ml"],
  },
  {
    id: "industrial",
    name: "Industrial & Manufacturing",
    card: "Location intelligence and spatial analysis for site assessment, environmental planning and infrastructure considerations.",
    description:
      "Location intelligence and spatial analysis to support industrial site assessment, environmental planning, operational context and infrastructure considerations.",
    themes: ["Site selection", "EIA support", "Proximity analysis", "Monitoring"],
    services: ["site-suitability", "eia", "analytics"],
  },
  {
    id: "infrastructure",
    name: "Infrastructure & Urban Development",
    card: "Spatial insights for land, infrastructure and urban planning, including accessibility, land-use and development suitability.",
    description:
      "Spatial insights for land, infrastructure and urban planning, including terrain, land-use context, accessibility, environmental constraints and development suitability.",
    themes: ["Cadastral intelligence", "Land-use planning", "GIS applications", "Dashboards"],
    services: ["site-suitability", "analytics", "dmp"],
  },
  {
    id: "mining",
    name: "Mining & Natural Resources",
    card: "Remote-sensing support for terrain, land-cover monitoring, resource-area context and environmental change analysis.",
    description:
      "Geospatial and remote-sensing support for terrain understanding, land-cover monitoring, resource-area context, environmental assessment and change analysis.",
    themes: ["Drone surveys", "Terrain models", "LULC", "Impact analysis"],
    services: ["drone-surveys", "eia", "ai-ml"],
  },
  {
    id: "power",
    name: "Power",
    card: "Spatial analysis for power-sector planning, site assessment, asset and corridor context, and risk-aware decisions.",
    description:
      "Spatial analysis to support power-sector planning, site assessment, asset and corridor context, environmental considerations and risk-aware decision-making.",
    themes: ["Corridor mapping", "Site suitability", "Risk analysis", "Monitoring"],
    services: ["site-suitability", "eia", "dmp"],
  },
  {
    id: "government",
    name: "Government & Public Sector",
    card: "GIS-based planning and decision support for land, public assets, environmental management and disaster preparedness.",
    description:
      "GIS-based planning and decision support for public-sector programmes, land and asset information, environmental management, urban development and disaster preparedness.",
    themes: ["Land intelligence", "Planning layers", "Public dashboards", "DMP support"],
    services: ["dmp", "analytics", "eia"],
  },
];

/* --------------------------------- Homepage --------------------------------- */
// Rewritten for the redesign. Anything in `needsClient` (and every `placeholder: true` item)
// is a gap only the client can fill: it renders as a marked placeholder and must be replaced
// or removed before launch.

export const home = {
  hero: {
    eyebrow: "Geospatial & environmental intelligence · Bhopal, India",
    title: "Know the ground before you build on it.",
    body: "We map terrain, land use, environmental constraints and risk from satellite, drone and field data, then hand your team the suitability maps, EIA reports and dashboards it needs to approve, plan and monitor a project.",
    primaryCta: { label: "Discuss your project", to: "/contact" },
    secondaryCta: { label: "See what we deliver", to: "#services" },
    plate: {
      place: "Bhadla Solar Park, Rajasthan",
      coords: "27.53° N · 71.92° E",
      sensor: "Sentinel-2 true colour",
      before: "Feb 2017",
      after: "Jan 2025",
      note: "Public satellite imagery shown as an example of change analysis.",
    },
  },

  // Proof strip: figures must come from the client. Do not publish the placeholders.
  proof: [
    { value: "[ ## ]", label: "Projects delivered", placeholder: true },
    { value: "[ ## km² ]", label: "Area mapped and analysed", placeholder: true },
    { value: "[ ## ]", label: "States / districts covered", placeholder: true },
    { value: "[ #### ]", label: "Year founded", placeholder: true },
  ],

  services: {
    eyebrow: "What you get",
    title: "Six services. Each ends in something your team can use.",
    body: "Every engagement finishes with a map, a report or a tool, not a slide deck. Pick one service or combine them across a project's life, from site selection to monitoring.",
    items: {
      "site-suitability": {
        title: "Site suitability for solar and industrial projects",
        outcome: "Rank candidate sites on terrain, slope, irradiance, land use, access and exclusion zones before you commit to land.",
        deliverables: ["Suitability maps", "Site ranking report", "Feasibility dashboard"],
      },
      eia: {
        title: "Environmental Impact Assessment",
        outcome: "Baseline studies, impact prediction and an Environmental Management Plan, documented the way regulators expect to read them.",
        deliverables: ["EIA / EMP report", "Thematic maps", "Compliance documents"],
      },
      dmp: {
        title: "Disaster Management Plans",
        outcome: "Hazard, vulnerability and risk mapped for your site and its surroundings, turned into on-site and off-site plans with evacuation routes and SOPs.",
        deliverables: ["On-site / off-site DMP", "Risk maps", "Emergency SOPs"],
      },
      "drone-surveys": {
        title: "Drone and aerial surveys",
        outcome: "High-resolution orthomosaics, elevation models and contours of your site, ready to load into GIS or CAD.",
        deliverables: ["Orthomosaics", "DEM / DSM / DTM", "Contours and cut-fill"],
      },
      "ai-ml": {
        title: "AI and machine learning on imagery",
        outcome: "Models that classify land cover, detect change and flag anomalies across satellite and drone imagery, so monitoring scales beyond what a team can check by eye.",
        deliverables: ["Land-cover classification", "Change detection", "Yield and damage estimates"],
      },
      analytics: {
        title: "Dashboards and decision analytics",
        outcome: "Spatial and project data combined into dashboards and scenario models that let you compare options and track progress.",
        deliverables: ["Web dashboards", "Multi-criteria scenarios", "Risk forecasts"],
      },
    },
  },

  imagery: {
    eyebrow: "The view from above",
    title: "Change you can measure, from orbit.",
    body: "Multispectral satellites revisit the same ground every few days and their archives go back years. That is how we see what a site was, what it is now and what is changing around it. These are public Sentinel-2 scenes of the kinds of places our clients work.",
    credit: "Contains modified Copernicus Sentinel data, processed for display.",
  },

  explore: {
    eyebrow: "The view from above",
    title: "Explore the ground we work on.",
    body: "Satellites revisit every one of these places every few days, and their archives go back years. Pick a place on the map: these are the kinds of landscapes our clients build on, mine, farm and protect.",
    credit: "Locator: NASA Blue Marble. Scenes: Sentinel-2 L2A, contains modified Copernicus Sentinel data. Bhopal: Sentinel-2 cloudless 2016 by EOX IT Services GmbH (CC BY 4.0).",
  },

  story: {
    eyebrow: "Inside an analysis",
    title: "How a site-suitability study is built.",
    body: "One area west of Bhopal, about 25 × 17 km, taken from raw imagery to a short list of sites. Scroll to add each layer.",
    note: "Illustrative model for this page, not a client study. Imagery: Sentinel-2 cloudless 2016 by EOX (CC BY 4.0). Elevation: Terrain Tiles on AWS Open Data (SRTM and other public sources).",
    steps: [
      {
        label: "Start with the imagery",
        body: "Sentinel-2 imagery at 10 m: fields, forest, a lake, villages and the edge of the city. This is the raw view every study starts from.",
        legend: [],
      },
      {
        label: "Add the terrain",
        body: "An elevation model shows hills, valleys and slope. Contours every 20 m; steeper ground costs more to build on and drains differently.",
        legend: [{ name: "Contour, 20 m", color: "#fff6d6" }],
      },
      {
        label: "Classify land cover",
        body: "Each 90 m cell is labelled from the imagery. In a real study this is a trained model checked against field data.",
        legend: [
          { name: "Water", color: "#1d6fa5" },
          { name: "Dense vegetation", color: "#146e3e" },
          { name: "Cropland and grass", color: "#8fd26e" },
          { name: "Built-up and bare", color: "#e2965a" },
        ],
      },
      {
        label: "Map the constraints",
        body: "Rule out water and a 250 m buffer around it, dense vegetation, built-up land and slopes over 10 %. Real projects add legal limits such as forest land and protected areas.",
        legend: [
          { name: "Water", color: "#1d6fa5" },
          { name: "Excluded", color: "#c23b3b" },
        ],
      },
      {
        label: "Rank what is left",
        body: "The remaining land is scored on slope and cover. The three largest high-scoring areas, A to C, go forward for a field visit and a closer look.",
        legend: [
          { name: "High", color: "#17784a" },
          { name: "Medium", color: "#8fe07c" },
          { name: "Low", color: "#f0be5a" },
          { name: "Excluded", color: "#8a8a8a" },
        ],
      },
    ],
  },

  // Example engagements for the tabbed switcher. Illustrative until real case studies are added
  // to `caseStudies` in data/pages.js; outcome figures must come from the client.
  engagements: {
    eyebrow: "What an engagement looks like",
    title: "The question, the work and what you get.",
    items: [
      {
        id: "solar",
        tab: "Solar developer",
        media: "renewable-energy",
        scene: "Bhadla Solar Park, Rajasthan",
        question: "Which candidate parcels in western Rajasthan should we secure for a utility-scale solar park?",
        work: [
          "Slope, irradiance, land-use and access layers for every parcel",
          "Exclusion zones: water, settlements, forest and protected land",
          "Multi-criteria ranking reviewed with your land team",
        ],
        deliver: ["Suitability maps", "Site ranking report", "Feasibility dashboard"],
      },
      {
        id: "mining",
        tab: "Mining operator",
        media: "mining",
        scene: "Singrauli coalfield",
        question: "How has land cover changed around our lease since operations began, and what do we report for environmental clearance?",
        work: [
          "Land-cover maps from the satellite archive, year by year",
          "Change detection around the lease boundary and buffer",
          "Baseline and impact chapters for the EIA",
        ],
        deliver: ["Change-detection maps", "EIA / EMP chapters", "Monitoring dashboard"],
      },
      {
        id: "city",
        tab: "City planning team",
        media: "infrastructure",
        scene: "Delhi and the Yamuna River",
        question: "Where is the city growing, and which parcels, corridors and services does the next master plan need to cover?",
        work: [
          "Land-use change mapped from years of satellite imagery",
          "Cadastral parcels joined to planning and infrastructure layers",
          "Growth scenarios compared with the planning team",
        ],
        deliver: ["Land-use change maps", "Master-plan GIS layers", "Planning dashboard"],
      },
    ],
  },

  sectors: {
    eyebrow: "Who we work with",
    title: "For teams accountable for land, assets and risk.",
    items: {
      "renewable-energy": "Screen land for solar and wind before acquisition, then monitor construction from above.",
      industrial: "Choose plant sites, map environmental constraints and prepare for environmental clearance.",
      infrastructure: "Land-use, access and terrain layers for master plans, corridors and urban growth.",
      mining: "Terrain models, land-cover change and impact monitoring around lease areas.",
      power: "Corridor mapping, site assessment and hazard exposure for power assets.",
      government: "Planning layers, public dashboards and disaster preparedness for departments and districts.",
    },
  },

  process: {
    eyebrow: "How a project runs",
    title: "From your question to an answer on a map.",
    steps: [
      { label: "Brief", body: "We agree the decision you need to make, the area of interest, the constraints and what the output must look like." },
      { label: "Data", body: "We gather satellite, drone, field and reference data, and check it is fit for the question." },
      { label: "Analysis", body: "GIS, remote-sensing and AI methods produce the layers and models behind the answer." },
      { label: "Delivery", body: "You receive maps, reports and dashboards your team can act on, and we walk you through them." },
    ],
  },

  why: {
    eyebrow: "Why Sarthi AI",
    title: "One team from the first map to the final report.",
    points: [
      { title: "Geospatial and environmental under one roof", body: "The team that maps the site also writes the environmental assessment, so nothing is lost between consultants." },
      { title: "Documented, compliance-ready methods", body: "Data sources and methods are recorded, and reports are prepared for regulatory review." },
      { title: "Scoped to your project", body: "No packaged product: the analysis is designed around your site, your decision and your timeline." },
      { title: "Monitoring on web and mobile", body: "Dashboards and map apps let your team check progress and site conditions from anywhere." },
    ],
    featured: {
      status: "In development",
      title: "City Master Plan & Urban Land Intelligence",
      body: "Cadastral parcels, planning layers and geospatial analysis in one interactive GIS for urban planners, on web and mobile.",
    },
    testimonial: {
      placeholder: true,
      quote: "[ Client quote: one or two sentences on a result Sarthi AI delivered. ]",
      who: "[ Name, role, organisation: with written permission to publish ]",
    },
  },

  cta: {
    title: "Tell us about your site.",
    body: "Share a location, a deadline and the decision you need to make. We will come back with an approach, the data we would use and what you would receive.",
    primary: { label: "Discuss your project", to: "/contact" },
  },
};
