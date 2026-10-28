import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/ui/logo";
import { profile } from "@/data/profile";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export async function Header() {
  const t = await getTranslations("header");

  return (
    <header className="flex w-full items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
      <Link
        href="/"
        aria-label={`${profile.name} — ${t("home")}`}
      >
        <Logo />
      </Link>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
