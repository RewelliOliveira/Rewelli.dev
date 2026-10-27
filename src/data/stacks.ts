import type { IconType } from "react-icons";
import {
  SiDocker,
  SiExpress,
  SiFastapi,
  SiJavascript,
  SiJupyter,
  SiLangchain,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

export type StackCategory = "language" | "framework" | "library" | "styling" | "tool";

export type Stack = {
  id: string;
  name: string;
  category: StackCategory;
  icon: IconType;
  color: string;
};

export const stacks = [
  { id: "javascript", name: "JavaScript", category: "language", icon: SiJavascript, color: "#F7DF1E" },
  { id: "typescript", name: "TypeScript", category: "language", icon: SiTypescript, color: "#3178C6" },
  { id: "python", name: "Python", category: "language", icon: SiPython, color: "#3776AB" },
  { id: "react", name: "React", category: "framework", icon: SiReact, color: "#61DAFB" },
  { id: "nextjs", name: "Next.js", category: "framework", icon: SiNextdotjs, color: "#000000" },
  { id: "nodejs", name: "Node.js", category: "tool", icon: SiNodedotjs, color: "#5FA04E" },
  { id: "express", name: "Express", category: "framework", icon: SiExpress, color: "#000000" },
  { id: "fastapi", name: "FastAPI", category: "framework", icon: SiFastapi, color: "#009688" },
  { id: "pandas", name: "pandas", category: "library", icon: SiPandas, color: "#150458" },
  { id: "scikitlearn", name: "scikit-learn", category: "library", icon: SiScikitlearn, color: "#F7931E" },
  { id: "langchain", name: "LangChain", category: "library", icon: SiLangchain, color: "#1C3C3C" },
  { id: "tailwind", name: "Tailwind", category: "styling", icon: SiTailwindcss, color: "#06B6D4" },
  { id: "postgresql", name: "PostgreSQL", category: "tool", icon: SiPostgresql, color: "#4169E1" },
  { id: "mysql", name: "MySQL", category: "tool", icon: SiMysql, color: "#4479A1" },
  { id: "supabase", name: "Supabase", category: "tool", icon: SiSupabase, color: "#3FCF8E" },
  { id: "docker", name: "Docker", category: "tool", icon: SiDocker, color: "#2496ED" },
  { id: "jupyter", name: "Jupyter", category: "tool", icon: SiJupyter, color: "#F37626" },
  { id: "vercel", name: "Vercel", category: "tool", icon: SiVercel, color: "#000000" },
] as const satisfies readonly Stack[];

export type StackId = (typeof stacks)[number]["id"];
