import type { Locale } from "./i18n";

export interface LandingContent {
  nav: {
    chat: string;
    chatShort: string;
    menu: { how: string; privacy: string; community: string; team: string };
    language: string;
    urgency: string;
  };
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
  community: {
    kicker: string;
    title: string;
    intro: string;
    cards: { title: string; subtitle: string; body: string; linkLabel?: string; href?: string }[];
    extra: string;
  };
  privacy: {
    kicker: string;
    title: string;
    intro: string;
    points: { title: string; body: string }[];
    policyLink: string;
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
  footer: {
    rights: string;
    columns: {
      product: { heading: string; how: string; schools: string; team: string };
      legal: { heading: string; notice: string; privacy: string; rights: string };
      language: { heading: string };
    };
  };
}

export const CONTENT: Record<Locale, LandingContent> = {
  es: {
    nav: {
      chat: "Hablar con Tara",
      chatShort: "Hablar",
      menu: { how: "Cómo funciona", privacy: "Privacidad", community: "Centros y familias", team: "Equipo" },
      language: "Idioma",
      urgency: "¿Urgencia? Llama al 024"
    },
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
    community: {
      kicker: "Para toda la comunidad",
      title: "Un ecosistema de acompañamiento, no una app suelta.",
      intro: "Tara no sustituye al tutor, al orientador ni a la familia. Les abre la puerta para que su acompañamiento llegue antes.",
      cards: [
        {
          title: "Centros educativos",
          subtitle: "Un programa que se integra con lo que ya tenéis",
          body: "Panel para tutoría, orientación y bienestar. Formación del claustro y escuela de familias.",
          linkLabel: "Ver el programa para centros →",
          href: "/escoles"
        },
        {
          title: "Profesorado · Tara Docente",
          subtitle: "Preparar tutorías y conversaciones difíciles",
          body: "Gestionar conflictos en el aula con más herramientas."
        },
        {
          title: "Familias · Tara Família",
          subtitle: "Entender mejor lo que vive tu hijo o tu hija",
          body: "Preparar en casa las conversaciones que cuestan."
        }
      ],
      extra: "También: Tara Orienta, para descubrir tu perfil profesional (próximamente)."
    },
    privacy: {
      kicker: "Privacidad y protección",
      title: "Lo que guardamos y lo que no.",
      intro: "Tara está hecha para adolescentes. Cada frase de esta sección tiene que describir exactamente lo que hace el chat.",
      points: [
        { title: "No hace falta decir quién eres", body: "No hay registro ni cuenta. Hablas con Tara de forma anónima, sin nombre ni email." },
        { title: "Qué se guarda de la conversación", body: "[Por decidir con el equipo: exactamente qué se guarda, durante cuánto tiempo y si se usa para mejorar el modelo.]" },
        { title: "La conversación viaja cifrada", body: "Nadie de fuera puede leerla. No se comparte, no se vende y no hay publicidad ni rastreo comercial." },
        { title: "Decide una persona", body: "En una alerta de seguridad, la IA nunca actúa sola: la revisa un humano responsable." },
        { title: "RGPD y normativa de menores", body: "Reglamento europeo y normativa española para menores de edad." },
        { title: "Edad de uso", body: "[Por fijar: a partir de 12 o 14 años.]" }
      ],
      policyLink: "Política de privacidad completa →",
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
    footer: {
      rights: "De la pantalla a la vida.",
      columns: {
        product: { heading: "Tara", how: "Cómo funciona", schools: "Centros educativos", team: "Equipo" },
        legal: { heading: "Legal", notice: "Aviso legal", privacy: "Política de privacidad", rights: "Cómo ejercer tus derechos" },
        language: { heading: "Idioma" }
      }
    }
  },
  ca: {
    nav: {
      chat: "Parla amb Tara",
      chatShort: "Parla",
      menu: { how: "Com funciona", privacy: "Privacitat", community: "Centres i famílies", team: "Equip" },
      language: "Idioma",
      urgency: "Urgència? Truca al 024"
    },
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
    community: {
      kicker: "Per a tota la comunitat",
      title: "Un ecosistema d'acompanyament, no una app solta.",
      intro: "Tara no substitueix el tutor, l'orientador ni la família. Els obre la porta perquè el seu acompanyament arribi abans.",
      cards: [
        {
          title: "Centres educatius",
          subtitle: "Un programa que s'integra amb el que ja teniu",
          body: "Panell per a tutoria, orientació i benestar. Formació del claustre i escola de famílies.",
          linkLabel: "Veure el programa per a centres →",
          href: "/escoles"
        },
        {
          title: "Professorat · Tara Docent",
          subtitle: "Preparar tutories i converses difícils",
          body: "Gestionar conflictes a l'aula amb més eines."
        },
        {
          title: "Famílies · Tara Família",
          subtitle: "Entendre millor el que viu el teu fill o filla",
          body: "Preparar a casa les converses que costen."
        }
      ],
      extra: "També: Tara Orienta, per descobrir el teu perfil professional (properament)."
    },
    privacy: {
      kicker: "Privacitat i protecció",
      title: "El que guardem i el que no.",
      intro: "Tara està feta per a adolescents. Cada frase d'aquest apartat ha de descriure exactament el que fa el xat.",
      points: [
        { title: "No cal dir qui ets", body: "No hi ha registre ni compte. Parles amb Tara de forma anònima, sense nom ni correu." },
        { title: "Què es guarda de la conversa", body: "[Per decidir amb l'equip: exactament què es guarda, durant quant de temps i si s'utilitza per millorar el model.]" },
        { title: "La conversa viatja xifrada", body: "Ningú de fora la pot llegir. No es comparteix, no es ven i no hi ha publicitat ni seguiment comercial." },
        { title: "Decideix una persona", body: "En una alerta de seguretat, la IA mai actua sola: la revisa un humà responsable." },
        { title: "RGPD i normativa de menors", body: "Reglament europeu i normativa espanyola per a persones menors d'edat." },
        { title: "Edat d'ús", body: "[Per fixar: a partir de 12 o 14 anys.]" }
      ],
      policyLink: "Política de privacitat completa →",
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
    footer: {
      rights: "De la pantalla a la vida.",
      columns: {
        product: { heading: "Tara", how: "Com funciona", schools: "Centres educatius", team: "Equip" },
        legal: { heading: "Legal", notice: "Avís legal", privacy: "Política de privacitat", rights: "Com exercir els teus drets" },
        language: { heading: "Idioma" }
      }
    }
  },
  en: {
    nav: {
      chat: "Talk to Tara",
      chatShort: "Talk",
      menu: { how: "How it works", privacy: "Privacy", community: "Schools & families", team: "Team" },
      language: "Language",
      urgency: "Urgent? Call 024 (Spain)"
    },
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
    community: {
      kicker: "For the whole community",
      title: "An ecosystem of support, not a standalone app.",
      intro: "Tara doesn't replace the tutor, the counselor or the family. It opens the door so their support can arrive sooner.",
      cards: [
        {
          title: "Schools",
          subtitle: "A program that fits what you already have",
          body: "A panel for tutoring, counseling and wellbeing. Staff training and a family school.",
          linkLabel: "See the program for schools →",
          href: "/escoles"
        },
        {
          title: "Teachers · Tara Docente",
          subtitle: "Prepare tutoring sessions and hard conversations",
          body: "Handle classroom conflict with more tools."
        },
        {
          title: "Families · Tara Família",
          subtitle: "Better understand what your child is going through",
          body: "Prepare at home the conversations that are hardest."
        }
      ],
      extra: "Also: Tara Orienta, to discover your career path (coming soon)."
    },
    privacy: {
      kicker: "Privacy & protection",
      title: "What we keep, and what we don't.",
      intro: "Tara is built for teenagers. Every line in this section has to describe exactly what the chat does.",
      points: [
        { title: "You don't have to say who you are", body: "No sign-up, no account. You talk to Tara anonymously, with no name and no email." },
        { title: "What's kept from the conversation", body: "[To be decided with the team: exactly what is stored, for how long, and whether it's used to improve the model.]" },
        { title: "The conversation is encrypted", body: "No one outside can read it. It's never shared or sold, and there's no advertising or commercial tracking." },
        { title: "A person decides", body: "On a safety alert, the AI never acts alone — a responsible human reviews it." },
        { title: "GDPR and rules for minors", body: "EU data protection regulation and Spain's specific rules for minors." },
        { title: "Minimum age", body: "[To be set: from age 12 or 14.]" }
      ],
      policyLink: "Full privacy policy →",
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
    footer: {
      rights: "From the screen to real life.",
      columns: {
        product: { heading: "Tara", how: "How it works", schools: "Schools", team: "Team" },
        legal: { heading: "Legal", notice: "Legal notice", privacy: "Privacy policy", rights: "How to exercise your rights" },
        language: { heading: "Language" }
      }
    }
  }
};
