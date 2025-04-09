import type { Metadata } from "next";
import { Familjen_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

const familjenGrotesk = Familjen_Grotesk({
  variable: "--font-familjen-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amazon Warehouses Map",
  description:
    "See the incredible scale of Amazon’s network of fulfillment centers, distribution centers, and warehouses across the U.S.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${familjenGrotesk.variable} ${martianMono.variable} antialiased`}
          data-appearance="light"
        >
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
