import type { Lang, Localized, LocalizedList } from "../i18n/types";

const base = import.meta.env.BASE_URL;

export const profile = {
  name: "Diego Eduardo Soares da Silva",

  nameLines: ["Diego Eduardo", "Soares da Silva"] as const,

  photo: `${base}photo.webp` as string | undefined,
  role: {
    en: "Full Stack Developer",
    pt: "Desenvolvedor Full Stack",
    es: "Desarrollador Full Stack",
  } satisfies Localized,

  tagline: {
    en: "I build web systems with Java and Angular, and also work with React and Node.js.",
    pt: "Construo sistemas web com Java e Angular, e também trabalho com React e Node.js.",
    es: "Construyo sistemas web con Java y Angular, y también trabajo con React y Node.js.",
  } satisfies Localized,
  description: {
    en: "Diego Eduardo, full stack developer. Back-end foundations and full stack in practice, with Java, Spring Boot and Angular. Projects, experience and résumé.",
    pt: "Diego Eduardo, desenvolvedor full stack. Back-end na base e full stack na prática, com Java, Spring Boot e Angular. Projetos, experiência e currículo.",
    es: "Diego Eduardo, desarrollador full stack. Base en back-end y práctica full stack, con Java, Spring Boot y Angular. Proyectos, experiencia y currículum.",
  } satisfies Localized,
  location: {
    en: "Belford Roxo, RJ, Brazil",
    pt: "Belford Roxo, RJ, Brasil",
    es: "Belford Roxo, RJ, Brasil",
  } satisfies Localized,
  about: {
    en: [
      "Full stack developer working mainly with Java and Angular, with hands-on experience in React and Node.js.",
      "My background is in the back end: REST APIs, SQL and NoSQL databases, and Docker to keep environments consistent. I study Software Engineering and I am looking for real projects where I can contribute and keep growing.",
    ],
    pt: [
      "Desenvolvedor full stack com foco em Java e Angular e experiência prática com React e Node.js.",
      "Minha base é o back-end: APIs REST, bancos SQL e NoSQL e Docker para manter os ambientes consistentes. Curso Engenharia de Software e busco projetos reais para contribuir e continuar evoluindo.",
    ],
    es: [
      "Desarrollador full stack enfocado en Java y Angular, con experiencia práctica en React y Node.js.",
      "Mi base es el back end: APIs REST, bases de datos SQL y NoSQL, y Docker para mantener los entornos consistentes. Estudio Ingeniería de Software y busco proyectos reales donde aportar y seguir creciendo.",
    ],
  } satisfies LocalizedList,
};

export const links = {
  email: "diegoeduardo.dev@gmail.com",
  github: "https://github.com/diegoeduardo-dev",
  linkedin: "https://www.linkedin.com/in/diegoeduardo-dev",
};

export const cv: Record<Lang, string> = {
  pt: `${base}cv/curriculo-diego-eduardo.pdf`,
  en: `${base}cv/resume-diego-eduardo.pdf`,
  es: `${base}cv/curriculo-diego-eduardo-es.pdf`,
};

export type ProjectImage = {
  src: string;
  label: Localized;
  alt: Localized;
  caption?: Localized;
};

export type ProjectTopic = "java" | "automation" | "api";

export type Project = {
  id: string;
  topics: ProjectTopic[];

  featured?: boolean;
  name: string;
  summary: Localized;
  tags: string[];

  repo?: string;

  image?: string;
  images?: ProjectImage[];

  demo?: string;
};

