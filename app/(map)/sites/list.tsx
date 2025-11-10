import { siteTypes, Site, SiteType } from "@/lib/data/site";
import Link from "next/link";

function SiteTypeIcon({
  status,
  className,
}: {
  status: SiteType;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={status}
      className={`inline-block w-2 h-2 rounded-full ${siteTypes[status].color} bg-current ${className ?? ""}`}
    />
  );
}

export function SiteList({
  sites,
  // onSelect,
  ...props
}: {
  sites: Array<Site>;
  // onSelect?: (site: Site) => void;
} & React.ComponentPropsWithoutRef<"ul">) {
  return (
    <ul {...props}>
      {sites.map((result) => (
        <li key={result.name}>
          <Link
            href={`/sites/${result.name}`}
            className="py-1 text-left transition-colors text-black hover:text-neutral-600 w-full grid grid-cols-[8px_1fr] pl-1 gap-x-2 gap-y-1 items-center"
            prefetch={false}
          >
            <SiteTypeIcon status={result.type} />
            <strong
              className="font-sans text-base font-normal"
              style={{ viewTransitionName: result.name }}
            >
              {result.name}
            </strong>
            <small className="text-neutral-600 font-mono block text-xs col-start-2">
              {result.address}
            </small>
          </Link>
        </li>
      ))}
    </ul>
  );
}
