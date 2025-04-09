"use client";

import { PropsWithChildren, useEffect, useRef } from "react";
import { Drawer } from "vaul";
import { RemoveScroll } from "react-remove-scroll";
import "mapbox-gl/dist/mapbox-gl.css";
import SITES from "@/lib/data/sites-mini.json" assert { type: "json" };

import Map, { MapRef, Marker } from "react-map-gl/mapbox";
import { useParams, useRouter } from "next/navigation";
import { SiteType } from "@/lib/data/site";
import { MAPBOX_TOKEN } from "@/lib/util/mapbox";

function MainCard({
  title,
  children,
  ...props
}: PropsWithChildren<{ title?: string }>) {
  return (
    <Drawer.Root dismissible={false} modal={false} open={true}>
      <Drawer.Portal>
        <Drawer.Content
          {...props}
          className="main-card backdrop-blur-lg backdrop-saturate-150 flex flex-col w-full md:max-w-md p-4 md:p-6 mx-auto font-mono z-10 md:max-h-[50vh] fixed bottom-0 max-md:left-0 max-md:right-0 outline-none md:absolute md:left-8 md:bottom-8 rounded-t-xl md:rounded-2xl @container text-sm leading-relaxed !select-auto isolate transition-discrete transition-[height]"
          data-vaul-custom-container
        >
          <RemoveScroll className="!overflow-y-auto">
            {title && (
              <Drawer.Title className="text-balance font-bold font-sans text-3xl">
                {title}
              </Drawer.Title>
            )}
            {children}
          </RemoveScroll>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

const initialViewState = {
  latitude: 39.8283,
  longitude: -98.5795,
  zoom: 4,
  bearing: 0,
  pitch: 20,
};

const statuses: Record<SiteType, string> = {
  fc: "fill-orange-500",
  dist: "fill-amber-500",
  reverse: "fill-violet-500",
  office: "fill-amber-500",
  // office: "fill-indigo-500 opacity-70",
};

export default function Layout({ children }: PropsWithChildren<object>) {
  const router = useRouter();
  // const pathname = usePathname();
  const { site: siteId, status: nplStatus } = useParams();

  const mapRef = useRef<MapRef | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // @ts-expect-error global
    window.mapRef = mapRef;
  }, []);

  return (
    <div className="w-full h-full" ref={rootRef}>
      <style>{`.mapboxgl-canvas, .mapboxgl-marker { position: absolute !important; }`}</style>
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          inset: 0,
        }}
      >
        {SITES.filter((site) => site.lat && site.lng).map((marker) => (
          <Marker
            anchor="bottom"
            longitude={marker.lng!}
            latitude={marker.lat!}
            onClick={() => {
              router.push(`/sites/${marker.name}`);
            }}
            key={marker.name}
            className={`relative ${nplStatus && nplStatus !== marker.type ? "relative -z-1" : ""}`}
          >
            <svg
              className={[
                "pin",
                "transition-transform duration-500 origin-bottom",
                siteId && siteId === marker.name
                  ? "scale-200 !opacity-100"
                  : "",
                statuses[marker.type as SiteType] ?? "fill-primary",
              ].join(" ")}
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              {/* <title>{marker.name}</title> */}
              <path
                d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3 c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9 C20.1,15.8,20.2,15.8,20.2,15.7z`}
              />
            </svg>
          </Marker>
        ))}
      </Map>
      <MainCard>{children}</MainCard>
    </div>
  );
}
