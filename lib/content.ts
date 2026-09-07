import type { Locale } from "./i18n";

export interface LandingContent {
  nav: { chat: string; schools: string };
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    sub: string;
    cta: string;
    scroll: string;
  };
  context: {
    kicker: string;
    phrases: string[];
    closing: string;
  };
  product: {
    kicker: string;
    title: string;
    steps: { n: string; word: string; body: string }[];
  };
  differentiation: {
    kicker: string;
    title: string;
    never: { title: string; body: string }[];
    bridge: { title: string; body: string; helplines: string };
  };
  credibility: {
    kicker: string;
    items: { n: string; title: string; body: string }[];
  };
  cta: {
    line1: string;
    line2: string;
    button: string;
    note: string;
  };
  footer: { rights: string; schools: string; privacy: string };
}

export const CONTENT: Record<Locale, LandingContent> = {
  es: {
    nav: { chat: "Hablar con Tara", schools: "Centros educativos" },
    hero: {
      eyebrow: "Acompañamiento emocional · Comunicación No Violenta",
      line1: "Hola.",
      line2: "Soy Tara.",
      sub: "No estoy aquí para darte lecciones. Cuéntame qué ha pasado.",
      cta: "Habla con Tara",
      scroll: "Desliza"
    },
    context: {
      kicker: "Lo que nos escriben",
      phrases: [
        "No me atrevo a hablar en clase.",
        "Paso de intentarlo, seguro que la lío.",
        "Si me rechaza, no lo soporto.",
        "Ya estoy bien, no pasa nada.",
        "Nadie me hace caso."
      ],
      closing: "Todo esto tiene un nombre. Tara lo escucha sin juzgarlo — y sin decirte qué hacer."
    },
    product: {
      kicker: "El método",
      title: "Cuatro pasos. Ninguno es un consejo.",
      steps: [
        { n: "01", word: "Hechos", body: "Lo que ha pasado, sin la historia que te cuentas sobre lo que pasó." },
        { n: "02", word: "Sentimiento", body: "Lo que sientes de verdad — no la interpretación disfrazada de sentimiento." },
        { n: "03", word: "Necesidad", body: "Lo que hay debajo del sentimiento. Casi nunca es lo primero que se nombra." },
        { n: "04", word: "Petición", body: "Algo concreto que puedes pedir o hacer. Lo eliges tú, no Tara." }
      ]
    },
    differentiation: {
      kicker: "Lo que Tara nunca hace",
      title: "Cuatro promesas, al revés.",
      never: [
        { title: "No cuenta su propia historia", body: "El foco eres tú, siempre. Tara no compite contigo por el protagonismo." },
        { title: "No dice que seguro se arregla", body: "Primero refleja lo que sientes. La esperanza, si acaso, viene después." },
        { title: "No da soluciones", body: "No hasta que tú mismo has nombrado qué necesitas. Nunca antes." },
        { title: "No interroga", body: "Una pregunta, no un interrogatorio. Y siempre puedes no responder." }
      ],
      bridge: {
        title: "Y cuando hace falta una persona de verdad, te lo dice sin rodeos.",
        body: "Si lo que cuentas es abuso, violencia o una idea de hacerte daño, Tara no finge poder resolverlo sola. Para ahí, y te acompaña hacia un adulto de confianza o una línea de ayuda real.",
        helplines: "024 · Teléfono de la Esperanza 717 00 37 17 — 24 horas, gratuito"
      }
    },
    credibility: {
      kicker: "Por si te lo preguntas",
      items: [
        { n: "3", title: "idiomas propios", body: "Castellano, català i English. No son traducciones automáticas: cada idioma tiene sus propias reglas de tono y expresión." },
        { n: "24h", title: "protocolo de seguridad real", body: "Respaldado por líneas de ayuda de verdad, no por una respuesta genérica de IA." },
        { n: "IES", title: "ya en centros educativos", body: "Con un panel propio para tutorías, administración y referentes de bienestar — construido para que el acompañamiento no se quede solo en la pantalla." }
      ]
    },
    cta: {
      line1: "Sea lo que sea,",
      line2: "empieza por donde estés.",
      button: "Habla con Tara",
      note: "Gratis. Sin registro. Nadie más lo lee."
    },
    footer: { rights: "De la pantalla a la vida.", schools: "Centros educativos", privacy: "Privacidad" }
  },
  ca: {
    nav: { chat: "Parla amb Tara", schools: "Centres educatius" },
    hero: {
      eyebrow: "Acompanyament emocional · Comunicació No Violenta",
      line1: "Hola.",
      line2: "Soc Tara.",
      sub: "No estic aquí per donar-te lliçons. Explica'm què ha passat.",
      cta: "Parla amb Tara",
      scroll: "Desplaça"
    },
    context: {
      kicker: "El que ens escriuen",
      phrases: [
        "No m'atreveixo a parlar a classe.",
        "Passo d'intentar-ho, segur que la lio.",
        "Si em rebutja, no ho suporto.",
        "Ja estic bé, no passa res.",
        "Ningú em fa cas."
      ],
      closing: "Tot això té un nom. Tara l'escolta sense jutjar-lo — i sense dir-te què fer."
    },
    product: {
      kicker: "El mètode",
      title: "Quatre passos. Cap és un consell.",
      steps: [
        { n: "01", word: "Fets", body: "El que ha passat, sense la història que t'expliques sobre el que va passar." },
        { n: "02", word: "Sentiment", body: "El que sents de veritat — no la interpretació disfressada de sentiment." },
        { n: "03", word: "Necessitat", body: "El que hi ha sota el sentiment. Gairebé mai és el primer que es nomena." },
        { n: "04", word: "Petició", body: "Alguna cosa concreta que pots demanar o fer. Ho tries tu, no Tara." }
      ]
    },
    differentiation: {
      kicker: "El que Tara mai fa",
      title: "Quatre promeses, al revés.",
      never: [
        { title: "No explica la seva pròpia història", body: "El focus ets tu, sempre. Tara no competeix amb tu pel protagonisme." },
        { title: "No diu que segur que s'arregla", body: "Primer reflecteix el que sents. L'esperança, si de cas, ve després." },
        { title: "No dona solucions", body: "No fins que tu mateix has nomenat què necessites. Mai abans." },
        { title: "No interroga", body: "Una pregunta, no un interrogatori. I sempre pots no respondre." }
      ],
      bridge: {
        title: "I quan cal una persona de veritat, t'ho diu sense embuts.",
        body: "Si el que expliques és abús, violència o una idea de fer-te mal, Tara no fingeix poder resoldre-ho sola. Para aquí, i t'acompanya cap a un adult de confiança o una línia d'ajuda real.",
        helplines: "024 · Telèfon de l'Esperança 717 00 37 17 — 24 hores, gratuït"
      }
    },
    credibility: {
      kicker: "Per si t'ho preguntes",
      items: [
        { n: "3", title: "idiomes propis", body: "Català, castellà i anglès. No són traduccions automàtiques: cada idioma té les seves pròpies regles de to i expressió." },
        { n: "24h", title: "protocol de seguretat real", body: "Recolzat per línies d'ajuda de veritat, no per una resposta genèrica d'IA." },
        { n: "IES", title: "ja en centres educatius", body: "Amb un panell propi per a tutories, administració i referents de benestar — construït perquè l'acompanyament no es quedi només a la pantalla." }
      ]
    },
    cta: {
      line1: "Sigui el que sigui,",
      line2: "comença per on siguis.",
      button: "Parla amb Tara",
      note: "Gratis. Sense registre. Ningú més ho llegeix."
    },
    footer: { rights: "De la pantalla a la vida.", schools: "Centres educatius", privacy: "Privacitat" }
  },
  en: {
    nav: { chat: "Talk to Tara", schools: "Schools" },
    hero: {
      eyebrow: "Emotional support · Nonviolent Communication",
      line1: "Hi.",
      line2: "I'm Tara.",
      sub: "I'm not here to lecture you. Tell me what happened.",
      cta: "Talk to Tara",
      scroll: "Scroll"
    },
    context: {
      kicker: "What we hear",
      phrases: [
        "I don't dare speak up in class.",
        "Why bother trying, I'll mess it up anyway.",
        "If they reject me, I can't take it.",
        "I'm fine, really, it's nothing.",
        "Nobody listens to me."
      ],
      closing: "All of this has a name. Tara listens to it without judgment — and without telling you what to do."
    },
    product: {
      kicker: "The method",
      title: "Four steps. None of them advice.",
      steps: [
        { n: "01", word: "Facts", body: "What actually happened, without the story you're telling yourself about it." },
        { n: "02", word: "Feeling", body: "What you actually feel — not the interpretation dressed up as a feeling." },
        { n: "03", word: "Need", body: "What's underneath the feeling. It's almost never the first thing named." },
        { n: "04", word: "Request", body: "Something concrete you can ask for or do. You choose it, not Tara." }
      ]
    },
    differentiation: {
      kicker: "What Tara never does",
      title: "Four promises, in reverse.",
      never: [
        { title: "It never tells its own story", body: "The focus is always you. Tara doesn't compete with you for the spotlight." },
        { title: "It never says it'll be fine", body: "It reflects what you feel first. Hope, if it comes, comes after." },
        { title: "It never gives solutions", body: "Not until you've named what you need yourself. Never before." },
        { title: "It never interrogates", body: "A question, not an interrogation. And you can always not answer." }
      ],
      bridge: {
        title: "And when a real person is needed, it says so plainly.",
        body: "If what you're describing is abuse, violence, or thoughts of hurting yourself, Tara doesn't pretend it can solve it alone. It stops there, and points you to a trusted adult or a real helpline.",
        helplines: "024 (Spain) · International Association for Suicide Prevention: befrienders.org"
      }
    },
    credibility: {
      kicker: "In case you're wondering",
      items: [
        { n: "3", title: "native languages", body: "Spanish, Catalan and English. Not machine translations — each language has its own rules of tone and expression." },
        { n: "24h", title: "real safety protocol", body: "Backed by real helplines, not a generic AI response." },
        { n: "K-12", title: "already in schools", body: "With its own panel for tutors, administrators and wellbeing staff — built so the support doesn't stay stuck on a screen." }
      ]
    },
    cta: {
      line1: "Whatever it is,",
      line2: "start from where you are.",
      button: "Talk to Tara",
      note: "Free. No sign-up. No one else reads it."
    },
    footer: { rights: "From the screen to real life.", schools: "Schools", privacy: "Privacy" }
  }
};
