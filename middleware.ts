import { NextRequest, NextResponse } from "next/server";

// Un dominio, un idioma (Documento único web, 29-oct-2026, apartado 4.2):
// soytara.com → castellano · soctara.com → catalán · iamtara.io → inglés.
// Las páginas llegan ya traducidas, una carpeta por idioma, en
// public/_web/{es,ca,en}/ y aquí solo se elige cuál servir según el host.
type Lang = "es" | "ca" | "en";

const LANG_BY_HOST: Record<string, Lang> = { soytara: "es", soctara: "ca", iamtara: "en" };

// Web de TARA (borrador del 14-nov-2026): una carpeta por idioma en
// public/_web/{es,ca,en}/, con el nombre de fichero de cada página.
// Clave interna de cada página → ruta pública en cada idioma.
const PAGES: Record<string, Record<Lang, string>> = {
  index: { es: "/", ca: "/", en: "/" },
  what: { es: "/que-es", ca: "/que-es", en: "/what-is-tara" },
  how: { es: "/como-funciona", ca: "/com-funciona", en: "/how-it-works" },
  network: { es: "/red-2027", ca: "/xarxa-2027", en: "/network-2027" },
  institutions: { es: "/instituciones", ca: "/institucions", en: "/institutions" },
  team: { es: "/equipo", ca: "/equip", en: "/team" },
  privacy: { es: "/privacidad", ca: "/privacitat", en: "/privacy" },
  legal: { es: "/aviso-legal", ca: "/avis-legal", en: "/legal-notice" },
  rights: { es: "/derechos", ca: "/drets", en: "/rights" }
};

function fileFor(page: string, lang: Lang) {
  return page === "index" ? "index" : PAGES[page][lang].slice(1);
}

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

  // El chat solo se abre por /chat, detrás de la contraseña
  if (pathname === "/index.html") {
    return NextResponse.redirect(new URL("/chat", request.url), 307);
  }

  // Las páginas solo se sirven a través de su ruta pública
  if (pathname.startsWith("/_web/")) {
    return new NextResponse("Not found", { status: 404 });
  }

  const host = (request.headers.get("host") ?? request.nextUrl.hostname).toLowerCase();
  const lang = langForHost(host);

  if (pathname === "/llms.txt" || pathname === "/sitemap.xml") {
    return NextResponse.rewrite(new URL(`/_web/${lang}${pathname}`, request.url));
  }

  for (const [page, paths] of Object.entries(PAGES)) {
    if (paths[lang] === pathname) {
      const res = NextResponse.rewrite(new URL(`/_web/${lang}/${fileFor(page, lang)}.html`, request.url));
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
  // Cualquier otra ruta sin extensión: la página 404 del idioma
  if (!pathname.includes(".")) {
    return NextResponse.rewrite(new URL(`/_web/${lang}/404.html`, request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  // Todo menos los recursos estáticos, la API y los internos de Next
  matcher: ["/((?!api/|_next/|assets/|fonts/|robots.txt).*)"]
};
