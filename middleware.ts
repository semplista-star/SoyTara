import { NextRequest, NextResponse } from "next/server";

// Réplica de netlify/edge-functions/inject-meta.js. Reescribe lang/title/
// og:* (y, para "/", el idioma inicial del body) según el host, sobre una
// plantilla HTML estática que es la misma en los tres dominios.
const META_BY_HOST: Record<
  string,
  { lang: string; title: string; ogTitle: string; ogDesc: string; ogUrl: string }
> = {
  soctara: {
    lang: "ca",
    title: "Tara — Acompanyament emocional per a adolescents · soctara.com",
    ogTitle: "Hola. Soc Tara.",
    ogDesc: "No sóc aquí per donar-te lliçons. Explica'm què ha passat.",
    ogUrl: "https://soctara.com"
  },
  iamtara: {
    lang: "en",
    title: "Tara — Emotional support for teenagers · iamtara.io",
    ogTitle: "Hi. I'm Tara.",
    ogDesc: "I'm not here to lecture you. Tell me what happened.",
    ogUrl: "https://iamtara.io"
  }
};

const LANG_BY_HOST: Record<string, string> = { soctara: "ca", iamtara: "en" };

const HTML_SOURCE_BY_PATH: Record<string, string> = {
  "/": "/tara-home.html",
  "/escoles": "/escoles/index.html",
  "/escoles/": "/escoles/index.html"
};

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
<title>Tara</title>
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
      <input type="password" name="pw" placeholder="••••" autofocus inputmode="numeric">
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
  if (request.nextUrl.pathname === "/chat") {
    const gate = await chatGate(request);
    return gate ?? NextResponse.next();
  }

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
  html = html.replace(
    /window\.__TARA_HOST_LANG__\s*=\s*"[^"]*"/,
    `window.__TARA_HOST_LANG__ = "${LANG_BY_HOST[key]}"`
  );

  return new NextResponse(html, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}

export const config = {
  matcher: ["/", "/escoles", "/escoles/", "/chat"]
};
