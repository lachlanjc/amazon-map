import { SiteType, siteTypes } from "@/lib/data/site";
import { allSites } from "@/lib/data/api";
import { HeaderRoot, HeaderSubtitle, HeaderTitle } from "@/lib/ui/header";
import { Link } from "next-view-transitions";
import { Count } from "@/lib/ui/count";

export const metadata = {
  title: "Find Amazon Locations by Type",
  description: `See every Amazon building by type: ${Object.values(siteTypes)
    .map((type) => type.labelName)
    .join("s, ")
    .toLowerCase()}s.`,
};

const typeStyle: Record<SiteType, React.CSSProperties> = {
  fc: { scale: 19, transformOrigin: "center" },
  dist: { scale: 3, transformOrigin: "right" },
};

export default function Page() {
  return (
    <>
      <HeaderRoot showClose>
        <HeaderTitle>Amazon Facilities by Type</HeaderTitle>
        {/* <HeaderSubtitle>
        </HeaderSubtitle> */}
      </HeaderRoot>
      <ul className="-mb-1 text-neutral-500 gap-8 flex flex-col" role="list">
        {Object.keys(siteTypes).map((key, i) => {
          const status = siteTypes[key];
          const count = allSites.filter((site) => site.type === key).length;
          return (
            <li
              key={key}
              role="listitem"
              className="flex w-full gap-3 group items-center even:justify-end md:max-w-md py-4"
            >
              <Link href={`/types/${key}`} className="contents">
                <span
                  className={`${status.color} origin-left bg-current w-4 h-4 rounded-full inline-block relative -z-1`}
                  style={typeStyle[key]}
                />
                <div className="flex flex-col items-start relative z-1">
                  <span
                    className="font-sans text-lg md:text-2xl font-medium text-black transition-colors group-hover:text-neutral-600 ml-2"
                    style={{ viewTransitionName: key }}
                  >
                    {status.labelName}s
                  </span>
                  <Count value={count} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
