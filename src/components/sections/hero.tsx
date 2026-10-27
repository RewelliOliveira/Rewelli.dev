import { getLocale, getTranslations } from "next-intl/server";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { Reveal } from "@/components/motion/reveal";
import { RandomLetterSwap } from "@/components/ui/random-letter-swap";
import { profile } from "@/data/profile";
import { localize } from "@/lib/localized";
import { HeroVideo } from "./hero-video";

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
          <RandomLetterSwap
            label={profile.name}
            swapLabel={localize(profile.role, locale)}
            suffix={
              <span className="ml-[0.06em] inline-block h-[0.72em] w-[0.34em] animate-caret bg-primary" />
            }
          />
        </h1>
        <Reveal
          as="p"
          onMount
          y={12}
          className="mt-5 max-w-md text-lg text-pretty text-muted-foreground"
        >
          {localize(profile.tagline, locale)}
        </Reveal>
        <ul className="mt-7 flex flex-wrap gap-2">
          {links.map(({ label, href, icon: Icon }, index) => (
            <Reveal as="li" key={label} onMount y={12} delay={(index + 1) * 0.08}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-medium transition-colors hover:border-foreground/20 hover:bg-muted"
              >
                <Icon className="size-4" aria-hidden />
                {label}
                <span className="sr-only">{t("newTab")}</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
      <Reveal
        onMount
        y={0}
        scale={0.96}
        className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-xl border bg-muted"
      >
        <HeroVideo />
      </Reveal>
    </section>
  );
}
