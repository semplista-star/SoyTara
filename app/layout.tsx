import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Fraunces, DM_Sans, DM_Mono } from "next/font/google";
import { localeForHost, BRAND_BY_LOCALE } from "@/lib/i18n";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap"
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap"
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap"
});

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const locale = localeForHost(h.get("host") ?? "");
  const brand = BRAND_BY_LOCALE[locale];

  return {
    title: brand.title,
    description: brand.ogDesc,
    alternates: {
      canonical: brand.ogUrl,
      languages: {
        es: "https://soytara.com",
        ca: "https://soctara.com",
        en: "https://iamtara.io",
        "x-default": "https://soytara.com"
      }
    },
    openGraph: {
      title: brand.ogTitle,
      description: brand.ogDesc,
      url: brand.ogUrl,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }]
    },
    twitter: { card: "summary_large_image" },
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/tara-favicon.svg", type: "image/svg+xml" }
      ],
      apple: "/apple-touch-icon.png"
    }
  };
}

export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: "#1c2621"
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const locale = localeForHost(h.get("host") ?? "");

  return (
    <html lang={locale} className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
