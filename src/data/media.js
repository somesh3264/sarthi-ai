import sectorSolar from "../assets/video/sector-solar.mp4";
import sectorIndustrial from "../assets/video/sector-industrial.mp4";
import sectorUrban from "../assets/video/sector-urban.mp4";
import sectorMining from "../assets/video/sector-mining.mp4";
import sectorPower from "../assets/video/sector-power.mp4";
import sectorGovernment from "../assets/video/sector-government.mp4";

import solarFarm from "../assets/photos/solar-farm.jpg";
import industrialFacility from "../assets/photos/industrial-facility.jpg";
import cityNight from "../assets/photos/city-night.jpg";
import miningQuarry from "../assets/photos/mining-quarry.jpg";
import powerLines from "../assets/photos/power-lines.jpg";
import topoMap from "../assets/photos/topo-map.jpg";

export const sectorVideos = {
  "renewable-energy": sectorSolar,
  industrial: sectorIndustrial,
  infrastructure: sectorUrban,
  mining: sectorMining,
  power: sectorPower,
  government: sectorGovernment,
};

// Still images shown before a sector video loads, and instead of it for reduced-motion visitors.
export const sectorPosters = {
  "renewable-energy": solarFarm,
  industrial: industrialFacility,
  infrastructure: cityNight,
  mining: miningQuarry,
  power: powerLines,
  government: topoMap,
};
