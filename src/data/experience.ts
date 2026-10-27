import type { Localized } from "@/lib/localized";

export type Experience = {
  period: string;
  role: Localized;
  place: string;
  summary: Localized;
};

/** Do mais recente para o mais antigo. */
export const experience: Experience[] = [
  {
    period: "[2025 — 2026]",
    role: { pt: "[Cargo]", en: "[Role]", es: "[Cargo]" },
    place: "[Empresa]",
    summary: {
      pt: "[Uma linha sobre o que você fez.]",
      en: "[One line about what you did.]",
      es: "[Una línea sobre lo que hiciste.]",
    },
  },
  {
    period: "[2024 — 2025]",
    role: { pt: "[Cargo]", en: "[Role]", es: "[Cargo]" },
    place: "[Empresa]",
    summary: {
      pt: "[Uma linha sobre o que você fez.]",
      en: "[One line about what you did.]",
      es: "[Una línea sobre lo que hiciste.]",
    },
  },
  {
    period: "[2023 — 2024]",
    role: { pt: "[Curso]", en: "[Course]", es: "[Curso]" },
    place: "[Instituição]",
    summary: {
      pt: "[Uma linha sobre o que você estudou.]",
      en: "[One line about what you studied.]",
      es: "[Una línea sobre lo que estudiaste.]",
    },
  },
];
