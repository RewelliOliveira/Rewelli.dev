import type { IconType } from "react-icons";
import {
  SiDocker,
  SiFastapi,
  SiGreensock,
  SiJupyter,
  SiLangchain,
  SiMui,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";

export type StackCategory = "language" | "framework" | "library" | "styling" | "tool";

export type Stack = {
  id: string;
  name: string;
  category: StackCategory;
  icon: IconType;
};

export const stacks = [
  { id: "typescript", name: "TypeScript", category: "language", icon: SiTypescript },
  { id: "python", name: "Python", category: "language", icon: SiPython },
  { id: "react", name: "React", category: "framework", icon: SiReact },
  { id: "fastapi", name: "FastAPI", category: "framework", icon: SiFastapi },
  { id: "langchain", name: "LangChain", category: "library", icon: SiLangchain },
  { id: "gsap", name: "GSAP", category: "library", icon: SiGreensock },
  { id: "tailwind", name: "Tailwind", category: "styling", icon: SiTailwindcss },
  { id: "mui", name: "MUI", category: "styling", icon: SiMui },
  { id: "postgresql", name: "PostgreSQL", category: "tool", icon: SiPostgresql },
  { id: "docker", name: "Docker", category: "tool", icon: SiDocker },
  { id: "vite", name: "Vite", category: "tool", icon: SiVite },
  { id: "jupyter", name: "Jupyter", category: "tool", icon: SiJupyter },
  { id: "vercel", name: "Vercel", category: "tool", icon: SiVercel },
] as const satisfies readonly Stack[];

export type StackId = (typeof stacks)[number]["id"];
