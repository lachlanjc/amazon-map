import { ComponentPropsWithoutRef } from "react";

export function Title(props: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1
      {...props}
      className="text-balance font-bold font-sans tracking-tight text-3xl/8 md:-ml-[2px] -mt-[2px] md:-mt-1.5"
    />
  );
}

export function Heading(props: ComponentPropsWithoutRef<"h1">) {
  return (
    <h2
      {...props}
      className="text-xl font-bold font-sans tracking-tight mb-2"
    />
  );
}
