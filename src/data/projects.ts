import type { Localized } from "@/lib/localized";
import type { StackId } from "./stacks";

export type Project = {
  slug: string;
  name: string;
  description: Localized;
  year: number;
  /** Ganha o selo "Destaque". */
  featured: boolean;
  /** Caminho dentro de /public, ex.: "/projects/abyss.png" (proporção 16:10). */
  image: string;
  /** Sem url, o projeto aparece como "Só código". */
  url?: string;
  repo: string;
  stacks: StackId[];
};

/** Em ordem de relevância: o primeiro aparece no topo. */
export const projects: Project[] = [
  {
    slug: "abyss",
    name: "Abyss",
    description: {
      pt: "Mergulho por rolagem até o ponto mais fundo da Terra, a 10.935 m.",
      en: "A scroll-driven dive to the deepest known point on Earth, 10,935 m down.",
      es: "Un descenso con scroll hasta el punto más profundo de la Tierra, a 10.935 m.",
    },
    year: 2026,
    featured: true,
    image: "/projects/abyss.png",
    url: "https://abyss-one-phi.vercel.app",
    repo: "https://github.com/[PREENCHER]/abyss",
    stacks: ["nextjs", "react", "typescript", "tailwind", "vercel"],
  },
  {
    slug: "landing-page-2",
    name: "[Landing page 2]",
    description: {
      pt: "[Descrição de uma linha do projeto.]",
      en: "[One-line project description.]",
      es: "[Descripción de una línea del proyecto.]",
    },
    year: 2025,
    featured: false,
    image: "/projects/landing-page-2.png",
    url: "https://example.com",
    repo: "https://github.com/[PREENCHER]/landing-page-2",
    stacks: ["react", "javascript", "css", "figma"],
  },
  {
    slug: "landing-page-3",
    name: "[Landing page 3]",
    description: {
      pt: "[Descrição de uma linha do projeto.]",
      en: "[One-line project description.]",
      es: "[Descripción de una línea del proyecto.]",
    },
    year: 2025,
    featured: false,
    image: "/projects/landing-page-3.png",
    url: "https://example.org",
    repo: "https://github.com/[PREENCHER]/landing-page-3",
    stacks: ["html", "css", "javascript", "git"],
  },
  {
    slug: "landing-page-4",
    name: "[Landing page 4]",
    description: {
      pt: "[Descrição de uma linha do projeto.]",
      en: "[One-line project description.]",
      es: "[Descripción de una línea del proyecto.]",
    },
    year: 2024,
    featured: false,
    image: "/projects/landing-page-4.png",
    repo: "https://github.com/[PREENCHER]/landing-page-4",
    stacks: ["html", "css", "git"],
  },
];