export const projects: Project[] = [
  {
    id: "zapflow",
    topics: ["java", "automation"],
    featured: true,
    name: "ZapFlow",
    summary: {
      en: "WhatsApp customer service automation platform. It has a visual flow editor, a versioned execution engine, a shared inbox with human handoff, and WhatsApp integration through Evolution API. It runs as a single-company install or as a multi-company SaaS with plans and affiliates.",
      pt: "Plataforma de automação de atendimento no WhatsApp. Tem editor visual de fluxos, motor de execução versionado, inbox com atendimento humano e integração com o WhatsApp via Evolution API. Roda para uma empresa ou como SaaS com várias empresas, planos e afiliados.",
      es: "Plataforma de automatización de atención al cliente en WhatsApp. Incluye un editor visual de flujos, un motor de ejecución versionado, una bandeja de entrada con atención humana e integración con WhatsApp mediante Evolution API. Funciona para una empresa o como SaaS con varias empresas, planes y afiliados.",
    },
    tags: [
      "Java 21",
      "Spring Boot",
      "PostgreSQL",
      "React",
      "TypeScript",
      "React Flow",
      "Docker",
    ],
    image: `${base}projects/zapflow-lp-zapflow.webp`,
    images: [
      {
        src: `${base}projects/zapflow-lp-zapflow.webp`,
        label: {
          pt: "Landing page",
          en: "Landing page",
          es: "Página de inicio",
        },
        caption: {
          pt: "Site de apresentação · ZapFlow",
          en: "Product website · ZapFlow",
          es: "Sitio de presentación · ZapFlow",
        },
        alt: {
          pt: "Landing page da ZapFlow com o título sobre atendimento automático no WhatsApp e uma demonstração ilustrativa de fluxo e conversa.",
          en: "ZapFlow landing page with its WhatsApp automation headline and an illustrative workflow and conversation demo.",
          es: "Página de inicio de ZapFlow con el título sobre atención automática en WhatsApp y una demostración ilustrativa de flujo y conversación.",
        },
      },
      {
        src: `${base}projects/zapflow-dashboard.webp`,
        label: { pt: "Dashboard", en: "Dashboard", es: "Dashboard" },
        alt: {
          pt: "Dashboard do ZapFlow com conversas abertas, mensagens e execuções de fluxos em um ambiente de demonstração.",
          en: "ZapFlow dashboard showing open conversations, messages and workflow executions in a demonstration environment.",
          es: "Dashboard de ZapFlow con conversaciones abiertas, mensajes y ejecuciones de flujos en un entorno de demostración.",
        },
      },
      {
        src: `${base}projects/zapflow-editor.webp`,
        label: {
          pt: "Editor de fluxos",
          en: "Flow editor",
          es: "Editor de flujos",
        },
        alt: {
          pt: "Editor visual do ZapFlow com um fluxo de boas-vindas, menu de opções e encaminhamento para atendimento humano.",
          en: "ZapFlow visual editor with a welcome flow, options menu and human support handoff.",
          es: "Editor visual de ZapFlow con un flujo de bienvenida, menú de opciones y transferencia a atención humana.",
        },
      },
      {
        src: `${base}projects/zapflow-simulator.webp`,
        label: { pt: "Simulador", en: "Simulator", es: "Simulador" },
        alt: {
          pt: "Fluxo do ZapFlow em execução no simulador, com uma conversa de teste ao lado do editor.",
          en: "ZapFlow workflow running in the simulator, with a test conversation next to the editor.",
          es: "Flujo de ZapFlow ejecutándose en el simulador, con una conversación de prueba junto al editor.",
        },
      },
    ],
  },
  {
    id: "digital-store",
    topics: ["java", "api"],
    name: "Digital Store",
    summary: {
      en: "Digital products platform with catalog, cart, coupons, subscriptions and expiring download links. Six Spring Boot microservices, Mercado Pago payments and an admin panel with 29 role-based permissions.",
      pt: "Plataforma de produtos digitais com catálogo, carrinho, cupons, assinaturas e entrega por link de download com expiração. Seis microsserviços Spring Boot, pagamentos via Mercado Pago e painel administrativo com 29 permissões por perfil.",
      es: "Plataforma de productos digitales con catálogo, carrito, cupones, suscripciones y enlaces de descarga con vencimiento. Seis microservicios Spring Boot, pagos con Mercado Pago y panel administrativo con 29 permisos por perfil.",
    },
    tags: [
      "Java",
      "Spring Boot",
      "Angular",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "Docker",
    ],
    image: `${base}projects/digital-store-storefront.webp`,
    images: [
      {
        src: `${base}projects/digital-store-storefront.webp`,
        label: { pt: "Loja", en: "Storefront", es: "Tienda" },
        alt: {
          pt: "Página inicial da loja com busca, categorias e os primeiros produtos do catálogo.",
          en: "Store home page with search, categories and the first catalog products.",
          es: "Página de inicio de la tienda con búsqueda, categorías y los primeros productos del catálogo.",
        },
      },
      {
        src: `${base}projects/digital-store-product.webp`,
        label: { pt: "Produto", en: "Product", es: "Producto" },
        alt: {
          pt: "Página de um produto digital com capa, preço, descrição e botão para adicionar ao carrinho.",
          en: "Digital product page with cover, price, description and an add-to-cart button.",
          es: "Página de un producto digital con portada, precio, descripción y botón para añadir al carrito.",
        },
      },
      {
        src: `${base}projects/digital-store-plans.webp`,
        label: { pt: "Planos", en: "Plans", es: "Planes" },
        alt: {
          pt: "Página pública com três planos de assinatura, preços, duração e lista de benefícios.",
          en: "Public page with three subscription plans, prices, duration and benefits.",
          es: "Página pública con tres planes de suscripción, precios, duración y beneficios.",
        },
      },
      {
        src: `${base}projects/digital-store-cart.webp`,
        label: { pt: "Carrinho", en: "Cart", es: "Carrito" },
        caption: {
          pt: "Cupom por categoria: o desconto vale só para os itens elegíveis",
          en: "Category coupon: the discount applies only to eligible items",
          es: "Cupón por categoría: el descuento vale solo para los artículos elegibles",
        },
        alt: {
          pt: "Carrinho com dois itens e um cupom aplicado, mostrando o desconto e o total do pedido.",
          en: "Cart with two items and an applied coupon, showing the discount and the order total.",
          es: "Carrito con dos artículos y un cupón aplicado, mostrando el descuento y el total del pedido.",
        },
      },
      {
        src: `${base}projects/digital-store-admin-dashboard.webp`,
        label: { pt: "Painel", en: "Dashboard", es: "Panel" },
        alt: {
          pt: "Painel administrativo com receita, vendas, usuários, downloads, pedidos recentes e novos usuários.",
          en: "Admin dashboard with revenue, sales, users, downloads, recent orders and new users.",
          es: "Panel administrativo con ingresos, ventas, usuarios, descargas, pedidos recientes y nuevos usuarios.",
        },
      },
      {
        src: `${base}projects/digital-store-admin-products.webp`,
        label: { pt: "Catálogo", en: "Catalog", es: "Catálogo" },
        alt: {
          pt: "Tela de gestão de produtos no admin, com busca, categoria, preço, status e ações de edição.",
          en: "Admin product management screen with search, category, price, status and edit actions.",
          es: "Pantalla de gestión de productos en el admin, con búsqueda, categoría, precio, estado y acciones de edición.",
        },
      },
      {
        src: `${base}projects/digital-store-admin-orders.webp`,
        label: { pt: "Pedidos", en: "Orders", es: "Pedidos" },
        alt: {
          pt: "Lista de pedidos no admin, com abas por status, total, data e situação de cada pedido.",
          en: "Admin order list with status tabs, total, date and the state of each order.",
          es: "Lista de pedidos en el admin, con pestañas por estado, total, fecha y situación de cada pedido.",
        },
      },
      {
        src: `${base}projects/digital-store-admin-users.webp`,
        label: { pt: "Usuários", en: "Users", es: "Usuarios" },
        caption: {
          pt: "Perfis de acesso com permissões por função",
          en: "Access roles with per-role permissions",
          es: "Perfiles de acceso con permisos por función",
        },
        alt: {
          pt: "Gestão de usuários no admin, com função de cada conta, como administrador ou cliente.",
          en: "Admin user management showing each account's role, such as administrator or customer.",
          es: "Gestión de usuarios en el admin, con la función de cada cuenta, como administrador o cliente.",
        },
      },
    ],
  },
];

