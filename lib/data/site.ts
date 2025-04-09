export interface Site {
  name: string;
  type: string;
  stateCode: string;
  stateName: string;
  address: string;
  lat?: number;
  lng?: number;
}

export type SiteType = keyof typeof siteTypes;

export const siteTypes: Record<
  string,
  { label: string; labelName: string; slug: string; color: string }
> = {
  fc: {
    label: "Fulfillment",
    labelName: "Fulfillment Center",
    slug: "fulfillment",
    color: "text-orange-500",
  },
  dist: {
    label: "Distribution",
    labelName: "Distribution Center",
    slug: "distribution",
    color: "text-yellow-500",
  },
  reverse: {
    label: "Returns Center",
    labelName: "Returns Center",
    slug: "returns",
    color: "text-violet-500",
  },
  office: {
    label: "Corporate Office",
    labelName: "Corporate Office",
    slug: "offices",
    color: "text-primary",
  },
};

export function getSiteNameDescription(site: Site) {
  const typeLabel = siteTypes[site.type]?.label;
  return [
    site.name,
    typeLabel && typeLabel !== "Corporate Office"
      ? `${typeLabel} Center`
      : typeLabel || "Amazon Location",
  ].join(" ");
}
