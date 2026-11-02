import type { MetadataRoute } from "next";
import { headers } from "next/headers";

// Solo URLs indexables, cada una con su alternativa en los otros idiomas
// y la fecha real del último cambio (Documento único web, 4.4). /chat no
// está: es de acceso restringido y lleva noindex.
const DOMAINS = { es: "soytara.com", ca: "soctara.com", en: "iamtara.io" } as const;
type Lang = keyof typeof DOMAINS;
const LASTMOD = "2026-11-02";

const PAGES: Record<Lang, string>[] = [
  { es: "/", ca: "/", en: "/" },
  { es: "/privacidad", ca: "/privacitat", en: "/privacy" },
  { es: "/aviso-legal", ca: "/avis-legal", en: "/legal-notice" },
  { es: "/derechos", ca: "/drets", en: "/rights" }
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = ((await headers()).get("host") ?? "soytara.com").toLowerCase();
  const lang = (Object.keys(DOMAINS) as Lang[]).find((l) => host.includes(DOMAINS[l].split(".")[0])) ?? "es";
  const abs = (l: Lang, p: string) => `https://${DOMAINS[l]}${p}`;

  return PAGES.map((p) => ({
    url: abs(lang, p[lang]),
    lastModified: LASTMOD,
    alternates: {
      languages: {
        es: abs("es", p.es),
        ca: abs("ca", p.ca),
        en: abs("en", p.en),
        "x-default": abs("es", p.es)
      }
    }
  }));
}
