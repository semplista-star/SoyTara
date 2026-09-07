export type Locale = "es" | "ca" | "en";

export function localeForHost(hostname: string): Locale {
  const h = hostname.toLowerCase();
  if (h.includes("soctara")) return "ca";
  if (h.includes("iamtara")) return "en";
  return "es";
}

export const BRAND_BY_LOCALE: Record<Locale, { title: string; ogTitle: string; ogDesc: string; ogUrl: string }> = {
  es: {
    title: "Tara — soytara.com",
    ogTitle: "Soy Tara",
    ogDesc: "No estoy aquí para darte lecciones. Cuéntame qué ha pasado.",
    ogUrl: "https://soytara.com"
  },
  ca: {
    title: "Tara — soctara.com",
    ogTitle: "Soc Tara",
    ogDesc: "No estic aquí per donar-te lliçons. Explica'm què ha passat.",
    ogUrl: "https://soctara.com"
  },
  en: {
    title: "Tara — iamtara.io",
    ogTitle: "I'm Tara",
    ogDesc: "I'm not here to lecture you. Tell me what happened.",
    ogUrl: "https://iamtara.io"
  }
};
