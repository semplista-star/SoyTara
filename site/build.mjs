#!/usr/bin/env node
/* =========================================================
   Genera la web estática de TARA: un HTML completo por idioma
   y dominio (soytara.com · soctara.com · iamtara.io).
   Fuentes: site/*.html (castellano, con data-i18n) + site/strings.mjs.
   Salida:  public/_site/{es,ca,en}/*.html, app.js y llms.txt.
   Uso:     npm run build:site   (comprobar el resultado y commitear)
   ========================================================= */
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ui, dynamic } from "./strings.mjs";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const { minify } = require("next/dist/compiled/terser");
const postcss = require("postcss");

const SITE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(SITE, "..");
const OUT = join(ROOT, "public", "_site");
const LASTMOD = "2026-11-02";

export const LANGS = {
  es: { domain: "soytara.com", brand: "soy", locale: "es_ES", name: "Castellano", short: "ES" },
  ca: { domain: "soctara.com", brand: "soc", locale: "ca_ES", name: "Català", short: "CA" },
  en: { domain: "iamtara.io", brand: "iam", locale: "en_GB", name: "English", short: "EN" }
};

// Rutas públicas de cada página en cada idioma (la clave es el nombre interno)
export const PAGES = {
  home:    { src: "home.html",        path: { es: "/", ca: "/", en: "/" } },
  privacy: { src: "privacidad.html",  path: { es: "/privacidad", ca: "/privacitat", en: "/privacy" } },
  legal:   { src: "aviso-legal.html", path: { es: "/aviso-legal", ca: "/avis-legal", en: "/legal-notice" } },
  rights:  { src: "derechos.html",    path: { es: "/derechos", ca: "/drets", en: "/rights" } }
};

const META = {
  home: {
    es: { title: "TARA · Convivencia y cultura de paz para centros educativos", desc: "Ecosistema educativo para la convivencia y la cultura de paz: formación, estructuras de centro y apoyo conversacional con IA para el profesorado." },
    ca: { title: "TARA · Convivència i cultura de pau per a centres educatius", desc: "Ecosistema educatiu per a la convivència i la cultura de pau: formació, estructures de centre i suport conversacional amb IA per al professorat." },
    en: { title: "TARA · Coexistence and a culture of peace for schools", desc: "An educational ecosystem for coexistence and a culture of peace: training, school structures and AI-based conversational support for teachers." }
  },
  privacy: {
    es: { title: "Política de privacidad · TARA", desc: "Cómo trata TARA los datos personales en esta web: responsable, finalidad, base legal, conservación, proveedores y derechos." },
    ca: { title: "Política de privacitat · TARA", desc: "Com tracta TARA les dades personals en aquest web: responsable, finalitat, base legal, conservació, proveïdors i drets." },
    en: { title: "Privacy policy · TARA", desc: "How TARA handles personal data on this website: controller, purpose, legal basis, retention, providers and your rights." }
  },
  legal: {
    es: { title: "Aviso legal · TARA", desc: "Titular de la web de TARA, condiciones de uso, propiedad intelectual y ley aplicable." },
    ca: { title: "Avís legal · TARA", desc: "Titular del web de TARA, condicions d'ús, propietat intel·lectual i llei aplicable." },
    en: { title: "Legal notice · TARA", desc: "Owner of the TARA website, terms of use, intellectual property and applicable law." }
  },
  rights: {
    es: { title: "Cómo ejercer tus derechos · TARA", desc: "Cómo pedir a TARA el acceso, la rectificación o la supresión de tus datos, y dónde reclamar." },
    ca: { title: "Com exercir els teus drets · TARA", desc: "Com demanar a TARA l'accés, la rectificació o la supressió de les teves dades, i on reclamar." },
    en: { title: "How to exercise your rights · TARA", desc: "How to ask TARA for access to, correction or deletion of your data, and where to complain." }
  }
};

