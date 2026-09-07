import type { Metadata } from "next";
import { headers } from "next/headers";
import { localeForHost, BRAND_BY_LOCALE } from "@/lib/i18n";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const locale = localeForHost(h.get("host") ?? "");
  const brand = BRAND_BY_LOCALE[locale];

  return {
    title: brand.title,
    description: brand.ogDesc,
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
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
      ],
      apple: "/icon-192.png"
    },
    themeColor: "#0a0a0a"
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const locale = localeForHost(h.get("host") ?? "");

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
