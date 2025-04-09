import { getSiteNameDescription, type Site } from "@/lib/data/site";
import { Link } from "next-view-transitions";
import { HeaderRoot, HeaderSubtitle, HeaderTitle } from "@/lib/ui/header";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function replaceJSX(text: string, find: string, replace: any) {
  return text
    .split(find)
    .flatMap((item) => [item, replace])
    .slice(0, -1);
}

export function SiteCard({
  site,
  children,
}: React.PropsWithChildren<{ site: Site }>) {
  return (
    <>
      <HeaderRoot showClose>
        <HeaderTitle style={{ viewTransitionName: site.name }}>
          {getSiteNameDescription(site)}
        </HeaderTitle>
        <HeaderSubtitle>
          {replaceJSX(
            site.address,
            site.stateCode,
            <Link
              href={`/states/${site.stateCode}`}
              className="underline underline-offset-2"
            >
              <abbr title={site.stateName}>{site.stateCode}</abbr>
            </Link>,
          )}
        </HeaderSubtitle>
      </HeaderRoot>
      {children}
    </>
  );
}
