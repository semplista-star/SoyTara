import { headers } from "next/headers";

// Un robots.txt por dominio (Documento único web, 4.4). Sin rutas internas:
// las páginas retiradas ya no existen. Content-Signal permite buscar y citar
// la web, pero no entrenar modelos con ella (propuesta pendiente de decisión
// del equipo: cambiar ai-train=no si se decide lo contrario).
export async function GET() {
  const h = await headers();
  const host = (h.get("host") ?? "soytara.com").replace(/^www\./, "");
  const body = [
    "User-agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=no",
    "Allow: /",
    "",
    `Sitemap: https://${host}/sitemap.xml`,
    ""
  ].join("\n");
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
