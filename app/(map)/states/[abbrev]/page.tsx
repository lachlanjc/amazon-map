import { SiteList } from "@/app/(map)/sites/list";
import states from "@/lib/data/states.json" assert { type: "json" };
import { allSites } from "@/lib/data/api";
import { HeaderRoot, HeaderBreadcrumb, HeaderTitle } from "@/lib/ui/header";
import { MapZoom } from "../../zoom";
import { Count } from "@/lib/ui/count";
import { siteTypes } from "@/lib/data/site";
import { Heading } from "@/lib/ui/typography";

export async function generateStaticParams() {
  return states.map(({ abbrev }) => ({ abbrev }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ abbrev: string }>;
}) {
  const { abbrev } = await params;
  const state = states.find(
    (state) => state.abbrev.toLowerCase() === abbrev.toLowerCase(),
  );
  if (!state) {
    throw new Error(`State not found: ${abbrev}`);
  }

  return {
    title: `Amazon Warehouses in ${state.name}`,
    description: `List of Amazon warehouses in ${state.name} (${abbrev}).`,
  };
}

const sections = Object.keys(siteTypes);
export default async function Page({
  params,
}: {
  params: Promise<{ abbrev: string }>;
}) {
  const { abbrev } = await params;
  const state = states.find(
    (state) => state.abbrev.toLowerCase() === abbrev.toLowerCase(),
  );
  if (!state) {
    throw new Error(`State not found: ${abbrev}`);
  }
  const sites = allSites.filter((site) => site.stateCode === state.abbrev);

  return (
    <>
      <MapZoom center={[state.lat, state.lng]} zoom={state.zoom + 2} />
      <HeaderRoot>
        <HeaderBreadcrumb href="/states">
          Amazon Warehouses by State
        </HeaderBreadcrumb>
        <HeaderTitle style={{ viewTransitionName: state.abbrev }}>
          {state.name} <Count value={sites.length} />
        </HeaderTitle>
      </HeaderRoot>
      {sections.map((section) => {
        const sectionSites = sites
          .filter((site) => site.type === section)
          .sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
        if (!sectionSites.length) return null;
        return (
          <section id={section} key={section}>
            <Heading>{siteTypes[section].label}</Heading>
            <SiteList className="mb-4" sites={sectionSites} />
          </section>
        );
      })}
    </>
  );
}
