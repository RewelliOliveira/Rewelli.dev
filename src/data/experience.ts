import type { Localized } from "@/lib/localized";

export type Experience = {
  start: string;
  end?: string;
  role: Localized;
  place: string;
  summary: Localized;
};

export const experience: Experience[] = [
  {
    start: "12/2025",
    role: { pt: "Desenvolvedor Full-Stack", en: "Full-Stack Developer", es: "Desarrollador Full-Stack" },
    place: "OPEN 7 · Pinheiro Supermercado",
    summary: {
      pt: "Soluções de ponta a ponta para logística e financeiro com Node.js e React. Automatizei o reenvio de pallets e o processamento de mensagens, reduzindo os chamados de TI.",
      en: "End-to-end solutions for logistics and finance with Node.js and React. Automated pallet resending and message processing, cutting IT tickets significantly.",
      es: "Soluciones de punta a punta para logística y finanzas con Node.js y React. Automaticé el reenvío de pallets y el procesamiento de mensajes, reduciendo los tickets de TI.",
    },
  },
  {
    start: "11/2025",
    end: "04/2026",
    role: {
      pt: "Desenvolvedor Front-end (Bolsista)",
      en: "Front-end Developer (Research Fellow)",
      es: "Desarrollador Front-end (Becario)",
    },
    place: "Fiocruz · Projeto Hora de Cuidar",
    summary: {
      pt: "Interfaces acessíveis em React e Tailwind para profissionais de saúde visualizarem dados clínicos, com integração a APIs REST e validação de dados.",
      en: "Accessible React and Tailwind interfaces for healthcare professionals to explore clinical data, integrated with REST APIs and data validation.",
      es: "Interfaces accesibles en React y Tailwind para que profesionales de la salud visualicen datos clínicos, integradas con APIs REST y validación de datos.",
    },
  },
  {
    start: "10/2025",
    role: { pt: "Desenvolvedor de Software", en: "Software Developer", es: "Desarrollador de Software" },
    place: "Avante Tech Jr.",
    summary: {
      pt: "ERP web em React e TypeScript. Faço code reviews, ajudo a definir a arquitetura de componentes e mantenho a esteira de CI/CD com GitHub Actions.",
      en: "Web ERP in React and TypeScript. I do code reviews, help shape the component architecture and maintain the CI/CD pipeline on GitHub Actions.",
      es: "ERP web en React y TypeScript. Hago code reviews, ayudo a definir la arquitectura de componentes y mantengo el pipeline de CI/CD con GitHub Actions.",
    },
  },
  {
    start: "03/2023",
    end: "12/2026",
    role: {
      pt: "Bacharelado em Engenharia de Software",
      en: "B.Sc. in Software Engineering",
      es: "Grado en Ingeniería de Software",
    },
    place: "UFC Quixadá",
    summary: {
      pt: "Universidade Federal do Ceará. Conclusão prevista para dezembro de 2026.",
      en: "Federal University of Ceará. Expected to graduate in December 2026.",
      es: "Universidad Federal de Ceará. Graduación prevista para diciembre de 2026.",
    },
  },
  {
    start: "03/2020",
    end: "12/2022",
    role: {
      pt: "Ensino Técnico em Informática",
      en: "Technical Degree in Computing",
      es: "Técnico en Informática",
    },
    place: "EEEP Maria Môsa da Silva",
    summary: {
      pt: "Curso técnico integrado ao ensino médio, em Ocara (CE).",
      en: "Technical program integrated with high school, in Ocara, Brazil.",
      es: "Curso técnico integrado a la secundaria, en Ocara (Brasil).",
    },
  },
];