export type TimelineEntry = {
  id: string;
  title: Localized;
  org: string;
  place?: Localized;
  start: string;
  end: string | null;
  note?: Localized;
  bullets?: LocalizedList;
  parts?: { id: string; name: Localized; tech: string[] }[];
  tech?: string[];
};

export const experience: TimelineEntry[] = [
  {
    id: "marinha",
    title: {
      en: "Software Development Intern",
      pt: "Estagiário em Desenvolvimento de Software",
      es: "Pasante de Desarrollo de Software",
    },
    org: "Marinha do Brasil",
    place: { en: "On-site", pt: "Presencial", es: "Presencial" },
    start: "2026-04",
    end: null,
    parts: [
      {
        id: "marinha-financeiro",
        name: {
          en: "Financial process management system",
          pt: "Sistema de gestão de processos financeiros",
          es: "Sistema de gestión de procesos financieros",
        },
        tech: [
          "Java 21",
          "Spring Boot",
          "Angular",
          "Python",
          "PaddleOCR",
          "Docker",
          "Kubernetes",
        ],
      },
      {
        id: "marinha-legado",
        name: {
          en: "Legacy administrative system modernization",
          pt: "Modernização de sistema administrativo legado",
          es: "Modernización de sistema administrativo heredado",
        },
        tech: ["Java", "Spring", "JSP", "JWT", "Docker", "Kubernetes"],
      },
    ],
  },
  {
    id: "madigui",
    title: {
      en: "Freelance Developer",
      pt: "Desenvolvedor Freelancer",
      es: "Desarrollador Freelance",
    },
    org: "Estúdio Madigui",
    place: { en: "Remote", pt: "Remoto", es: "Remoto" },
    start: "2025-06",
    end: "2025-06",
    tech: [
      "Node.js",
      "TypeScript",
      "Google Drive API",
      "EvolutionAPI",
      "Axios",
      "Docker",
    ],
  },
];

export const education: TimelineEntry[] = [
  {
    id: "estacio",
    title: {
      en: "Software Engineering",
      pt: "Engenharia de Software",
      es: "Ingeniería de Software",
    },
    org: "Universidade Estácio de Sá",
    start: "2024-01",
    end: "2027-12",
    note: {
      en: "In progress · 6th semester",
      pt: "Cursando · 6º período",
      es: "En curso · 6.º semestre",
    },
  },
];

export const skills: { title: Localized; items: string[] }[] = [
  {
    title: { en: "Languages", pt: "Linguagens", es: "Lenguajes" },
    items: [
      "Java",
      "Python",
      "TypeScript",
      "JavaScript",
      "SQL",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: { en: "Frameworks", pt: "Frameworks", es: "Frameworks" },
    items: [
      "Angular",
      "Spring Boot",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "NestJS",
    ],
  },
  {
    title: { en: "Databases", pt: "Bancos de dados", es: "Bases de datos" },
    items: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    title: { en: "Tools", pt: "Ferramentas", es: "Herramientas" },
    items: ["Docker", "Kubernetes", "Git"],
  },
];
