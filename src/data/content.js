// Website copy, taken from the Sarthi AI website blueprint (v1.0, 04 November 2026).
// Items the blueprint marks "proposed" or "needs confirmation" should be approved before launch.

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

export const homeFilm = {
  heading: "See the world through a geospatial lens.",
  body: "From satellite and aerial imagery to location intelligence, we turn the view from above into insight for decisions on the ground.",
};

export const whoWeAre = {
  heading: "Geospatial intelligence. Real-world impact.",
  body: "We bring together geospatial science, environmental understanding and intelligent technology to help organisations assess places, understand risk and make informed decisions.",
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

// Proposed process language from the blueprint; adjust if the delivery workflow differs.
export const howWeWork = [
  {
    title: "Understand the requirement",
    description: "Clarify the project objective, location, constraints and expected outputs.",
  },
  {
    title: "Analyse data and context",
    description: "Review spatial, environmental, operational and available reference datasets.",
  },
  {
    title: "Develop geospatial / AI insights",
    description: "Apply suitable GIS, remote-sensing, analytical and AI-enabled methods.",
  },
  {
    title: "Deliver decision-ready outputs",
    description: "Present maps, reports, dashboards and practical findings for next steps.",
  },
];

export const featuredCapability = {
  title: "City Master Plan & Urban Land Intelligence",
  status: "In development",
  summary:
    "Bringing cadastral information, land-use planning and geospatial technology together to support smarter, more informed urban development.",
  points: ["Parcel data", "Planning layers", "Interactive GIS", "Reports", "Web and mobile access"],
};

export const illustrativeCaption =
  "Public imagery shown for illustration; not client project work.";

export const whyChooseUs = [
  "Integrated geospatial and environmental expertise.",
  "Technology-based, compliant and transparent approach.",
  "Customised solutions for project-specific needs.",
  "High-quality maps, reports and decision tools.",
  "Mobile and web solutions for anytime, anywhere monitoring.",
];

export const contactInvitation = {
  heading: "Have a location, project or challenge to explore?",
  body: "Tell us what you are planning. We can discuss the geospatial, environmental or technology approach that may help.",
};
