import { Search } from "@/app/(map)/sites/search";
import { siteTypes } from "@/lib/data/site";
import { HeaderRoot, HeaderTitle } from "@/lib/ui/header";
import { Link } from "next-view-transitions";

export default function Page() {
  return (
    <>
      <HeaderRoot showClose={false}>
        <HeaderTitle>Amazon Warehouses</HeaderTitle>
        <a
          href="https://github.com/lachlanjc/amazon-map"
          className="opacity-40 transition-opacity hover:opacity-50 absolute top-0 right-0"
        >
          <svg
            width="24"
            height="24"
            stroke-linejoin="round"
            viewBox="0 0 16 16"
            aria-hidden
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z"
            />
          </svg>
          <span className="sr-only">Open Source on GitHub</span>
        </a>
      </HeaderRoot>
      <div className="grid grid-cols-2 gap-4 w-full font-sans text-lg font-semibold tracking-tight text-neutral-800 leading-[1.125] mb-6">
        <Link
          href="/states"
          className="action-button flex flex-col items-start gap-3 p-4 pb-3.5"
        >
          <div className="flex -gap-3 h-4 fill-neutral-400" aria-hidden>
            {/* via https://github.com/coryetzkorn/state-svg-defs */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 67 80"
            >
              <path d="M38.72 63.76l-1.2-1.76h-0.24l0.8 1.68zM31.68 60.64h-0.32l0.8 0.32v-0.24zM38.72 59.6l-1.52-0.32 1.040 0.96h0.64zM28.48 55.52h-1.2l0.56 0.96 0.8-0.48zM26.88 55.36l-0.48-0.24-0.32 0.24 0.8 0.16v-0.16zM29.76 55.2l-0.72-0.080 0.88 0.72 1.52-0.48-0.16-0.24zM27.6 6.64l-0.080-7.68h-22.4l-0.080 1.44 0.4 0.72 0.56 1.76-0.96 4.8 0.48-0.56-0.96 0.96-0.56 1.92 0.080 1.36 2.080 1.76 0.96 2.080-0.32 2.24 0.56 1.92v1.2l3.28 3.44 1.52 2.48-0.8-0.72-0.16 1.68 0.4-0.64 2.32 1.76 0.4-0.4-0.4-1.76 0.72-0.080 1.28 0.8 0.8-0.72 0.64 0.72 1.28-0.72-0.4 0.72 0.88-0.64 0.96 0.72-1.2-0.72-0.24 0.72h-2.64l-0.4-0.080-0.8 0.080-0.16 0.32 0.48 1.2 0.72 0.56 0.88 1.92h-0.56l-1.44-1.040-0.080-1.44-0.72 0.24v1.84l1.2 2.8 1.040 1.2h1.28l0.8 0.88-0.4 1.44-0.64 0.16 0.48 2.24 2.080 2.080 1.36 2.32 2.24 1.68v1.44l1.52 0.4v4.32l0.8 0.48 5.2 0.32 1.92 0.96 1.040 1.2 1.92 0.64 1.76-0.16 0.72 1.92 1.52-0.080 3.76 2.56 1.44 1.92 0.48 2.88 0.72-0.32 0.16 0.48-0.64-0.16 0.64 0.96 15.52-2.72 0.080-1.68-1.2-0.56-0.72-2.4 1.2-0.96-0.16-2.96 2.24-2.72-1.52-0.96-2-3.52-31.92-26.72z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="24"
              viewBox="0 0 42 80"
            >
              <path d="M29.040 53.84l1.28-1.52h-1.28l-0.64 1.52-1.68-0.64 0.88 0.64h1.44zM31.92 49.6l2-2.88 0.72-2.96-3.52 6.48zM36.88 14.88l1.28-3.52 0.72-2.24-17.040-9.84-2 0.64-1.52 1.36-1.44 4.32-2 2.16-2.16 2 1.28 2.96-0.64 2.16h-1.28l-0.8 1.36v4.96l2.080 0.72 1.52 3.52h0.72l0.56 1.36 4.96 5.76-0.56 0.72-3.68 2-3.52 2.96h-0.64l0.64 1.36-1.28 1.44-3.76 0.72-2 0.64-2.8 5.68 0.56 1.52v1.36h-0.56v0.64l3.52 4.32 0.64-0.72 0.64 1.36h1.44l1.52 2.16 0.8 1.52 1.92-0.72 0.88 0.72h2l0.72 2.16-1.44 2.080v2.8l1.44-0.56 2.24-1.6v-0.64l2-2.080-1.28-0.72h1.28l0.72-2.16 2.080-2.16h-2.080l0.8-0.8h1.28l1.44-2v0.64l-0.64 1.36 2.96-1.36-0.8-1.36h-0.88v-1.52h1.68v-2.72h0.64l1.28 1.36-0.64-1.36 3.52-4.24v-2.24l1.44-3.52-0.72-0.72 0.72-0.64-0.72-0.72 1.28-0.64v-1.6l0.96 1.6-1.52 6.24h0.56l0.96-6.96v-1.52l1.28-5.6v-3.6l-0.56 0.64-2.96-1.36h-1.44l-1.36-0.64v-2.16l1.36-2.72 1.44-2.24v1.36l2.24-1.36z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="24"
              viewBox="0 0 78 80"
            >
              <path d="M73.52 27.28l-0.48-1.36-2.96-0.88-0.88-1.44-0.48-3.68-1.84-0.8-0.24-0.88-0.96-0.8h-51.76v-4.16l-4.24 2.16 0.56-0.8-1.68 1.28-3.52 1.52-1.040 35.6 57.44 0.24 0.8-1.36 1.28-0.64 2 0.4 3.52-1.44 0.24-1.12 4.48-3.36-3.040-3.68h-0.64l-0.64-2.24-1.36-0.16-0.080-1.92v-0.96l1.040-0.64 0.48-1.2-0.96-1.92 2.16-2.16 1.84-3.2z"></path>
            </svg>
          </div>
          Explore
          <br />
          by State
        </Link>
        <Link
          href="/types"
          className="action-button flex flex-col items-start gap-3 p-4 pb-3.5"
        >
          <div className="flex -gap-3" aria-hidden>
            {Object.values(siteTypes).map(({ color }) => (
              <div
                key={color}
                className={`w-4 h-4 ${color} bg-current rounded-full outline-2 outline-[#efeef0]`}
              />
            ))}
          </div>
          Explore
          <br />
          Facility Types
        </Link>
      </div>
      {/* <hr className="border-black/20 -mx-6 my-6" /> */}
      <Search />
    </>
  );
}
