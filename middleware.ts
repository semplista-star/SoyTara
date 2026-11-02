import { NextRequest, NextResponse } from "next/server";

// Un dominio, un idioma (Documento único web, 29-oct-2026, apartado 4.2):
// soytara.com → castellano · soctara.com → catalán · iamtara.io → inglés.
// Las páginas se generan ya traducidas con `npm run build:site` en
// public/_site/{es,ca,en}/ y aquí solo se elige cuál servir según el host.
type Lang = "es" | "ca" | "en";

const LANG_BY_HOST: Record<string, Lang> = { soytara: "es", soctara: "ca", iamtara: "en" };

// Nombre interno de cada página → ruta pública en cada idioma
const PAGES: Record<string, Record<Lang, string>> = {
  home: { es: "/", ca: "/", en: "/" },
  privacy: { es: "/privacidad", ca: "/privacitat", en: "/privacy" },
  legal: { es: "/aviso-legal", ca: "/avis-legal", en: "/legal-notice" },
  rights: { es: "/derechos", ca: "/drets", en: "/rights" }
};

function langForHost(host: string): Lang {
  const key = Object.keys(LANG_BY_HOST).find((k) => host.includes(k));
  return key ? LANG_BY_HOST[key] : "es";
}

// Bloqueo temporal del chat: nadie puede hablar con Tara sin contraseña.
// Quitar este bloque (y el matcher "/chat") cuando se reabra el acceso.
const CHAT_COOKIE = "tara_access";
const CHAT_PASSWORD = process.env.TARA_CHAT_PASSWORD || "7337";

function renderChatGate(error: boolean) {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>TARA · Acceso restringido</title>
<meta name="robots" content="noindex, nofollow">
<style>
  body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
    background:#F6F3EC; color:#1C2621; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
  .box { max-width:340px; width:90%; text-align:center; }
  .logo { font-size:28px; font-weight:600; margin-bottom:8px; }
  .logo span { color:#C1652E; }
  p { color:#52584F; font-size:14px; margin-bottom:24px; }
  input { width:100%; box-sizing:border-box; padding:12px 16px; font-size:16px; border-radius:999px;
    border:1px solid #DDD3BC; background:#EFE9DB; text-align:center; letter-spacing:4px; margin-bottom:12px; }
  button { width:100%; padding:12px 16px; font-size:16px; border-radius:999px; border:none;
    background:#C1652E; color:#F6F3EC; font-weight:600; cursor:pointer; }
  .err { color:#C1652E; font-size:13px; margin-bottom:12px; }
</style>
</head>
<body>
  <div class="box">
    <div class="logo">soy<span>tara</span></div>
    <p>El chat está temporalmente desactivado.</p>
    <form method="POST" action="/chat">
      ${error ? '<div class="err">Contraseña incorrecta.</div>' : ""}
      <input type="password" name="pw" placeholder="••••" autofocus inputmode="numeric" aria-label="Contraseña">
      <button type="submit">Entrar</button>
    </form>
  </div>
</body>
</html>`;
}

async function chatGate(request: NextRequest): Promise<NextResponse | null> {
  if (request.cookies.get(CHAT_COOKIE)?.value === CHAT_PASSWORD) return null;

  if (request.method === "POST") {
    const form = await request.formData();
    if (form.get("pw") === CHAT_PASSWORD) {
      const res = NextResponse.redirect(new URL("/chat", request.url), 303);
      res.cookies.set(CHAT_COOKIE, CHAT_PASSWORD, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30
      });
      return res;
    }
    return new NextResponse(renderChatGate(true), { status: 401, headers: { "content-type": "text/html; charset=utf-8" } });
  }

  return new NextResponse(renderChatGate(false), { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/chat") {
    const gate = await chatGate(request);
    return gate ?? NextResponse.next();
  }

  // Los ficheros generados solo se sirven a través de su ruta pública
  if (pathname.startsWith("/_site/") && !pathname.endsWith(".js")) {
    return new NextResponse("Not found", { status: 404 });
  }

  const host = (request.headers.get("host") ?? request.nextUrl.hostname).toLowerCase();
  const lang = langForHost(host);

  if (pathname === "/llms.txt") {
    return NextResponse.rewrite(new URL(`/_site/${lang}/llms.txt`, request.url));
  }

  for (const [page, paths] of Object.entries(PAGES)) {
    if (paths[lang] === pathname) {
      const res = NextResponse.rewrite(new URL(`/_site/${lang}/${page}.html`, request.url));
      res.headers.set("content-language", lang);
      return res;
    }
    // Ruta de otro idioma en este dominio (p. ej. /privacidad en soctara.com) → la suya
    if (Object.values(paths).includes(pathname)) {
      const to = request.nextUrl.clone();
      to.pathname = paths[lang];
      return NextResponse.redirect(to, 301);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/chat",
    "/privacidad",
    "/privacitat",
    "/privacy",
    "/aviso-legal",
    "/avis-legal",
    "/legal-notice",
    "/derechos",
    "/drets",
    "/rights",
    "/llms.txt",
    "/_site/:path*"
  ]
};
