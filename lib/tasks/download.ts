import scrapeIt from "scrape-it";
import opencage from "opencage-api-client";
import { Site } from "../data/site";

async function scrapeSites(): Promise<Site[]> {
  const { data, status } = await scrapeIt<{ rows: Array<Site> }>(
    "https://amzprep.com/fba-locations/",
    {
      rows: {
        listItem: "table tbody tr",
        data: {
          state: "td:nth-child(1)",
          name: "td:nth-child(2)",
          type: "td:nth-child(3)",
          address: "td:nth-child(4)",
        },
      },
    },
  );

  if (status !== 200) {
    throw new Error(`Failed to fetch page: ${status}`);
  }

  return data.rows || [];
}

async function geocodeAddress(
  address: string,
): Promise<{ lat: number; lng: number; address: string } | {}> {
  return opencage
    .geocode({ q: address })
    .then((data) => {
      if (!data.results?.[0]) return {};
      return {
        lat: data.results[0].geometry.lat,
        lng: data.results[0].geometry.lng,
        address: data.results[0].formatted,
      };
    })
    .catch((err) => {
      console.error("Geocoding failed for address:", address, err);
      return {};
    });
}

async function main() {
  console.log("Scraping FBA locations...");
  const locations = await scrapeSites();

  console.log(`Scraped ${locations.length} locations`);

  console.log("Geocoding addresses...");
  const geocoded = await Promise.all(
    locations.map(async (loc) => {
      if (loc.address.length > 5) {
        const geo = await geocodeAddress(loc.address);
        if (geo) {
          loc = { ...loc, ...geo };
        } else {
          console.warn(`Failed to geocode: ${loc.address}`);
        }
      }
      return loc;
    }),
  );

  console.log("Saving to sites.json...");
  Bun.write("./lib/data/sites.json", JSON.stringify(geocoded, null, 2));
  console.log("Done ✅");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
