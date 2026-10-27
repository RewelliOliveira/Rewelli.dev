import type { Localized } from "@/lib/localized";

export type Certificate = {
  slug: string;
  name: Localized;
  issuer: string;
  date: string;
  image: string;
  url?: string;
};

export const certificates: Certificate[] = [
  {
    slug: "google-ai-essentials",
    name: { pt: "Google AI Essentials", en: "Google AI Essentials", es: "Google AI Essentials" },
    issuer: "Google · Coursera",
    date: "08/2026",
    image: "/certificates/google-ai-essentials.webp",
    url: "https://www.coursera.org/account/accomplishments/specialization/CN31DZ4J87WK",
  },
  {
    slug: "python-for-everybody",
    name: {
      pt: "Programming for Everybody (Python)",
      en: "Programming for Everybody (Python)",
      es: "Programming for Everybody (Python)",
    },
    issuer: "University of Michigan · Coursera",
    date: "07/2026",
    image: "/certificates/python-for-everybody.webp",
    url: "https://www.coursera.org/account/accomplishments/verify/MKSQDNM0J8WE",
  },
  {
    slug: "word-forms-simple-present",
    name: {
      pt: "Word Forms and Simple Present Tense",
      en: "Word Forms and Simple Present Tense",
      es: "Word Forms and Simple Present Tense",
    },
    issuer: "UC Irvine · Coursera",
    date: "06/2026",
    image: "/certificates/word-forms-simple-present.webp",
    url: "https://www.coursera.org/account/accomplishments/verify/TOTVLDKJ6TLZ",
  },
  {
    slug: "aws-cloud-foundations",
    name: {
      pt: "AWS Academy Cloud Foundations",
      en: "AWS Academy Cloud Foundations",
      es: "AWS Academy Cloud Foundations",
    },
    issuer: "Amazon Web Services · Credly",
    date: "05/2026",
    image: "/certificates/aws-cloud-foundations.webp",
    url: "https://www.credly.com/badges/06333671-6716-4ff5-a019-aede2ad53fdc",
  },
];
