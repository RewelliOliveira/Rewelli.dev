import type { Localized } from "@/lib/localized";

export type Profile = {
  name: string;
  role: Localized;
  tagline: Localized;
  email: string;
  whatsapp: { display: string; number: string };
  github: string;
  linkedin: string;
};

export const profile: Profile = {
  name: "Rewelli Oliveira",
  role: {
    pt: "Desenvolvedor Full Stack",
    en: "Full Stack Developer",
    es: "Desarrollador Full Stack",
  },
  tagline: {
    pt: "Crio aplicações web de ponta a ponta, do banco de dados à interface, com React, TypeScript e Node.js para varejo, finanças e saúde.",
    en: "I build web applications end to end, from the database to the interface, with React, TypeScript and Node.js for retail, finance and healthcare.",
    es: "Creo aplicaciones web de punta a punta, de la base de datos a la interfaz, con React, TypeScript y Node.js para retail, finanzas y salud.",
  },
  email: "rewellidev@gmail.com",
  whatsapp: { display: "+55 88 9489-5443", number: "558894895443" },
  github: "https://github.com/RewelliOliveira",
  linkedin: "https://www.linkedin.com/in/reulixs",
};