const url = (lang, page) => `https://${LANGS[lang].domain}${PAGES[page].path[lang]}`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const strip = (html) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,>])\s*/g, "$1")
    .replace(/:\s+/g, ":")
    .replace(/;}/g, "}")
    .trim();
}

// Clases que añade main.js en tiempo de ejecución
const RUNTIME = ["js", "is-in", "is-drawn", "is-scrolled", "is-hidden", "is-open", "is-current", "is-on", "is-ready", "split", "w", "is-leaving", "typing", "msg", "msg--me", "msg--tara", "final__touch", "is-invalid", "is-ok", "is-error", "is-done"];

// Quita del CSS las reglas cuyos selectores usan clases que ya no existen en ninguna página
function prune(css, allHtml) {
  const used = new Set(RUNTIME);
  for (const m of allHtml.matchAll(/class="([^"]+)"/g)) m[1].split(/\s+/).forEach((c) => used.add(c));
  const root = postcss.parse(css);
  root.walkRules((rule) => {
    if (rule.parent && rule.parent.type === "atrule" && /keyframes/.test(rule.parent.name)) return;
    const keep = rule.selectors.filter((sel) => {
      const classes = sel.match(/\.[A-Za-z_][\w-]*/g) || [];
      return classes.every((c) => used.has(c.slice(1)));
    });
    if (!keep.length) rule.remove();
    else rule.selectors = keep;
  });
  root.walkAtRules((at) => { if (at.name === "media" && !at.nodes.length) at.remove(); });
  return root.toString();
}

function langLinks(page, lang, long) {
  return Object.keys(LANGS).map((l) => {
    const cur = l === lang ? ' aria-current="true"' : "";
    const label = long ? LANGS[l].name : LANGS[l].short;
    const cls = long ? ' class="footer__lang"' : "";
    return `<a${cls} href="${url(l, page)}" hreflang="${l}" lang="${l}" data-lang-link${cur}>${label}</a>`;
  }).join(long ? "\n      " : "");
}

function jsonLd(lang, faq) {
  const org = "https://soytara.com/#organization";
  const graph = [
    {
      "@type": "Organization",
      "@id": org,
      name: "TARA",
      url: "https://soytara.com/",
      logo: { "@type": "ImageObject", "@id": "https://soytara.com/#logo", url: "https://soytara.com/icon-512.png", width: 512, height: 512 },
      description: "Ecosistema educativo para la convivencia y la cultura de paz que integra formación, estructuras de centro y un componente conversacional basado en inteligencia artificial.",
      email: "tara@soytara.com"
    },
    {
      "@type": "WebSite",
      "@id": `https://${LANGS[lang].domain}/#website`,
      url: `https://${LANGS[lang].domain}/`,
      name: "TARA",
      inLanguage: lang,
      publisher: { "@id": org }
    }
  ];
  if (faq.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `https://${LANGS[lang].domain}/#faq`,
      inLanguage: lang,
      mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }))
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

