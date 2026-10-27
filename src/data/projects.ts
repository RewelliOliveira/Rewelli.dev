import type { Localized } from "@/lib/localized";
import type { StackId } from "./stacks";

export const projectCategories = ["apps", "landing", "ai"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Repo = {
  url: string;
  part?: "frontend" | "backend";
};

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  description: Localized;
  year: number;
  featured: boolean;
  image?: string;
  url?: string;
  repos: Repo[];
  stacks: StackId[];
};

export const projects: Project[] = [
  {
    slug: "your-menu",
    name: "Your Menu",
    category: "apps",
    description: {
      pt: "Plataforma de pedidos para restaurantes: cardápio digital, checkout com Pix e painel de pedidos em tempo real.",
      en: "An ordering platform for restaurants: digital menu, Pix checkout and a real-time order dashboard.",
      es: "Una plataforma de pedidos para restaurantes: menú digital, checkout con Pix y panel de pedidos en tiempo real.",
    },
    year: 2025,
    featured: true,
    image: "/projects/your-menu.png",
    url: "https://your-menu-zeta.vercel.app",
    repos: [{ url: "https://github.com/RewelliOliveira/your-menu" }],
    stacks: ["react", "typescript", "tailwind", "vite", "vercel"],
  },
  {
    slug: "aircrafts",
    name: "Aircrafts",
    category: "apps",
    description: {
      pt: "Gestão de companhias aéreas e frotas: API REST com busca por código IATA e uma interface que recebe os eventos em tempo real via Server-Sent Events.",
      en: "Airline and fleet management: a REST API with IATA code lookup and an interface that receives events in real time over Server-Sent Events.",
      es: "Gestión de aerolíneas y flotas: una API REST con búsqueda por código IATA y una interfaz que recibe los eventos en tiempo real vía Server-Sent Events.",
    },
    year: 2026,
    featured: false,
    repos: [
      { url: "https://github.com/RewelliOliveira/aircraft-user-interface", part: "frontend" },
      { url: "https://github.com/RewelliOliveira/aircrafts-api", part: "backend" },
    ],
    stacks: ["python", "fastapi", "postgresql", "docker", "react", "typescript", "mui", "tailwind", "vite"],
  },
  {
    slug: "abyss",
    name: "Abyss",
    category: "landing",
    description: {
      pt: "Mergulho por rolagem até o ponto mais fundo da Terra, a 10.935 m.",
      en: "A scroll-driven dive to the deepest known point on Earth, 10,935 m down.",
      es: "Un descenso con scroll hasta el punto más profundo de la Tierra, a 10.935 m.",
    },
    year: 2026,
    featured: true,
    image: "/projects/abyss-hero.png",
    url: "https://abyss-one-phi.vercel.app",
    repos: [{ url: "https://github.com/RewelliOliveira/Abyss" }],
    stacks: ["react", "typescript", "gsap", "tailwind", "vite", "vercel"],
  },
  {
    slug: "hollowcrest",
    name: "Hollowcrest",
    category: "landing",
    description: {
      pt: "Site de um RPG de ação em pixel art 16-bit, com seis heróis animados em GSAP e sprites tratados em Python.",
      en: "A site for a 16-bit pixel art action RPG, with six heroes animated in GSAP and sprites processed in Python.",
      es: "Sitio de un RPG de acción en pixel art 16-bit, con seis héroes animados en GSAP y sprites procesados en Python.",
    },
    year: 2026,
    featured: false,
    image: "/projects/hollowcrest.png",
    url: "https://hollowcrest-rho.vercel.app",
    repos: [{ url: "https://github.com/RewelliOliveira/Hollowcrest" }],
    stacks: ["react", "typescript", "gsap", "tailwind", "vite", "python", "vercel"],
  },
  {
    slug: "renvest",
    name: "Renvest",
    category: "ai",
    description: {
      pt: "Agente de IA com RAG que ensina investidores iniciantes a partir de dados oficiais da B3 e da CVM. Meu TCC na UFC.",
      en: "A RAG-powered AI agent that teaches beginner investors using official data from B3 and CVM. My undergraduate thesis at UFC.",
      es: "Un agente de IA con RAG que enseña a inversores principiantes a partir de datos oficiales de B3 y CVM. Mi trabajo de grado en la UFC.",
    },
    year: 2026,
    featured: true,
    image: "/projects/renvest.png",
    url: "https://renvest-eight.vercel.app",
    repos: [],
    stacks: ["react", "typescript", "tailwind", "vite", "python", "fastapi", "langchain", "vercel"],
  },
  {
    slug: "data-mine",
    name: "Data Mine",
    category: "ai",
    description: {
      pt: "Notebooks de Mineração de Dados: análise exploratória, pré-processamento, KNN e árvore de decisão, em ambiente Docker.",
      en: "Data mining notebooks: exploratory analysis, preprocessing, KNN and decision trees, in a Docker environment.",
      es: "Notebooks de minería de datos: análisis exploratorio, preprocesamiento, KNN y árboles de decisión, en un entorno Docker.",
    },
    year: 2026,
    featured: false,
    repos: [{ url: "https://github.com/RewelliOliveira/data-mine" }],
    stacks: ["python", "jupyter", "docker"],
  },
];
