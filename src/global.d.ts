import type { Locale } from "@/i18n/routing";
import type messages from "../messages/pt.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}
