import { NextResponse } from "next/server";

// Referent de protecció (apartat 12.1-B del protocol): rep sempre la senyal,
// en paral·lel amb l'adult de la sessió, amb la mateixa informació mínima.
const REFERENT_PROTECCIO = "mireiafon@soytara.com";

// Mapa provisional grup → adult responsable de la sessió (apartat 12.1-A).
// Amplia aquest mapa quan s'incorporin més centres/grups.
const PROFESSOR_PER_GRUP: Record<string, string> = {
  DEMO: "mboixsanglas@yahoo.es"
};

function nouCodiSenyal() {
  return "AR-" + Math.floor(10000 + Math.random() * 90000);
}

async function enviaCorreu(to: string[], subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Falta configurar RESEND_API_KEY");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.SENYAL_FROM_EMAIL || "onboarding@resend.dev",
      to,
      subject,
      text
    })
  });
  if (!res.ok) {
    throw new Error(`Resend ha respost ${res.status}: ${await res.text()}`);
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const participant = typeof body?.codi === "string" ? body.codi.slice(0, 40) : "desconegut";
  const grup = participant.includes("-") ? participant.split("-")[0].toUpperCase() : "SENSE_GRUP";
  const professor = PROFESSOR_PER_GRUP[grup];
  const senyal = nouCodiSenyal();
  const hora = new Date().toISOString();

  const destinataris = professor ? [REFERENT_PROTECCIO, professor] : [REFERENT_PROTECCIO];
  const subject = `Tara · Senyal roja · ${senyal}`;
  const text = [
    "Intervenció humana immediata sol·licitada.",
    `Senyal: ${senyal}`,
    `Grup: ${grup}`,
    `Participant (codi pseudònim): ${participant}`,
    `Hora: ${hora}`,
    "Estat: pendent d'atenció",
    "",
    "Aquest missatge no conté el contingut de la conversa ni cap altra dada identificativa, segons el protocol de seguretat de Tara."
  ].join("\n");

  try {
    await enviaCorreu(destinataris, subject, text);
    return NextResponse.json({ ok: true, senyal, notificat: destinataris });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: message, senyal }, { status: 500 });
  }
}
