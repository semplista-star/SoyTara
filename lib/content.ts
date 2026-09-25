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
  privacy: {
    kicker: string;
    title: string;
    intro: string;
    points: { title: string; body: string }[];
    note: { title: string; body: string };
  };
  team: {
    kicker: string;
    title: string;
    subtitle: string;
    members: { initials: string; name: string; role: string; bio: string[]; photo?: string }[];
  };
  cta: {
    line1: string;
    line2: string;
    button: string;
    note: string;
  };
  footer: { rights: string; schools: string; privacy: string; team: string };
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
    privacy: {
      kicker: "Privacidad y protección",
      title: "Nadie más lee lo que escribes.",
      intro: "Tara está construida para adolescentes, así que el diseño parte de una pregunta muy simple: ¿qué necesitaría saber para atreverme a contarlo?",
      points: [
        { title: "No guardamos lo que escribes", body: "El texto literal de la conversación nunca se envía ni se almacena. Solo se registran datos anónimos de uso (idioma, franja horaria) para mejorar el servicio." },
        { title: "No hace falta decir quién eres", body: "No hay registro ni cuenta. Hablas con Tara de forma anónima, sin nombre ni email." },
        { title: "La conversación viaja cifrada", body: "Nadie de fuera puede leerla. No se comparte, no se vende y no hay publicidad ni rastreo comercial." },
        { title: "Cuando hace falta ayuda real, decide una persona", body: "El protocolo de seguridad lo revisa siempre un humano responsable — la IA nunca decide sola ni actúa por su cuenta." },
        { title: "Los datos caducan solos", body: "La información de uso se elimina de forma automática pasado un tiempo. Nada se queda guardado \"por si acaso\"." },
        { title: "Cumplimos el RGPD", body: "Tara sigue el reglamento europeo de protección de datos y la normativa española específica para menores de edad." }
      ],
      note: {
        title: "En los centros educativos, un nivel más de garantías.",
        body: "Cuando Tara se usa dentro de un centro, el acceso del personal está protegido con verificación en dos pasos, las peticiones al sistema están limitadas para evitar abusos, y cualquier alerta de seguridad llega en tiempo real y por escrito a las personas responsables — nunca se pierde ni se queda sin revisar."
      }
    },
    team: {
      kicker: "Quién hay detrás",
      title: "Equipo",
      subtitle: "Visión, dirección, tecnología, pedagogía y salud mental",
      members: [
        {
          initials: "MB",
          name: "Marc Boix Sanglas",
          role: "Arquitectura · Visión",
          bio: [
            "Creador de Tara (soytara.com) y Mirall Íntim (mirallintim.com) — validado por profesionales de salud mental.",
            "Cofundador de EMLIFE y creador del primer probiótico líquido del mercado español.",
            "Experiencia en educación emocional, CNV aplicada y arquitectura de IA conversacional."
          ]
        },
        {
          initials: "MR",
          name: "Marc Ribó Tarré",
          role: "Estrategia · Crecimiento",
          bio: [
            "Fundador de la agencia de marketing Aurora Global Group y cofundador de OPEN, software de gestión de escuelas de yoga.",
            "MBA y amplia experiencia en liderazgo emprendedor, visión comercial y estrategia de mercado.",
            "Trayectoria demostrada en construcción de nuevas categorías y desarrollo de negocio."
          ]
        },
        {
          initials: "FA",
          name: "Flor Alonso Arjona",
          role: "Educación emocional · Convivencia",
          bio: [
            "Maestra con 12 años de aula. Mediadora familiar y escolar, formadora en CNV y coach familiar.",
            "Máster Universitario en Educación Emocional y del Carácter. Autora del libro «Aquí convive una familia».",
            "Fundadora de Educando en la Paz: 4 años formando a alumnado, profesorado y familias en centros educativos."
          ]
        },
        {
          initials: "MF",
          name: "Mireia Font Rodríguez",
          role: "Supervisión clínica · Derivación",
          bio: [
            "Graduada en Psicología por la UAB y Máster en Psicología General Sanitaria por la UVic-UCC.",
            "Experiencia en salud mental infantojuvenil y neuropsicología clínica.",
            "Vinculada al CSMIJ del Consorci Hospitalari de Vic en el marco de formación sanitaria especializada."
          ]
        },
        {
          initials: "MS",
          name: "Mustapha Sousan",
          role: "Infraestructura · Seguridad",
          bio: [
            "Director General de T-Connect y VSL — programación, desarrollo web e infraestructura digital.",
            "Autor de Bonito Caos (Amazon, 2017), escrito a los 16 años — récord de ventas.",
            "Responsable de la arquitectura técnica escalable, seguridad GDPR, desarrollo de modelo de IA propio e integración API."
          ]
        }
      ]
    },
    cta: {
      line1: "Sea lo que sea,",
      line2: "empieza por donde estés.",
      button: "Habla con Tara",
      note: "Gratis. Sin registro. Nadie más lo lee."
    },
    footer: { rights: "De la pantalla a la vida.", schools: "Centros educativos", privacy: "Privacidad", team: "Equipo" }
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
    privacy: {
      kicker: "Privacitat i protecció",
      title: "Ningú més llegeix el que escrius.",
      intro: "Tara està construïda per a adolescents, així que el disseny parteix d'una pregunta molt senzilla: què necessitaria saber per atrevir-me a explicar-ho?",
      points: [
        { title: "No guardem el que escrius", body: "El text literal de la conversa mai s'envia ni s'emmagatzema. Només es registren dades anònimes d'ús (idioma, franja horària) per millorar el servei." },
        { title: "No cal dir qui ets", body: "No hi ha registre ni compte. Parles amb Tara de forma anònima, sense nom ni correu." },
        { title: "La conversa viatja xifrada", body: "Ningú de fora la pot llegir. No es comparteix, no es ven i no hi ha publicitat ni seguiment comercial." },
        { title: "Quan cal ajuda de veritat, decideix una persona", body: "El protocol de seguretat sempre el revisa una persona responsable — la IA mai decideix sola ni actua pel seu compte." },
        { title: "Les dades caduquen soles", body: "La informació d'ús s'elimina de forma automàtica passat un temps. Res es queda guardat \"per si de cas\"." },
        { title: "Complim el RGPD", body: "Tara segueix el reglament europeu de protecció de dades i la normativa espanyola específica per a persones menors d'edat." }
      ],
      note: {
        title: "Als centres educatius, un nivell més de garanties.",
        body: "Quan Tara s'utilitza dins d'un centre, l'accés del personal està protegit amb verificació en dos passos, les peticions al sistema estan limitades per evitar abusos, i qualsevol alerta de seguretat arriba en temps real i per escrit a les persones responsables — mai es perd ni es queda sense revisar."
      }
    },
    team: {
      kicker: "Qui hi ha darrere",
      title: "Equip",
      subtitle: "Visió, direcció, tecnologia, pedagogia i salut mental",
      members: [
        {
          initials: "MB",
          name: "Marc Boix Sanglas",
          role: "Arquitectura · Visió",
          bio: [
            "Creador de Tara (soytara.com) i Mirall Íntim (mirallintim.com) — validat per professionals de salut mental.",
            "Cofundador d'EMLIFE i creador del primer probiòtic líquid del mercat espanyol.",
            "Experiència en educació emocional, CNV aplicada i arquitectura d'IA conversacional."
          ]
        },
        {
          initials: "MR",
          name: "Marc Ribó Tarré",
          role: "Estratègia · Creixement",
          bio: [
            "Fundador de l'agència de màrqueting Aurora Global Group i cofundador d'OPEN, software de gestió d'escoles de ioga.",
            "MBA i àmplia experiència en lideratge emprenedor, visió comercial i estratègia de mercat.",
            "Trajectòria demostrada en construcció de noves categories i desenvolupament de negoci."
          ]
        },
        {
          initials: "FA",
          name: "Flor Alonso Arjona",
          role: "Educació emocional · Convivència",
          bio: [
            "Mestra amb 12 anys d'aula. Mediadora familiar i escolar, formadora en CNV i coach familiar.",
            "Màster Universitari en Educació Emocional i del Caràcter. Autora del llibre «Aquí convive una familia».",
            "Fundadora d'Educando en la Paz: 4 anys formant alumnat, professorat i famílies en centres educatius."
          ]
        },
        {
          initials: "MF",
          name: "Mireia Font Rodríguez",
          role: "Supervisió clínica · Derivació",
          bio: [
            "Graduada en Psicologia per la UAB i Màster en Psicologia General Sanitària per la UVic-UCC.",
            "Experiència en salut mental infantojuvenil i neuropsicologia clínica.",
            "Vinculada al CSMIJ del Consorci Hospitalari de Vic en el marc de formació sanitària especialitzada."
          ]
        },
        {
          initials: "MS",
          name: "Mustapha Sousan",
          role: "Infraestructura · Seguretat",
          bio: [
            "Director General de T-Connect i VSL — programació, desenvolupament web i infraestructura digital.",
            "Autor de Bonito Caos (Amazon, 2017), escrit als 16 anys — rècord de vendes.",
            "Responsable de l'arquitectura tècnica escalable, seguretat GDPR, desenvolupament de model d'IA propi i integració API."
          ]
        }
      ]
    },
    cta: {
      line1: "Sigui el que sigui,",
      line2: "comença per on siguis.",
      button: "Parla amb Tara",
      note: "Gratis. Sense registre. Ningú més ho llegeix."
    },
    footer: { rights: "De la pantalla a la vida.", schools: "Centres educatius", privacy: "Privacitat", team: "Equip" }
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
    privacy: {
      kicker: "Privacy & protection",
      title: "No one else reads what you write.",
      intro: "Tara is built for teenagers, so the design starts from one simple question: what would I need to know to actually dare to say it?",
      points: [
        { title: "We don't save what you write", body: "The literal text of the conversation is never sent or stored. Only anonymous usage data (language, time of day) is logged to improve the service." },
        { title: "You don't have to say who you are", body: "No sign-up, no account. You talk to Tara anonymously, with no name and no email." },
        { title: "The conversation is encrypted", body: "No one outside can read it. It's never shared or sold, and there's no advertising or commercial tracking." },
        { title: "When real help is needed, a person decides", body: "The safety protocol is always reviewed by a responsible human — the AI never decides alone or acts on its own." },
        { title: "Your data expires on its own", body: "Usage data is automatically deleted after a set period. Nothing sits around stored \"just in case.\"" },
        { title: "We comply with GDPR", body: "Tara follows the EU data protection regulation and Spain's specific rules for minors." }
      ],
      note: {
        title: "In schools, an extra layer of safeguards.",
        body: "When Tara is used inside a school, staff access is protected with two-factor verification, requests to the system are rate-limited to prevent abuse, and any safety alert reaches the responsible people in real time and in writing — it's never lost and never left unreviewed."
      }
    },
    team: {
      kicker: "Who's behind it",
      title: "Team",
      subtitle: "Vision, leadership, technology, pedagogy and mental health",
      members: [
        {
          initials: "MB",
          name: "Marc Boix Sanglas",
          role: "Architecture · Vision",
          bio: [
            "Creator of Tara (soytara.com) and Mirall Íntim (mirallintim.com) — validated by mental health professionals.",
            "Co-founder of EMLIFE and creator of the first liquid probiotic on the Spanish market.",
            "Experience in emotional education, applied NVC and conversational AI architecture."
          ]
        },
        {
          initials: "MR",
          name: "Marc Ribó Tarré",
          role: "Strategy · Growth",
          bio: [
            "Founder of marketing agency Aurora Global Group and co-founder of OPEN, yoga-studio management software.",
            "MBA with extensive experience in entrepreneurial leadership, commercial vision and market strategy.",
            "Track record building new categories and growing businesses."
          ]
        },
        {
          initials: "FA",
          name: "Flor Alonso Arjona",
          role: "Emotional education · School climate",
          bio: [
            "Teacher with 12 years in the classroom. Family and school mediator, NVC trainer and family coach.",
            "Master's degree in Emotional and Character Education. Author of the book «Aquí convive una familia».",
            "Founder of Educando en la Paz: 4 years training students, teachers and families in schools."
          ]
        },
        {
          initials: "MF",
          name: "Mireia Font Rodríguez",
          role: "Clinical oversight · Escalation",
          bio: [
            "Degree in Psychology from UAB and Master's in General Health Psychology from UVic-UCC.",
            "Experience in child and adolescent mental health and clinical neuropsychology.",
            "Affiliated with the CSMIJ at Consorci Hospitalari de Vic as part of specialized healthcare training."
          ]
        },
        {
          initials: "MS",
          name: "Mustapha Sousan",
          role: "Infrastructure · Security",
          bio: [
            "Managing Director of T-Connect and VSL — programming, web development and digital infrastructure.",
            "Author of Bonito Caos (Amazon, 2017), written at age 16 — a bestseller.",
            "Responsible for scalable technical architecture, GDPR security, in-house AI model development and API integration."
          ]
        }
      ]
    },
    cta: {
      line1: "Whatever it is,",
      line2: "start from where you are.",
      button: "Talk to Tara",
      note: "Free. No sign-up. No one else reads it."
    },
    footer: { rights: "From the screen to real life.", schools: "Schools", privacy: "Privacy", team: "Team" }
  }
};
