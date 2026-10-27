import { getTranslations } from "next-intl/server";
import { profile } from "@/data/profile";
import { CopyEmailButton } from "./copy-email-button";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t py-10 sm:py-16">
      <p className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">{t("cta")}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="font-mono text-sm break-all underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
        >
          {profile.email}
        </a>
        <CopyEmailButton email={profile.email} />
      </div>
    </footer>
  );
}
