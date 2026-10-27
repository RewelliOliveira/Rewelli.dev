import type { Locale } from "@/i18n/routing";

/** Texto nos três idiomas do site. */
export type Localized = Record<Locale, string>;

export function localize(text: Localized, locale: Locale) {
  return text[locale];
}
