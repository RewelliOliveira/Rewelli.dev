import type { Localized } from "@/lib/localized";

export type Profile = {
  name: string;
  tagline: Localized;
  email: string;
  github: string;
  linkedin: string;
};

export const profile: Profile = {
  name: "Rewelli Oliveira",
  tagline: {
    pt: "[Frase curta sobre o que você faz, ex.: crio interfaces web rápidas, acessíveis e bem cuidadas.]",
    en: "[Short line about what you do, e.g. I build fast, accessible and carefully crafted web interfaces.]",
    es: "[Frase corta sobre lo que haces, ej.: creo interfaces web rápidas, accesibles y bien cuidadas.]",
  },
  email: "[PREENCHER]@email.com",
  github: "https://github.com/[PREENCHER]",
  linkedin: "https://www.linkedin.com/in/[PREENCHER]",
};
