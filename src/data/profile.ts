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
    pt: "Desenvolvedor full-stack. Crio aplicações web de ponta a ponta com React, TypeScript e Node.js para varejo, finanças e saúde.",
    en: "Full-stack developer. I build end-to-end web applications with React, TypeScript and Node.js for retail, finance and healthcare.",
    es: "Desarrollador full-stack. Creo aplicaciones web de punta a punta con React, TypeScript y Node.js para retail, finanzas y salud.",
  },
  email: "rewellidev@gmail.com",
  github: "https://github.com/RewelliOliveira",
  linkedin: "https://www.linkedin.com/in/reulixs",
};
