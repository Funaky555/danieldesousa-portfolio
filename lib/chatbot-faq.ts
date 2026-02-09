export interface FAQEntry {
  id: string;
  keywords: string[];
  answer: Record<string, string>;
}

export const faqEntries: FAQEntry[] = [
  {
    id: "experience-general",
    keywords: ["experience", "career", "work", "background", "years", "how long", "experiencia", "carreira"],
    answer: {
      en: "Daniel de Sousa has over 10 years of professional coaching experience across Portugal and China. He has worked with age groups from U4 to U18, including roles as Head Coach, Football Department Coordinator, and PE Teacher.",
      pt: "Daniel de Sousa tem mais de 10 anos de experiencia profissional como treinador em Portugal e na China. Trabalhou com escaloes desde os Sub-4 ate Sub-18, incluindo funcoes de Treinador Principal, Coordenador do Departamento de Futebol e Professor de Educacao Fisica.",
      es: "Daniel de Sousa tiene mas de 10 anos de experiencia profesional como entrenador en Portugal y China. Ha trabajado con categorias desde Sub-4 hasta Sub-18.",
      fr: "Daniel de Sousa a plus de 10 ans d'experience professionnelle en tant qu'entraineur au Portugal et en Chine. Il a travaille avec des categories allant de U4 a U18.",
      zh: "Daniel de Sousa 拥有超过10年的职业教练经验，横跨葡萄牙和中国。他曾指导U4至U18各年龄段的球员。",
    },
  },
  {
    id: "experience-china",
    keywords: ["china", "chinese", "tongling", "chizhou", "tagou", "dalian", "asia"],
    answer: {
      en: "Daniel spent over 4 years coaching in China, working at institutions like Middle School no.2 in Tongling (Football Dept. Coordinator & Head Coach), Chizhou No.2 Middle School, Tagou Football Academy, and Dalian Youth Football. He developed programs for both male and female teams.",
      pt: "Daniel passou mais de 4 anos a treinar na China, trabalhando em instituicoes como a Escola Secundaria n.2 em Tongling (Coordenador do Departamento de Futebol e Treinador Principal), Escola Secundaria n.2 de Chizhou, Academia de Futebol Tagou e Futebol Juvenil de Dalian.",
      es: "Daniel paso mas de 4 anos entrenando en China, trabajando en instituciones como la Escuela Secundaria n.2 de Tongling, Chizhou, la Academia Tagou y el futbol juvenil de Dalian.",
      fr: "Daniel a passe plus de 4 ans a entrainer en Chine, dans des institutions comme l'Ecole Secondaire n.2 de Tongling, Chizhou, l'Academie Tagou et le football jeune de Dalian.",
      zh: "Daniel在中国执教超过4年，曾在铜陵市第二中学（足球部协调员兼主教练）、池州市第二中学、塔沟足球学院和大连青少年足球等机构工作。",
    },
  },
  {
    id: "experience-portugal",
    keywords: ["portugal", "portuguese", "benfica", "trofense", "lavrense", "galileu", "europe"],
    answer: {
      en: "In Portugal, Daniel has coached at S.L. Benfica (Youth Development), S.C. Trofense, GALILEU Sports Academy (Trainee), and A.D. Lavrense. He has experience with competitive youth teams and player development pathways.",
      pt: "Em Portugal, Daniel treinou no S.L. Benfica (Desenvolvimento Juvenil), S.C. Trofense, Academia Desportiva GALILEU (Estagiario) e A.D. Lavrense. Tem experiencia com equipas juvenis competitivas e percursos de desenvolvimento de jogadores.",
      es: "En Portugal, Daniel ha entrenado en S.L. Benfica (Desarrollo Juvenil), S.C. Trofense, Academia GALILEU y A.D. Lavrense.",
      fr: "Au Portugal, Daniel a entraine au S.L. Benfica (Developpement Jeune), S.C. Trofense, Academie GALILEU et A.D. Lavrense.",
      zh: "在葡萄牙，Daniel曾在本菲卡（青训发展）、特罗芬斯、GALILEU体育学院和A.D. Lavrense执教。",
    },
  },
  {
    id: "philosophy",
    keywords: ["philosophy", "approach", "style", "method", "coaching style", "filosofia", "abordagem", "metodo"],
    answer: {
      en: "Daniel's coaching philosophy is built on 3 pillars: Intelligence, Intensity, and Intention. He believes in a player-centered approach, creating positive learning environments where players develop both technically and as people. He emphasizes game-based training and integrated methodologies.",
      pt: "A filosofia de treino do Daniel baseia-se em 3 pilares: Inteligencia, Intensidade e Intencao. Acredita numa abordagem centrada no jogador, criando ambientes de aprendizagem positivos onde os jogadores se desenvolvem tanto tecnicamente como enquanto pessoas.",
      es: "La filosofia de entrenamiento de Daniel se basa en 3 pilares: Inteligencia, Intensidad e Intencion. Cree en un enfoque centrado en el jugador.",
      fr: "La philosophie d'entrainement de Daniel repose sur 3 piliers : Intelligence, Intensite et Intention. Il croit en une approche centree sur le joueur.",
      zh: "Daniel的执教理念建立在三个支柱上：智慧、强度和意图。他相信以球员为中心的方法。",
    },
  },
  {
    id: "formations",
    keywords: ["formation", "tactical", "system", "433", "442", "4231", "tactic", "formacao", "tatica", "sistema"],
    answer: {
      en: "Daniel works primarily with three tactical systems: 4-3-3 (attacking with width), 4-4-2 (balanced and solid), and 4-2-3-1 (modern with creative midfield). You can explore these interactively on the Philosophy page's Tactical Systems section.",
      pt: "Daniel trabalha principalmente com tres sistemas taticos: 4-3-3 (ataque com largura), 4-4-2 (equilibrado e solido) e 4-2-3-1 (moderno com meio-campo criativo). Pode explorar estes sistemas interativamente na secao de Sistemas Taticos da pagina Filosofia.",
      es: "Daniel trabaja principalmente con tres sistemas tacticos: 4-3-3, 4-4-2 y 4-2-3-1. Puede explorarlos interactivamente en la pagina de Filosofia.",
      fr: "Daniel travaille principalement avec trois systemes tactiques : 4-3-3, 4-4-2 et 4-2-3-1. Vous pouvez les explorer sur la page Philosophie.",
      zh: "Daniel主要使用三种战术体系：4-3-3、4-4-2和4-2-3-1。您可以在哲学页面的战术系统部分进行互动探索。",
    },
  },
  {
    id: "services",
    keywords: ["service", "offer", "hire", "price", "cost", "consulting", "consultancy", "servico", "preco", "contratar"],
    answer: {
      en: "Daniel offers several professional services: Game Analysis (video analysis, tactical reports), Scouting (player evaluation, talent identification), Leadership & Team Building, Individual and Group Training sessions, and Seminars/Workshops. Visit the Services page for full details.",
      pt: "Daniel oferece varios servicos profissionais: Analise de Jogo (analise de video, relatorios taticos), Scouting (avaliacao de jogadores, identificacao de talentos), Lideranca e Team Building, Sessoes de Treino Individual e em Grupo, e Seminarios/Workshops. Visite a pagina de Servicos para mais detalhes.",
      es: "Daniel ofrece varios servicios profesionales: Analisis de Juego, Scouting, Liderazgo, Sesiones de Entrenamiento y Seminarios. Visite la pagina de Servicios.",
      fr: "Daniel propose plusieurs services professionnels : Analyse de Match, Scouting, Leadership, Sessions d'Entrainement et Seminaires. Visitez la page Services.",
      zh: "Daniel提供多种专业服务：比赛分析、球探、领导力建设、训练课程和研讨会。请访问服务页面了解详情。",
    },
  },
  {
    id: "contact",
    keywords: ["contact", "email", "phone", "whatsapp", "reach", "message", "contacto", "telefone", "mensagem"],
    answer: {
      en: "You can reach Daniel via email at danieldesousa05@gmail.com or WhatsApp at +351 913350837. You can also use the contact form on the Contact page.",
      pt: "Pode contactar o Daniel por email em danieldesousa05@gmail.com ou por WhatsApp no +351 913350837. Tambem pode usar o formulario de contacto na pagina de Contacto.",
      es: "Puede contactar a Daniel por email en danieldesousa05@gmail.com o por WhatsApp al +351 913350837.",
      fr: "Vous pouvez contacter Daniel par email a danieldesousa05@gmail.com ou par WhatsApp au +351 913350837.",
      zh: "您可以通过电子邮件 danieldesousa05@gmail.com 或 WhatsApp +351 913350837 联系Daniel。",
    },
  },
  {
    id: "education",
    keywords: ["education", "qualification", "uefa", "certificate", "degree", "course", "license", "educacao", "qualificacao", "certificado", "curso"],
    answer: {
      en: "Daniel holds a UEFA B Coaching License, an IPDJ Coach Level II certification, and a degree in Sports Science. He continuously invests in professional development through courses and international exchanges.",
      pt: "Daniel possui a Licenca de Treinador UEFA B, certificacao IPDJ Treinador Grau II, e um curso em Ciencias do Desporto. Investe continuamente no desenvolvimento profissional atraves de cursos e intercambios internacionais.",
      es: "Daniel tiene la Licencia de Entrenador UEFA B, certificacion IPDJ Nivel II y un titulo en Ciencias del Deporte.",
      fr: "Daniel detient la Licence d'Entraineur UEFA B, la certification IPDJ Niveau II et un diplome en Sciences du Sport.",
      zh: "Daniel拥有欧足联B级教练执照、IPDJ二级教练认证和体育科学学位。",
    },
  },
  {
    id: "age-groups",
    keywords: ["age", "youth", "kids", "children", "u4", "u6", "u8", "u10", "u12", "u13", "u15", "u18", "young", "junior", "escalao", "sub", "jovem"],
    answer: {
      en: "Daniel has extensive experience working with youth players across all age groups, from U4 to U18. He adapts his coaching methodology to each developmental stage, focusing on fun and movement for the youngest, and tactical understanding and competitive preparation for older players.",
      pt: "Daniel tem vasta experiencia com jovens jogadores de todos os escaloes, desde os Sub-4 ate Sub-18. Adapta a sua metodologia a cada fase de desenvolvimento, focando-se na diversao e movimento para os mais novos, e na compreensao tatica e preparacao competitiva para os mais velhos.",
      es: "Daniel tiene amplia experiencia con jugadores jovenes de todas las categorias, desde Sub-4 hasta Sub-18.",
      fr: "Daniel a une vaste experience avec les jeunes joueurs de toutes les categories, de U4 a U18.",
      zh: "Daniel在从U4到U18的各个年龄段都有丰富的青训经验。",
    },
  },
  {
    id: "software-tools",
    keywords: ["software", "tool", "technology", "tech", "video", "analysis", "hudl", "premiere", "davinci", "ai", "chatgpt", "ferramenta", "tecnologia"],
    answer: {
      en: "Daniel uses modern tools including video analysis software (Hudl, LongoMatch), video editing (Adobe Premiere, DaVinci Resolve), data analysis tools, and AI assistants (ChatGPT, Claude) for training planning and player development. Visit the Software page for the complete list.",
      pt: "Daniel utiliza ferramentas modernas incluindo software de analise de video (Hudl, LongoMatch), edicao de video (Adobe Premiere, DaVinci Resolve), ferramentas de analise de dados, e assistentes de IA (ChatGPT, Claude) para planeamento de treinos. Visite a pagina Software para a lista completa.",
      es: "Daniel utiliza herramientas modernas incluyendo software de analisis de video, edicion de video, y asistentes de IA. Visite la pagina Software.",
      fr: "Daniel utilise des outils modernes incluant des logiciels d'analyse video, de montage video, et des assistants IA. Visitez la page Software.",
      zh: "Daniel使用现代工具，包括视频分析软件、视频编辑软件和AI助手。请访问软件页面了解完整列表。",
    },
  },
  {
    id: "location",
    keywords: ["where", "location", "based", "live", "city", "porto", "onde", "localizacao", "cidade"],
    answer: {
      en: "Daniel is currently based in Porto, Portugal. He has previously lived and worked in various cities in China including Tongling, Chizhou, Dalian, and Zhengzhou.",
      pt: "Daniel reside atualmente no Porto, Portugal. Anteriormente viveu e trabalhou em varias cidades na China, incluindo Tongling, Chizhou, Dalian e Zhengzhou.",
      es: "Daniel reside actualmente en Oporto, Portugal. Anteriormente vivio y trabajo en varias ciudades de China.",
      fr: "Daniel est actuellement base a Porto, au Portugal. Il a precedemment vecu et travaille dans plusieurs villes en Chine.",
      zh: "Daniel目前居住在葡萄牙波尔图。他此前曾在中国多个城市生活和工作。",
    },
  },
  {
    id: "greeting",
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "ola", "bom dia", "boa tarde", "boa noite"],
    answer: {
      en: "Hello! I'm Daniel's virtual assistant. Feel free to ask me about his coaching experience, philosophy, services, or how to get in touch!",
      pt: "Ola! Sou o assistente virtual do Daniel. Pode perguntar-me sobre a sua experiencia como treinador, filosofia, servicos ou como entrar em contacto!",
      es: "Hola! Soy el asistente virtual de Daniel. Puede preguntarme sobre su experiencia, filosofia, servicios o como contactarlo!",
      fr: "Bonjour ! Je suis l'assistant virtuel de Daniel. N'hesitez pas a me poser des questions sur son experience, sa philosophie ou ses services !",
      zh: "你好！我是Daniel的虚拟助手。欢迎询问有关他的教练经验、理念、服务或联系方式！",
    },
  },
];

export const quickSuggestions: Record<string, string[]> = {
  en: ["What's your experience?", "Coaching philosophy?", "How to contact?", "Available services?"],
  pt: ["Qual e a experiencia?", "Filosofia de treino?", "Como contactar?", "Servicos disponiveis?"],
  es: ["Cual es la experiencia?", "Filosofia de entrenamiento?", "Como contactar?", "Servicios disponibles?"],
  fr: ["Quelle experience ?", "Philosophie de coaching ?", "Comment contacter ?", "Services disponibles ?"],
  zh: ["有什么经验？", "执教理念？", "如何联系？", "提供什么服务？"],
};
