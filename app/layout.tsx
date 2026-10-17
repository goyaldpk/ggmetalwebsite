import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { SITE } from "@/lib/site";
import "./globals.css";

// Self-hosted at build time by next/font: no request to Google from the visitor's browser.
const display = Archivo({ subsets: ["latin"], variable: "--ff-display", display: "swap" });
const body = IBM_Plex_Sans({ subsets: ["latin"], variable: "--ff-body", display: "swap", weight: ["400", "500", "600"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--ff-mono", display: "swap", weight: ["500"] });

export const viewport: Viewport = { themeColor: "#161a1f" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "G.G Metal Works | Ceiling Fan Components Manufacturer, Faridabad", template: "%s | G.G Metal Works" },
  description:
    "Family-owned sheet metal manufacturer in Faridabad since 1995. Ceiling fan shackle (hanger) assemblies, safety wires, down rods and blade shanks, made to your drawing on 10–75 tonne power presses.",
  keywords: [
    "ceiling fan components", "fan hanger assembly", "shackle assembly", "fan shackle manufacturer", "fan safety wire",
    "fan down rod", "blade shanks", "fan blade bracket", "sheet metal components Faridabad", "sheet metal pressing",
    "power press components", "G.G Metal Works", "GGMW",
  ],
  openGraph: { type: "website", siteName: SITE.name, images: ["/images/factory-press-shop.jpg"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <div className="sticky top-0 z-40">
          <Header />
        </div>
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
