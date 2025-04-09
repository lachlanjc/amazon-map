import STATES from "@/lib/data/states.json" assert { type: "json" };
import { SiteList } from "@/app/(map)/sites/list";
import { allSites } from "@/lib/data/api";
import { HeaderRoot, HeaderBreadcrumb, HeaderTitle } from "@/lib/ui/header";
// import { MapZoom } from "../../zoom";
import { siteTypes } from "@/lib/data/site";
import { notFound } from "next/navigation";
import { Count } from "@/lib/ui/count";
import { Heading } from "@/lib/ui/typography";

export async function generateStaticParams() {
  return Object.values(siteTypes).map(({ slug }) => ({ status: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ status: string }>;
}) {
  const { status: typeSlug } = await params;
  const status = Object.values(siteTypes).find(
    (type) => type.slug === typeSlug,
  );
  if (!status) {
    throw new Error(`Type not found for slug: ${typeSlug}`);
  }

  return {
    title: `Amazon ${status.labelName}s`,
    description: `List of Amazon ${status.label.toLowerCase()}.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ status: string }>;
}) {
  const { status: typeSlug } = await params;
  const typeEntry = Object.entries(siteTypes).find(
    ([, value]) => value.slug === typeSlug,
  );
  if (!typeEntry) {
    return notFound();
  }
  const [typeKey, siteType] = typeEntry;
  const sites = allSites.filter((site) => site.type === typeKey);

  return (
    <>
      {/* <MapZoom center={[state.lat, state.lng]} zoom={state.zoom + 2} /> */}
      <HeaderRoot>
        <HeaderBreadcrumb href="/types">Explore by Type</HeaderBreadcrumb>
        <HeaderTitle style={{ viewTransitionName: typeSlug }}>
          {siteType.label} <Count value={sites.length} />
        </HeaderTitle>
      </HeaderRoot>
      {STATES.map((state) => {
        const sectionSites = sites
          .filter((site) => site.stateCode === state.abbrev)
          .sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
        if (!sectionSites.length) return null;
        return (
          <section id={state.abbrev} key={state.abbrev}>
            <Heading>{state.name}</Heading>
            <SiteList className="mb-4" sites={sectionSites} />
          </section>
        );
      })}
    </>
  );
}
