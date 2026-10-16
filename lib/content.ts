import type { Locale } from "./i18n";

export interface LandingContent {
  nav: {
    chat: string;
    chatShort: string;
    menu: { how: string; levels: string; privacy: string; community: string; team: string };
    language: string;
    urgency: string;
  };
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    sub: string;
    text: string;
    ctaKnow: string;
    ctaTry: string;
    scroll: string;
  };
  spheres: {
    kicker: string;
    title: string;
    sphereA: {
      name: string;
      tagline: string;
      welcome: string;
      cta: string;
      topics: { question: string; answer: string }[];
      close: string;
      help: { text: string; linkLabel: string };
    };
    sphereB: {
      name: string;
      tagline: string;
      welcome: string;
      note: string;
      duration: string;
      status: string;
    };
  };
  context: {
    kicker: string;
    lead: string;
    phrases: string[];
    closing: string;
  };
  product: {
    kicker: string;
    title: string;
    intro: string;
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
  levels: {
    kicker: string;
    title: string;
    intro: string;
    rule: string;
    items: { n: string; title: string; body: string }[];
    note: string;
  };
  privacy: {
    kicker: string;
    title: string;
    intro: string;
    points: { title: string; body: string }[];
    policyLink: string;
    note: { title: string; body: string };
  };
  project: {
    kicker: string;
    title: string;
    intro: string;
    indicators: { title: string; body: string }[];
    note: string;
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
      menu: { how: "Cómo acompaña", levels: "Cómo se implementa", privacy: "Privacidad", community: "Centros y familias", team: "Equipo" },
      language: "Idioma",
      urgency: "¿Urgencia? Llama al 024"
    },
    hero: {
      eyebrow: "Ecosistema educativo · Convivencia y cultura de paz",
      line1: "Comprendernos mejor.",
      line2: "Construir convivencia.",
      sub: "Cuidar las relaciones.",
      text: "TARA es un ecosistema educativo para la convivencia y la cultura de paz. Integra pedagogía, formación, recursos e inteligencia artificial conversacional para reforzar las capacidades de las personas y de las comunidades educativas. La tecnología acompaña y facilita. Las personas valoran, deciden y actúan.",
      ctaKnow: "Conoce TARA",
      ctaTry: "Experimenta TARA",
      scroll: "Desliza"
    },
    spheres: {
      kicker: "Dos puertas de entrada",
      title: "Entender el proyecto, o probar un instante de su acompañamiento.",
      sphereA: {
        name: "Conoce TARA",
        tagline: "Qué es, para quién es y cómo acompaña — explicado por TARA misma.",
        welcome: "Hola, soy TARA. Puedo explicarte qué es el proyecto, cómo acompaña y qué puede aportar a una comunidad educativa. ¿Por dónde te gustaría empezar?",
        cta: "Empezar",
        topics: [
          {
            question: "¿Qué es TARA?",
            answer: "Un ecosistema educativo para la convivencia y la cultura de paz. Integra pedagogía, formación, recursos y una IA conversacional que acompaña — no sustituye — al profesorado, las familias y los equipos de orientación."
          },
          {
            question: "¿Para quién es?",
            answer: "Para centros educativos, familias e instituciones. El primer pilot se centra en los profesionales del centro: tutoría, orientación, convivencia y dirección."
          },
          {
            question: "¿Cómo acompaña?",
            answer: "Con el método ACOGE y comunicación no violenta (CNV): escucha, reflexión, necesidades y agencia de la persona. Nunca juzga, diagnostica ni decide en su lugar."
          },
          {
            question: "¿Qué aporta a mi centro?",
            answer: "Los centros ya tienen profesionales, conocimiento y protocolos, pero no siempre tienen tiempo o apoyo para llevarlos a la práctica diaria. TARA refuerza esas capacidades, no añade una carga nueva."
          },
          {
            question: "¿Y a las familias?",
            answer: "Recursos e información para entender mejor lo que vive un hijo o una hija, y preparar en casa las conversaciones que cuestan."
          },
          {
            question: "¿En qué fase está el proyecto?",
            answer: "En fase de preparación y validación. El primer pilot aún no tiene resultados publicados — los objetivos y los indicadores se compartirán cuando estén confirmados."
          },
          {
            question: "¿Cómo contacto?",
            answer: "Desde el programa para centros educativos, o desde el equipo de TARA — tienes los enlaces al final de esta página."
          }
        ],
        close: "Cerrar",
        help: { text: "¿No encuentras tu pregunta?", linkLabel: "Escríbenos →" }
      },
      sphereB: {
        name: "Experimenta TARA",
        tagline: "El espejo — una muestra breve y voluntaria, para personas adultas.",
        welcome: "Hola. Si quieres, podemos dedicar unos minutos a explorar una situación que te gustaría comprender mejor. Tú decides qué quieres compartir y cuándo quieres acabar.",
        note: "Una muestra para personas adultas, de 2 a 4 minutos. No es terapia, ni diagnóstico, ni un servicio de crisis, y no equivale al acceso individual supervisado del alumnado.",
        duration: "2–4 min · voluntario · puedes salir cuando quieras",
        status: "Próximamente — en validación de comportamiento, protección y tratamiento de datos."
      }
    },
    context: {
      kicker: "Por qué existe TARA",
      lead: "Los centros ya disponen de profesionales, conocimiento, protocolos y recursos, pero muchas veces no tienen tiempo ni apoyo suficiente para llevarlos a la práctica cotidiana. Esto es lo que nos escriben los y las adolescentes cuando no encuentran ese espacio:",
      phrases: [
        "No me atrevo a hablar en clase.",
        "Paso de intentarlo, seguro que la lío.",
        "Si me rechaza, no lo soporto.",
        "Ya estoy bien, no pasa nada.",
        "Nadie me hace caso."
      ],
      closing: "Todo esto tiene un nombre. TARA quiere reforzar la capacidad de las comunidades educativas para escucharlo — sin prometer resultados que aún no están demostrados."
    },
    product: {
      kicker: "Cómo acompaña TARA",
      title: "Método ACOGE y comunicación no violenta.",
      intro: "Escucha, reflexión, necesidades y agencia de la persona. Cuatro pasos. Ninguno es un consejo.",
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
        body: "Si lo que cuentas es abuso, violencia o una idea de hacerte daño, Tara no finge poder resolverlo sola. Para ahí, y te acompaña hacia un adulto de confianza o una línea de ayuda real. La decisión y la actuación corresponden siempre a personas responsables.",
        helplines: "024 · Teléfono de la Esperanza 717 00 37 17 — 24 horas, gratuito"
      }
    },
    community: {
      kicker: "A quién se dirige",
      title: "Tres recorridos, un mismo ecosistema.",
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
          title: "Familias",
          subtitle: "Entender mejor lo que vive tu hijo o tu hija",
          body: "Recursos e información para preparar en casa las conversaciones que cuestan."
        },
        {
          title: "Instituciones y fundaciones",
          subtitle: "Colaborar en la validación del proyecto",
          body: "TARA busca alianzas con instituciones y fundaciones comprometidas con la convivencia y la cultura de paz, en fase de preparación y validación."
        }
      ],
      extra: "También, dentro de los centros: Tara Docente (preparar tutorías y conversaciones difíciles) y Tara Orienta (próximamente)."
    },
    levels: {
      kicker: "Cómo se implementa",
      title: "Cinco niveles, siempre con preparación previa.",
      intro: "Cada centro decide hasta dónde despliega TARA dentro del marco establecido y cuándo cumple las condiciones. El primer pilot se presenta centrado en los profesionales del centro; las otras modalidades forman parte del modelo progresivo y no se publicitan como funcionalidades ya disponibles para el alumnado.",
      rule: "Regla obligatoria: ningún nivel se activa solo porque exista acceso técnico. Hace falta preparación previa, información o formación, condiciones de acceso, responsables humanos, seguimiento y evaluación.",
      items: [
        { n: "01", title: "Profesionales del centro", body: "Docentes, tutoría, orientación, convivencia, dirección y otros perfiles profesionales." },
        { n: "02", title: "Familias", body: "Acceso adulto propio, acompañado de información y recursos específicos." },
        { n: "03", title: "Uso pedagógico con el grupo-clase", body: "Actividades dirigidas por profesionales responsables." },
        { n: "04", title: "Uso guiado en parejas o pequeños grupos", body: "Trabajo supervisado sobre situaciones, casos, diálogos y actividades educativas." },
        { n: "05", title: "Uso individual estructurado del alumnado", body: "Interacción directa dentro del contexto educativo, orientada a escucha, reflexión, aprendizaje, comunicación y convivencia, con supervisión y protección." }
      ],
      note: "Una demostración pública para adultos (Experimenta TARA) no equivale al nivel 5 de acceso individual supervisado del alumnado."
    },
    privacy: {
      kicker: "Protección y responsabilidad",
      title: "Lo que guardamos y lo que no.",
      intro: "Tara está hecha para adolescentes. Cada frase de esta sección tiene que describir exactamente lo que hace el chat.",
      points: [
        { title: "No hace falta decir quién eres", body: "No hay registro ni cuenta. Hablas con Tara de forma anónima, sin nombre ni email." },
        { title: "Qué se guarda de la conversación", body: "[Por decidir con el equipo: exactamente qué se guarda, durante cuánto tiempo y si se usa para mejorar el modelo.]" },
        { title: "La conversación viaja cifrada", body: "Nadie de fuera puede leerla. No se comparte, no se vende y no hay publicidad ni rastreo comercial." },
        { title: "Decide una persona", body: "En una alerta de seguridad, la IA nunca actúa sola: la revisa un humano responsable, coordinado con los protocolos del centro." },
        { title: "RGPD y normativa de menores", body: "Reglamento europeo y normativa española para menores de edad." },
        { title: "Edad de uso", body: "[Por fijar: a partir de 12 o 14 años.]" }
      ],
      policyLink: "Política de privacidad completa →",
      note: {
        title: "En los centros educativos, un nivel más de garantías.",
        body: "Cuando Tara se usa dentro de un centro, el acceso del personal está protegido con verificación en dos pasos, las peticiones al sistema están limitadas para evitar abusos, y cualquier alerta de seguridad llega en tiempo real y por escrito a las personas responsables — nunca se pierde ni se queda sin revisar."
      }
    },
    project: {
      kicker: "Proyecto y validación",
      title: "Fase de preparación, no resultados cerrados.",
      intro: "TARA distingue entre lo que ya existe, lo que es una demostración, lo que está previsto para los pilots y la visión futura. No publicamos cifras, centros ni colaboraciones como hechos confirmados sin validación del equipo.",
      indicators: [
        { title: "Utilidad y adopción profesional", body: "Si el profesorado y los equipos de orientación encuentran valor real en el día a día." },
        { title: "Calidad de la reflexión", body: "Si las conversaciones ayudan a preparar actuaciones, no solo a desahogarse." },
        { title: "Viabilidad y seguridad", body: "Que el sistema funcione de forma fiable y protegida antes de ampliar su uso." },
        { title: "Carga percibida y convivencia", body: "Que TARA reduzca fricciones reales, con indicadores de convivencia cuando sean medibles." }
      ],
      note: "Estos son objetivos previstos para la fase de validación, no resultados observados."
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
        product: { heading: "Tara", how: "Cómo acompaña", schools: "Centros educativos", team: "Equipo" },
        legal: { heading: "Legal", notice: "Aviso legal", privacy: "Política de privacidad", rights: "Cómo ejercer tus derechos" },
        language: { heading: "Idioma" }
      }
    }
  },
  ca: {
    nav: {
      chat: "Parla amb Tara",
      chatShort: "Parla",
      menu: { how: "Com acompanya", levels: "Com s'implementa", privacy: "Privacitat", community: "Centres i famílies", team: "Equip" },
      language: "Idioma",
      urgency: "Urgència? Truca al 024"
    },
    hero: {
      eyebrow: "Ecosistema educatiu · Convivència i cultura de pau",
      line1: "Comprendre'ns millor.",
      line2: "Construir convivència.",
      sub: "Cuidar les relacions.",
      text: "TARA és un ecosistema educatiu per a la convivència i la cultura de pau. Integra pedagogia, formació, recursos i intel·ligència artificial conversacional per reforçar les capacitats de les persones i de les comunitats educatives. La tecnologia acompanya i facilita. Les persones valoren, decideixen i actuen.",
      ctaKnow: "Coneix TARA",
      ctaTry: "Experimenta TARA",
      scroll: "Desplaça"
    },
    spheres: {
      kicker: "Dues portes d'entrada",
      title: "Entendre el projecte, o provar un instant del seu acompanyament.",
      sphereA: {
        name: "Coneix TARA",
        tagline: "Què és, per a qui és i com acompanya — explicat per la mateixa TARA.",
        welcome: "Hola, soc TARA. Et puc explicar què és el projecte, com acompanya i què pot aportar a una comunitat educativa. Per on t'agradaria començar?",
        cta: "Començar",
        topics: [
          {
            question: "Què és TARA?",
            answer: "Un ecosistema educatiu per a la convivència i la cultura de pau. Integra pedagogia, formació, recursos i una IA conversacional que acompanya — no substitueix — el professorat, les famílies i els equips d'orientació."
          },
          {
            question: "Per a qui és?",
            answer: "Per a centres educatius, famílies i institucions. El primer pilot se centra en els professionals del centre: tutoria, orientació, convivència i direcció."
          },
          {
            question: "Com acompanya?",
            answer: "Amb el mètode ACOGE i comunicació no violenta (CNV): escolta, reflexió, necessitats i agència de la persona. Mai jutja, diagnostica ni decideix en lloc seu."
          },
          {
            question: "Què aporta al meu centre?",
            answer: "Els centres ja tenen professionals, coneixement i protocols, però no sempre tenen temps o suport per portar-los a la pràctica diària. TARA reforça aquestes capacitats, no afegeix una càrrega nova."
          },
          {
            question: "I a les famílies?",
            answer: "Recursos i informació per entendre millor el que viu un fill o una filla, i preparar a casa les converses que costen."
          },
          {
            question: "En quina fase està el projecte?",
            answer: "En fase de preparació i validació. El primer pilot encara no té resultats publicats — els objectius i els indicadors es compartiran quan estiguin confirmats."
          },
          {
            question: "Com contacto?",
            answer: "Des del programa per a centres educatius, o des de l'equip de TARA — tens els enllaços al final d'aquesta pàgina."
          }
        ],
        close: "Tancar",
        help: { text: "No trobes la teva pregunta?", linkLabel: "Escriu-nos →" }
      },
      sphereB: {
        name: "Experimenta TARA",
        tagline: "El mirall — una mostra breu i voluntària, per a persones adultes.",
        welcome: "Hola. Si vols, podem dedicar uns minuts a explorar una situació que t'agradaria comprendre millor. Tu decideixes què vols compartir i quan vols acabar.",
        note: "Una mostra per a persones adultes, de 2 a 4 minuts. No és teràpia, ni diagnòstic, ni un servei de crisi, i no equival a l'accés individual supervisat de l'alumnat.",
        duration: "2–4 min · voluntari · pots sortir quan vulguis",
        status: "Properament — en validació de comportament, protecció i tractament de dades."
      }
    },
    context: {
      kicker: "Per què existeix TARA",
      lead: "Els centres ja disposen de professionals, coneixement, protocols i recursos, però sovint no tenen temps ni suport suficient per portar-los a la pràctica quotidiana. Això és el que ens escriuen els i les adolescents quan no troben aquest espai:",
      phrases: [
        "No m'atreveixo a parlar a classe.",
        "Passo d'intentar-ho, segur que la lio.",
        "Si em rebutja, no ho suporto.",
        "Ja estic bé, no passa res.",
        "Ningú em fa cas."
      ],
      closing: "Tot això té un nom. TARA vol reforçar la capacitat de les comunitats educatives per escoltar-ho — sense prometre resultats que encara no estan demostrats."
    },
    product: {
      kicker: "Com acompanya TARA",
      title: "Mètode ACOGE i comunicació no violenta.",
      intro: "Escolta, reflexió, necessitats i agència de la persona. Quatre passos. Cap és un consell.",
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
        body: "Si el que expliques és abús, violència o una idea de fer-te mal, Tara no fingeix poder resoldre-ho sola. Para aquí, i t'acompanya cap a un adult de confiança o una línia d'ajuda real. La decisió i l'actuació corresponen sempre a persones responsables.",
        helplines: "024 · Telèfon de l'Esperança 717 00 37 17 — 24 hores, gratuït"
      }
    },
    community: {
      kicker: "A qui s'adreça",
      title: "Tres recorreguts, un mateix ecosistema.",
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
          title: "Famílies",
          subtitle: "Entendre millor el que viu el teu fill o filla",
          body: "Recursos i informació per preparar a casa les converses que costen."
        },
        {
          title: "Institucions i fundacions",
          subtitle: "Col·laborar en la validació del projecte",
          body: "TARA busca aliances amb institucions i fundacions compromeses amb la convivència i la cultura de pau, en fase de preparació i validació."
        }
      ],
      extra: "També, dins dels centres: Tara Docent (preparar tutories i converses difícils) i Tara Orienta (properament)."
    },
    levels: {
      kicker: "Com s'implementa",
      title: "Cinc nivells, sempre amb preparació prèvia.",
      intro: "Cada centre decideix fins on desplega TARA dins del marc establert i quan compleix les condicions. El primer pilot es presenta centrat en els professionals del centre; les altres modalitats formen part del model progressiu i no es publiciten com a funcionalitats ja disponibles per a l'alumnat.",
      rule: "Regla obligatòria: cap nivell s'activa només perquè hi hagi accés tècnic. Cal preparació prèvia, informació o formació, condicions d'accés, responsables humans, seguiment i avaluació.",
      items: [
        { n: "01", title: "Professionals del centre", body: "Docents, tutoria, orientació, convivència, direcció i altres perfils professionals." },
        { n: "02", title: "Famílies", body: "Accés adult propi, acompanyat d'informació i recursos específics." },
        { n: "03", title: "Ús pedagògic amb el grup-classe", body: "Activitats dirigides per professionals responsables." },
        { n: "04", title: "Ús guiat en parelles o petits grups", body: "Treball supervisat sobre situacions, casos, diàlegs i activitats educatives." },
        { n: "05", title: "Ús individual estructurat de l'alumnat", body: "Interacció directa dins del context educatiu, orientada a escolta, reflexió, aprenentatge, comunicació i convivència, amb supervisió i protecció." }
      ],
      note: "Una demostració pública per a adults (Experimenta TARA) no equival al nivell 5 d'accés individual supervisat de l'alumnat."
    },
    privacy: {
      kicker: "Protecció i responsabilitat",
      title: "El que guardem i el que no.",
      intro: "Tara està feta per a adolescents. Cada frase d'aquest apartat ha de descriure exactament el que fa el xat.",
      points: [
        { title: "No cal dir qui ets", body: "No hi ha registre ni compte. Parles amb Tara de forma anònima, sense nom ni correu." },
        { title: "Què es guarda de la conversa", body: "[Per decidir amb l'equip: exactament què es guarda, durant quant de temps i si s'utilitza per millorar el model.]" },
        { title: "La conversa viatja xifrada", body: "Ningú de fora la pot llegir. No es comparteix, no es ven i no hi ha publicitat ni seguiment comercial." },
        { title: "Decideix una persona", body: "En una alerta de seguretat, la IA mai actua sola: la revisa un humà responsable, coordinat amb els protocols del centre." },
        { title: "RGPD i normativa de menors", body: "Reglament europeu i normativa espanyola per a persones menors d'edat." },
        { title: "Edat d'ús", body: "[Per fixar: a partir de 12 o 14 anys.]" }
      ],
      policyLink: "Política de privacitat completa →",
      note: {
        title: "Als centres educatius, un nivell més de garanties.",
        body: "Quan Tara s'utilitza dins d'un centre, l'accés del personal està protegit amb verificació en dos passos, les peticions al sistema estan limitades per evitar abusos, i qualsevol alerta de seguretat arriba en temps real i per escrit a les persones responsables — mai es perd ni es queda sense revisar."
      }
    },
    project: {
      kicker: "Projecte i validació",
      title: "Fase de preparació, no resultats tancats.",
      intro: "TARA distingeix entre el que ja existeix, el que és una demostració, el que està previst per als pilots i la visió futura. No publiquem xifres, centres ni col·laboracions com a fets confirmats sense validació de l'equip.",
      indicators: [
        { title: "Utilitat i adopció professional", body: "Si el professorat i els equips d'orientació hi troben valor real en el dia a dia." },
        { title: "Qualitat de la reflexió", body: "Si les converses ajuden a preparar actuacions, no només a desfogar-se." },
        { title: "Viabilitat i seguretat", body: "Que el sistema funcioni de forma fiable i protegida abans d'ampliar-ne l'ús." },
        { title: "Càrrega percebuda i convivència", body: "Que TARA redueixi friccions reals, amb indicadors de convivència quan siguin mesurables." }
      ],
      note: "Aquests són objectius previstos per a la fase de validació, no resultats observats."
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
        product: { heading: "Tara", how: "Com acompanya", schools: "Centres educatius", team: "Equip" },
        legal: { heading: "Legal", notice: "Avís legal", privacy: "Política de privacitat", rights: "Com exercir els teus drets" },
        language: { heading: "Idioma" }
      }
    }
  },
  en: {
    nav: {
      chat: "Talk to Tara",
      chatShort: "Talk",
      menu: { how: "How it supports", levels: "How it rolls out", privacy: "Privacy", community: "Schools & families", team: "Team" },
      language: "Language",
      urgency: "Urgent? Call 024 (Spain)"
    },
    hero: {
      eyebrow: "Educational ecosystem · Coexistence and a culture of peace",
      line1: "Understand each other better.",
      line2: "Build coexistence.",
      sub: "Nurture relationships.",
      text: "TARA is an educational ecosystem for coexistence and a culture of peace. It brings together pedagogy, training, resources and conversational AI to strengthen the capabilities of people and educational communities. Technology supports and facilitates. People value, decide and act.",
      ctaKnow: "Discover TARA",
      ctaTry: "Experience TARA",
      scroll: "Scroll"
    },
    spheres: {
      kicker: "Two ways in",
      title: "Understand the project, or try a moment of its support.",
      sphereA: {
        name: "Discover TARA",
        tagline: "What it is, who it's for and how it supports people — explained by TARA itself.",
        welcome: "Hi, I'm TARA. I can explain what the project is, how it supports people, and what it can bring to an educational community. Where would you like to start?",
        cta: "Start",
        topics: [
          {
            question: "What is TARA?",
            answer: "An educational ecosystem for coexistence and a culture of peace. It brings together pedagogy, training, resources and a conversational AI that supports — not replaces — teachers, families and counseling teams."
          },
          {
            question: "Who is it for?",
            answer: "Schools, families and institutions. The first pilot focuses on school professionals: tutoring, counseling, school climate and leadership."
          },
          {
            question: "How does it support people?",
            answer: "With the ACOGE method and Nonviolent Communication (NVC): listening, reflection, needs and personal agency. It never judges, diagnoses or decides on someone's behalf."
          },
          {
            question: "What does it bring to my school?",
            answer: "Schools already have professionals, knowledge and protocols, but often lack the time or support to put them into everyday practice. TARA strengthens those capabilities — it doesn't add a new burden."
          },
          {
            question: "And for families?",
            answer: "Resources and information to better understand what a child is going through, and to prepare at home for the conversations that are hardest."
          },
          {
            question: "What stage is the project at?",
            answer: "A preparation and validation stage. The first pilot doesn't have published results yet — objectives and indicators will be shared once they're confirmed."
          },
          {
            question: "How do I get in touch?",
            answer: "Through the schools program, or through the TARA team — you'll find the links at the bottom of this page."
          }
        ],
        close: "Close",
        help: { text: "Can't find your question?", linkLabel: "Write to us →" }
      },
      sphereB: {
        name: "Experience TARA",
        tagline: "The mirror — a brief, voluntary sample, for adults.",
        welcome: "Hi. If you'd like, we can spend a few minutes exploring a situation you'd like to understand better. You decide what to share and when to stop.",
        note: "A sample for adults, 2 to 4 minutes long. It is not therapy, diagnosis or a crisis service, and it is not the same as the supervised individual access offered to students.",
        duration: "2–4 min · voluntary · leave whenever you want",
        status: "Coming soon — behavior, protection and data handling are still being validated."
      }
    },
    context: {
      kicker: "Why TARA exists",
      lead: "Schools already have professionals, knowledge, protocols and resources, but they often lack the time or support to put them into everyday practice. This is what teenagers tell us when they don't find that space:",
      phrases: [
        "I don't dare speak up in class.",
        "Why bother trying, I'll mess it up anyway.",
        "If they reject me, I can't take it.",
        "I'm fine, really, it's nothing.",
        "Nobody listens to me."
      ],
      closing: "All of this has a name. TARA wants to strengthen educational communities' capacity to listen to it — without promising results that aren't proven yet."
    },
    product: {
      kicker: "How TARA supports people",
      title: "The ACOGE method and Nonviolent Communication.",
      intro: "Listening, reflection, needs and personal agency. Four steps. None of them advice.",
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
        body: "If what you're describing is abuse, violence, or thoughts of hurting yourself, Tara doesn't pretend it can solve it alone. It stops there, and points you to a trusted adult or a real helpline. Decisions and action always rest with responsible people.",
        helplines: "024 (Spain) · International Association for Suicide Prevention: befrienders.org"
      }
    },
    community: {
      kicker: "Who it's for",
      title: "Three paths, one ecosystem.",
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
          title: "Families",
          subtitle: "Better understand what your child is going through",
          body: "Resources and information to prepare at home the conversations that are hardest."
        },
        {
          title: "Institutions and foundations",
          subtitle: "Help validate the project",
          body: "TARA is looking for partnerships with institutions and foundations committed to coexistence and a culture of peace, in a preparation and validation stage."
        }
      ],
      extra: "Also, inside schools: Tara Docente (preparing tutoring sessions and hard conversations) and Tara Orienta (coming soon)."
    },
    levels: {
      kicker: "How it's rolled out",
      title: "Five levels, always with prior preparation.",
      intro: "Each school decides how far to roll out TARA within the established framework, and when it meets the conditions to do so. The first pilot is centered on school professionals; the other modes are part of the progressive model and are not advertised as features already available to students.",
      rule: "Mandatory rule: no level is activated just because technical access exists. It requires prior preparation, information or training, access conditions, responsible people, follow-up and evaluation.",
      items: [
        { n: "01", title: "School professionals", body: "Teachers, tutoring, counseling, school climate, leadership and other professional roles." },
        { n: "02", title: "Families", body: "Adults' own access, accompanied by specific information and resources." },
        { n: "03", title: "Pedagogical use with the class group", body: "Activities led by responsible professionals." },
        { n: "04", title: "Guided use in pairs or small groups", body: "Supervised work on situations, cases, dialogues and educational activities." },
        { n: "05", title: "Structured individual use by students", body: "Direct interaction within the educational context, aimed at listening, reflection, learning, communication and coexistence, with supervision and protection." }
      ],
      note: "A public demo for adults (Experience TARA) is not the same as level 5, the supervised individual access offered to students."
    },
    privacy: {
      kicker: "Protection and responsibility",
      title: "What we keep, and what we don't.",
      intro: "Tara is built for teenagers. Every line in this section has to describe exactly what the chat does.",
      points: [
        { title: "You don't have to say who you are", body: "No sign-up, no account. You talk to Tara anonymously, with no name and no email." },
        { title: "What's kept from the conversation", body: "[To be decided with the team: exactly what is stored, for how long, and whether it's used to improve the model.]" },
        { title: "The conversation is encrypted", body: "No one outside can read it. It's never shared or sold, and there's no advertising or commercial tracking." },
        { title: "A person decides", body: "On a safety alert, the AI never acts alone — a responsible human reviews it, coordinated with the school's own protocols." },
        { title: "GDPR and rules for minors", body: "EU data protection regulation and Spain's specific rules for minors." },
        { title: "Minimum age", body: "[To be set: from age 12 or 14.]" }
      ],
      policyLink: "Full privacy policy →",
      note: {
        title: "In schools, an extra layer of safeguards.",
        body: "When Tara is used inside a school, staff access is protected with two-factor verification, requests to the system are rate-limited to prevent abuse, and any safety alert reaches the responsible people in real time and in writing — it's never lost and never left unreviewed."
      }
    },
    project: {
      kicker: "Project and validation",
      title: "A preparation stage, not closed results.",
      intro: "TARA distinguishes between what already exists, what is a demo, what's planned for the pilots and the future vision. We don't publish figures, school names or partnerships as confirmed facts without the team's validation.",
      indicators: [
        { title: "Professional usefulness and adoption", body: "Whether teachers and counseling teams find real value in day-to-day use." },
        { title: "Quality of reflection", body: "Whether conversations help prepare action, not just let off steam." },
        { title: "Viability and safety", body: "That the system works reliably and safely before expanding its use." },
        { title: "Perceived burden and coexistence", body: "That TARA reduces real friction, with coexistence indicators where they're measurable." }
      ],
      note: "These are planned objectives for the validation stage, not observed results."
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
        product: { heading: "Tara", how: "How it supports", schools: "Schools", team: "Team" },
        legal: { heading: "Legal", notice: "Legal notice", privacy: "Privacy policy", rights: "How to exercise your rights" },
        language: { heading: "Language" }
      }
    }
  }
};
