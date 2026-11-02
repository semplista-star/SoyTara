import { NextResponse } from "next/server";

// Formulario único de la portada (Documento único web, 29-oct-2026, 3.2).
// Envía cada consulta a tara@soytara.com con Resend. Necesita RESEND_API_KEY
// y un remitente de un dominio verificado en Resend (CONTACT_FROM_EMAIL).
const DESTINO = process.env.CONTACT_TO_EMAIL || "tara@soytara.com";

const TIPOS: Record<string, string> = {
  centro: "Centro educativo",
  fundacion: "Fundación",
  universidad: "Universidad",
  administracion: "Administración",
  inversion: "Inversión de impacto",
  otra: "Otra"
};
const DOSSIERS: Record<string, string> = { centros: "Dossier para centros", institucional: "Dossier institucional" };

// Límite sencillo por IP (por instancia): 5 envíos cada 10 minutos
const VENTANA_MS = 10 * 60 * 1000;
const MAX_ENVIOS = 5;
const envios = new Map<string, number[]>();
function limitado(ip: string) {
  const ahora = Date.now();
  const lista = (envios.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  lista.push(ahora);
  envios.set(ip, lista);
  return lista.length > MAX_ENVIOS;
}

const texto = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });

  // Campo trampa: los robots lo rellenan; respondemos como si nada
  if (texto(body.web, 200)) return NextResponse.json({ ok: true });

  const datos = {
    nombre: texto(body.nombre, 120),
    email: texto(body.email, 160),
    tipo: texto(body.tipo, 40),
    entidad: texto(body.entidad, 160),
    cargo: texto(body.cargo, 120),
    provincia: texto(body.provincia, 80),
    mensaje: texto(body.mensaje, 4000),
    dossier: texto(body.dossier, 40),
    lang: ["es", "ca", "en"].includes(body.lang) ? body.lang : "es"
  };
  const aceptada = body.privacidad === true || body.privacidad === "si";
  if (!datos.nombre || !EMAIL_RE.test(datos.email) || !TIPOS[datos.tipo] || !datos.entidad || !aceptada) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  if (limitado(ip)) return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contacto] Falta RESEND_API_KEY: la consulta no se ha podido enviar");
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  const tipo = TIPOS[datos.tipo];
  const subject = `TARA · Contacto web · ${tipo} · ${datos.entidad}`;
  const text = [
    `Nueva consulta desde la web (${datos.lang}).`,
    "",
    `Nombre: ${datos.nombre}`,
    `Correo: ${datos.email}`,
    `Tipo de entidad: ${tipo}`,
    `Centro o entidad: ${datos.entidad}`,
    `Cargo: ${datos.cargo || "—"}`,
    `Provincia: ${datos.provincia || "—"}`,
    `Dossier solicitado: ${DOSSIERS[datos.dossier] ?? "—"}`,
    "",
    "Mensaje:",
    datos.mensaje || "—",
    "",
    `Aceptación de la política de privacidad: sí (${new Date().toISOString()})`
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || process.env.SENYAL_FROM_EMAIL || "TARA <onboarding@resend.dev>",
        to: [DESTINO],
        reply_to: datos.email,
        subject,
        text
      })
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contacto]", e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  }
}
