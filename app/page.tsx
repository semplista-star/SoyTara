import { headers } from "next/headers";
import { localeForHost } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";
import LandingClient from "@/components/landing/LandingClient";

export default async function HomePage() {
  const h = await headers();
  const locale = localeForHost(h.get("host") ?? "");
  const content = CONTENT[locale];

  return <LandingClient locale={locale} content={content} />;
}
