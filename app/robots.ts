import type { MetadataRoute } from "next";
import { headers } from "next/headers";

// Dinàmic per host: cada domini (soytara.com / soctara.com / iamtara.io)
// apunta al seu propi sitemap. Bloquegem les pàgines de demo/eines internes
// (dashboards de mostra) perquè no competeixin a l'indexació amb la landing real.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const h = await headers();
  const host = h.get("host") ?? "soytara.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/soytara_mestres", "/tara-dashboard-tutora"]
      }
    ],
    sitemap: `https://${host}/sitemap.xml`
  };
}
