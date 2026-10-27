import type { IconType } from "react-icons";
import {
  SiCss,
  SiFigma,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

export type StackCategory = "language" | "framework" | "styling" | "tool";

export type Stack = {
  id: string;
  name: string;
  category: StackCategory;
  icon: IconType;
};

export const stacks = [
  { id: "html", name: "HTML", category: "language", icon: SiHtml5 },
  { id: "css", name: "CSS", category: "styling", icon: SiCss },
  { id: "javascript", name: "JavaScript", category: "language", icon: SiJavascript },
  { id: "typescript", name: "TypeScript", category: "language", icon: SiTypescript },
  { id: "react", name: "React", category: "framework", icon: SiReact },
  { id: "nextjs", name: "Next.js", category: "framework", icon: SiNextdotjs },
  { id: "tailwind", name: "Tailwind", category: "styling", icon: SiTailwindcss },
  { id: "git", name: "Git", category: "tool", icon: SiGit },
  { id: "figma", name: "Figma", category: "tool", icon: SiFigma },
  { id: "vercel", name: "Vercel", category: "tool", icon: SiVercel },
] as const satisfies readonly Stack[];

export type StackId = (typeof stacks)[number]["id"];
