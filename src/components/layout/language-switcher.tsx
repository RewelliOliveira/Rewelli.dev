"use client";

import { Fragment } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const t = useTranslations("header");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")} className="flex items-center gap-1 font-mono text-xs">
      {routing.locales.map((locale, index) => (
        <Fragment key={locale}>
          {index > 0 && (
            <span aria-hidden className="text-muted-foreground/60">
              ·
            </span>
          )}
          <Link
            href={pathname}
            locale={locale}
            hrefLang={locale}
            lang={locale}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "rounded-sm px-1.5 py-1 uppercase tracking-wide transition-colors",
              locale === current
                ? "text-foreground"
                : "text-muted-foreground hover:text-highlight-foreground",
            )}
          >
            {locale}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}
