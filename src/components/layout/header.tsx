import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/ui/logo";
import { profile } from "@/data/profile";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export async function Header() {
  const t = await getTranslations("header");

  return (
    <header className="flex items-center justify-between gap-4 py-6">
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
