import type { MetadataRoute } from "next";
import { headers } from "next/headers";

// Dinàmic per host perquè cada domini publiqui URLs del seu propi domini
// (Google tracta soytara.com / soctara.com / iamtara.io com a llocs separats).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const h = await headers();
  const host = h.get("host") ?? "soytara.com";
  const base = `https://${host}`;
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/chat`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacidad`, lastModified: now, changeFrequency: "monthly", priority: 0.5 }
  ];
}
