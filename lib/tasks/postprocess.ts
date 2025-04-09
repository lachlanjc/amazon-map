// @ts-nocheck
import statesRaw from "@/lib/data/states-raw.json" assert { type: "json" };
import raw from "@/lib/data/sites-raw.json" assert { type: "json" };
import { siteTypes, SiteType } from "@/lib/data/site";

function deleteUntilDelimiter(str: string, delimiter: string) {
  const index = str.indexOf(delimiter);
  if (index === -1) {
    return str;
  }
  return str.substring(index + delimiter.length);
}

const allTypes = new Set();

const typesMap: Record<string, SiteType> = {
  fc: "fc",
  "logistics center": "dist",
  warehouse: "fc",
  "distribution service": "dist",
  logistics: "dist",
  "logistics service": "dist",
  amzl: "dist",
  sc: "dist",
  "reverse logistics": "reverse",
  "return center": "reverse",
  "corporate office": "office",
  dc: "office",
  suac: "office",
};

const processed = raw.map((site) => {
  if (site.type.length === 0) {
    if (site.address.includes("Warehouse")) site.type = "warehouse";
  }
  // if address doesn't start with number
  if (/^\d/.test(site.address) === false && site.address.includes(", ")) {
    site.address = deleteUntilDelimiter(site.address, ", ");
  }
  site.address = site.address.replace(", United States of America", ", USA");
  site.stateCode = statesRaw.find((state) => state.name === site.state)?.abbrev;
  site.stateName = site.state;
  delete site.state;
  site.type = typesMap[site.type.toLowerCase()] ?? "fc";
  allTypes.add(site.type);
  // Object.keys(siteTypes).find(
  //   (type) => site.type.toLowerCase() === site.type.toLowerCase(),
  // ) ?? site.type;
  return site;
});
const deduped = processed.filter(
  (site, i) => i === processed.findIndex((f) => f.name === site.name),
);

// console.log(JSON.stringify([...allTypes]));

Bun.write("./lib/data/sites.json", JSON.stringify(deduped));
console.log("Wrote sites file");

const miniKeys = ["name", "lat", "lng", "type"];
const miniJson = structuredClone(processed)
  .map((site) => {
    const miniSite: Record<string, any> = {};
    miniKeys.forEach((key) => {
      miniSite[key] = site[key];
    });
    return miniSite;
  })
  .sort((a, b) => b.lat - a.lat);
Bun.write("./lib/data/sites-mini.json", JSON.stringify(miniJson));
console.log("Wrote mini sites file");

const states = statesRaw.map((state) => {
  state.count = raw.filter((site) => site.stateName === state.name).length;
  return state;
});

Bun.write("./lib/data/states.json", JSON.stringify(states));
console.log("Wrote states file");
