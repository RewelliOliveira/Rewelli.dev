import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { profile } from "@/data/profile";
import { localize } from "@/lib/localized";

export async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("common");

  const links = [
    { label: "GitHub", href: profile.github, icon: SiGithub },
    { label: "LinkedIn", href: profile.linkedin, icon: FaLinkedin },
  ];

  return (
    <section className="grid items-center gap-10 pt-10 md:grid-cols-[1fr_320px] md:gap-16 md:pt-16">
      <div>
        <h1 className="font-heading text-5xl font-bold tracking-tight text-balance sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-5 max-w-md text-lg text-pretty text-muted-foreground">
          {localize(profile.tagline, locale)}
        </p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {links.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Icon className="size-4" aria-hidden />
                {label}
                <span className="sr-only">{t("newTab")}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl bg-muted">
        <Image
          src="/cat.webp"
          alt=""
          fill
          priority
          unoptimized
          sizes="320px"
          className="object-cover"
        />
      </div>
    </section>
  );
}
