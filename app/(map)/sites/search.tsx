"use client";
import { useFuse } from "@/lib/util/use-fuse";
import { useFocusable } from "@/lib/util/use-focusable";
import { allSites } from "@/lib/data/api";
import { SiteList } from "./list";

const searchOptions = {
  keys: ["name", "state", "address"],
};

export function Search({ children }: React.PropsWithChildren<object>) {
  const { results, handleSearch, query, isPending } = useFuse({
    data: allSites,
    options: searchOptions,
  });
  const ref = useFocusable();

  return (
    <section>
      <search className="w-full action-button mb-4">
        <input
          type="search"
          className="p-2 w-full outline-0"
          value={query}
          placeholder="Search"
          onChange={handleSearch}
          ref={ref}
        />
      </search>
      {results.length > 0 && (
        <SiteList
          className={`${isPending ? "opacity-50" : ""} transition-opacity`}
          sites={results}
        />
      )}
      {!query ? children : null}
    </section>
  );
}