function head(page, lang, css, faq) {
  const m = META[page][lang];
  const L = LANGS[lang];
  const alts = Object.keys(LANGS).map((l) => `<link rel="alternate" hreflang="${l}" href="${url(l, page)}">`).join("\n")
    + `\n<link rel="alternate" hreflang="x-default" href="${url("es", page)}">`;
  const ogAlt = Object.keys(LANGS).filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${LANGS[l].locale}">`).join("\n");
  const ogImg = `https://${L.domain}/og-${lang}.png`;
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(m.title)}</title>
<meta name="description" content="${esc(m.desc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url(lang, page)}">
${alts}
<meta name="theme-color" content="#F6F3EC">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/tara-favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
<meta property="og:type" content="website">
<meta property="og:site_name" content="TARA">
<meta property="og:locale" content="${L.locale}">
${ogAlt}
<meta property="og:url" content="${url(lang, page)}">
<meta property="og:title" content="${esc(m.title)}">
<meta property="og:description" content="${esc(m.desc)}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(m.title)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="/fonts/fraunces-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/dmsans-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
<style>/*__CSS__*/</style>
<script>document.documentElement.classList.add("js")</script>${page === "home" ? `\n<script type="application/ld+json">${jsonLd(lang, faq)}</script>` : ""}`;
}

function footerMark(brand) {
  return [...brand].map((c) => `<span>${c}</span>`).join("") + [..."tara"].map((c) => `<span class="t">${c}</span>`).join("");
}

async function main() {
  const rawCss = readFileSync(join(SITE, "fonts.css"), "utf8") + readFileSync(join(SITE, "styles.css"), "utf8");
  const css = "";
  const js = (await minify(readFileSync(join(SITE, "main.js"), "utf8"), { compress: true, mangle: true })).code;
  const jsHash = createHash("sha256").update(js).digest("hex").slice(0, 10);
  const header = readFileSync(join(SITE, "partials", "header.html"), "utf8");
  const footer = readFileSync(join(SITE, "partials", "footer.html"), "utf8");

  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, `app.${jsHash}.js`), js);

  const missing = new Set();
  const built = [];
  for (const lang of Object.keys(LANGS)) {
    mkdirSync(join(OUT, lang), { recursive: true });
    const L = LANGS[lang];
    for (const [page, def] of Object.entries(PAGES)) {
      const H = page === "home" ? "" : "/";
      let src = readFileSync(join(SITE, def.src), "utf8")
        .replace("<!--HEADER-->", header.replaceAll("{{H}}", H))
        .replace("<!--FOOTER-->", footer.replaceAll("{{H}}", H));
      src = src.replace(/<!--([A-Z]+(?::[a-z]+)?)-->/g, '<tara-slot data-k="$1"></tara-slot>');
      const root = parse(src, { comment: false });

      // 1 · Textos
      for (const el of root.querySelectorAll("[data-i18n]")) {
        const key = el.getAttribute("data-i18n");
        if (lang !== "es") {
          const v = ui[lang][key];
          if (v === undefined) missing.add(`${lang}:${key}`);
          else el.set_content(v);
        }
        el.removeAttribute("data-i18n");
      }
      for (const el of root.querySelectorAll("[data-i18n-attr]")) {
        for (const pair of el.getAttribute("data-i18n-attr").split(";")) {
          const [attr, key] = pair.split(":");
          if (lang !== "es") {
            const v = ui[lang][key];
            if (v === undefined) missing.add(`${lang}:${key}`);
            else el.setAttribute(attr, v);
          }
        }
        el.removeAttribute("data-i18n-attr");
      }
      // 2 · Enlaces a páginas legales en el idioma del dominio
      for (const el of root.querySelectorAll("[data-page-link]")) {
        const target = el.getAttribute("data-page-link");
        el.setAttribute("href", PAGES[target].path[lang]);
        if (target === page) el.setAttribute("aria-current", "page");
        el.removeAttribute("data-page-link");
      }
      root.querySelector("html").setAttribute("lang", lang);

      // 3 · Preguntas frecuentes para el JSON-LD (idénticas al texto visible)
      const faq = root.querySelectorAll(".faq__item").map((d) => [strip(d.querySelector(".faq__q").innerHTML), strip(d.querySelector(".faq__a").innerHTML)]);

      let html = "<!DOCTYPE html>\n" + root.toString().replace(/^<!DOCTYPE html>\s*/i, "").replace(/<tara-slot data-k="([^"]+)"><\/tara-slot>/g, "<!--$1-->");
      html = html
        .replace("<!--HEAD-->", head(page, lang, css, faq))
        .replace("<!--LANGLINKS:short-->", langLinks(page, lang, false))
        .replace("<!--LANGLINKS:long-->", langLinks(page, lang, true))
        .replace("<!--MARK-->", footerMark(L.brand))
        .replace("<!--SCRIPTS-->", `<script>window.__TARA__=${JSON.stringify({ lang, d: dynamic[lang] }).replace(/</g, "\\u003c")}</script>\n<script src="/_site/app.${jsHash}.js" defer></script>`)
        .replaceAll("soy<span>tara</span>", `${L.brand}<span>tara</span>`)
        .replaceAll("soy<tspan>tara</tspan>", `${L.brand}<tspan>tara</tspan>`)
        .replaceAll('<span class="brandname">soytara</span>', `<span class="brandname">${L.brand}tara</span>`);
      if (html.includes("<!--")) throw new Error(`Marcador sin sustituir en ${lang}/${page}`);
      built.push([join(OUT, lang, `${page}.html`), html]);
    }
    writeFileSync(join(OUT, lang, "llms.txt"), llms(lang));
  }
  const finalCss = minifyCss(prune(rawCss, built.map((b) => b[1]).join("\n")));
  for (const [file, html] of built) writeFileSync(file, html.replace("/*__CSS__*/", finalCss));
  if (missing.size) {
    console.error("Faltan traducciones:\n  " + [...missing].join("\n  "));
    process.exit(1);
  }
  console.log("OK ·", readdirSync(OUT).join(", "), "· js", js.length, "B · css", finalCss.length, "B");
}

function llms(lang) {
  const t = {
    es: ["TARA es un ecosistema educativo para la convivencia y la cultura de paz", "que integra formación, estructuras de centro y un componente", "conversacional basado en inteligencia artificial.",
      "En la fase actual, TARA trabaja con los profesionales de los centros\neducativos: profesorado, tutoría, orientación, convivencia y dirección.\nPrepara un pilotaje en centros para 2027 (Red de Centros Colaboradores).",
      "TARA no diagnostica, no evalúa a las personas, no decide sanciones y no\nsustituye a la orientación, a los servicios especializados ni a los\ncircuitos de protección del centro.",
      "Páginas", "Portada", "qué es TARA, cómo funciona en un centro y pilotaje 2027.", "Política de privacidad", "Aviso legal", "Cómo ejercer tus derechos", "Otros idiomas"],
    ca: ["TARA és un ecosistema educatiu per a la convivència i la cultura de pau", "que integra formació, estructures de centre i un component", "conversacional basat en intel·ligència artificial.",
      "En la fase actual, TARA treballa amb els professionals dels centres\neducatius: professorat, tutoria, orientació, convivència i direcció.\nPrepara un pilotatge en centres per al 2027 (Xarxa de Centres Col·laboradors).",
      "TARA no diagnostica, no avalua les persones, no decideix sancions i no\nsubstitueix l'orientació, els serveis especialitzats ni els circuits de\nprotecció del centre.",
      "Pàgines", "Portada", "què és TARA, com funciona en un centre i pilotatge 2027.", "Política de privacitat", "Avís legal", "Com exercir els teus drets", "Altres idiomes"],
    en: ["TARA is an educational ecosystem for coexistence and a culture of peace", "that brings together training, school structures and a conversational", "component based on artificial intelligence.",
      "At this stage, TARA works with school professionals: teachers, tutors,\nguidance, coexistence and leadership teams. It is preparing a pilot in\nschools for 2027 (Partner Schools Network).",
      "TARA does not diagnose, does not assess people, does not decide sanctions\nand does not replace guidance staff, specialist services or the school's\nprotection procedures.",
      "Pages", "Home", "what TARA is, how it works in a school and the 2027 pilot.", "Privacy policy", "Legal notice", "How to exercise your rights", "Other languages"]
  }[lang];
  const others = Object.keys(LANGS).filter((l) => l !== lang).map((l) => `- ${LANGS[l].name}: https://${LANGS[l].domain}/`).join("\n");
  return `# TARA

> ${t[0]}
> ${t[1]}
> ${t[2]}

${t[3]}

${t[4]}

## ${t[5]}

- [${t[6]}](${url(lang, "home")}): ${t[7]}
- [${t[8]}](${url(lang, "privacy")})
- [${t[9]}](${url(lang, "legal")})
- [${t[10]}](${url(lang, "rights")})

## ${t[11]}

${others}
`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main().catch((e) => { console.error(e); process.exit(1); });
