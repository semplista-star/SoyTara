import { NextRequest, NextResponse } from "next/server";

// Réplica de netlify/edge-functions/inject-meta.js: reescribe lang/title/og:*
// según el hostname para los dominios alias (soctara.com en català,
// iamtara.io en anglès). soytara.com (por defecto) no cambia.
//
// A diferencia de Netlify Edge Functions (donde context.next() deja leer y
// modificar la respuesta ya generada), el middleware de Next.js/Vercel NO
// permite leer el cuerpo de NextResponse.next() — la página aún no existe
// en ese punto. Por eso aquí, para los hosts que sí necesitan reescritura,
// se hace fetch directo del HTML estático y se devuelve ya modificado,
// sin pasar por next().
const META_BY_HOST: Record<string, { lang: string; title: string; ogTitle: string; ogDesc: string; ogUrl: string }> = {
  soctara: {
    lang: "ca",
    title: "Tara — soctara.com",
    ogTitle: "Soc Tara",
    ogDesc: "Soc aquí per escoltar-te i acompanyar-te sense jutjar.",
    ogUrl: "https://soctara.com"
  },
  iamtara: {
    lang: "en",
    title: "Tara — iamtara.io",
    ogTitle: "I'm Tara",
    ogDesc: "I'm here to listen and walk alongside you — no judgment.",
    ogUrl: "https://iamtara.io"
  }
};

const HTML_SOURCE_BY_PATH: Record<string, string> = {
  "/": "/index.html",
  "/escoles": "/escoles/index.html",
  "/escoles/": "/escoles/index.html"
};

export async function middleware(request: NextRequest) {
  const hostname = (request.headers.get("host") ?? request.nextUrl.hostname).toLowerCase();
  const key = Object.keys(META_BY_HOST).find((k) => hostname.includes(k));
  if (!key) return NextResponse.next();

  const sourcePath = HTML_SOURCE_BY_PATH[request.nextUrl.pathname];
  if (!sourcePath) return NextResponse.next();

  const sourceUrl = new URL(sourcePath, request.url);
  const sourceRes = await fetch(sourceUrl, { headers: { accept: "text/html" } });
  if (!sourceRes.ok) return NextResponse.next();

  const meta = META_BY_HOST[key];
  let html = await sourceRes.text();

  html = html.replace(/<html lang="[^"]*"/, `<html lang="${meta.lang}"`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*"/, `$1${meta.ogTitle}"`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*"/, `$1${meta.ogDesc}"`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*"/, `$1${meta.ogUrl}"`);

  return new NextResponse(html, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}

export const config = {
  matcher: ["/", "/escoles", "/escoles/"]
};
