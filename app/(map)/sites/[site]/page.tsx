import { notFound } from "next/navigation";
import { SiteCard } from "./site";
import { allSites, findSiteById } from "@/lib/data/api";
import { MapZoom } from "../../zoom";
import { getSiteNameDescription } from "@/lib/data/site";

export const generateStaticParams = async () => {
  return allSites.map(({ name }) => ({ site: name }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site: siteId } = await params;
  const site = findSiteById(siteId);
  if (!site) {
    return notFound();
  }
  const title = getSiteNameDescription(site);
  return {
    title,
    description: `See this Amazon ${site.type.toLowerCase()} on a map.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site: siteId } = await params;
  const site = findSiteById(siteId);
  if (!site) {
    return notFound();
  }

  return (
    <>
      {site.lat && site.lng && <MapZoom center={[site.lat, site.lng]} />}
      <SiteCard site={site}></SiteCard>
    </>
  );
}
