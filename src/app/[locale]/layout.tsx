import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono, DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { BackgroundLoader } from "@/components/background/background-loader";
import { Providers } from "@/components/layout/providers";
import { profile } from "@/data/profile";
import { routing } from "@/i18n/routing";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-bricolage",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

function localePath(locale: string) {
  return locale === routing.defaultLocale ? "/" : `/${locale}`;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("metadata");
  const description = t("description");

  return {
    metadataBase: new URL(siteUrl),
    title: profile.name,
    description,
    alternates: {
      canonical: localePath(locale),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, localePath(l)])),
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      url: localePath(locale),
      siteName: profile.name,
      title: profile.name,
      description,
      locale: t("ogLocale"),
    },
  };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${bricolage.variable} ${dmSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider>
          <Providers>
            <BackgroundLoader />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
