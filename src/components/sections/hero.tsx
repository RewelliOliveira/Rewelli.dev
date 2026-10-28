import { getLocale, getTranslations } from "next-intl/server";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { Reveal } from "@/components/motion/reveal";
import { LetterReveal } from "@/components/ui/letter-reveal";
import { profile } from "@/data/profile";
import { brandColors } from "@/data/stacks";
import { localize } from "@/lib/localized";
import { stackIconBrand, stackIconVars } from "@/lib/stack-color";
import { cn } from "@/lib/utils";
import { HeroVideo } from "./hero-video";

export async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("common");

  const links = [
    { label: "GitHub", href: profile.github, icon: SiGithub, color: brandColors.github },
    { label: "LinkedIn", href: profile.linkedin, icon: FaLinkedin, color: brandColors.linkedin },
  ];

  return (
    <section className="grid items-center gap-10 pt-6 md:grid-cols-[1fr_320px] md:gap-16 md:pt-16">
      <div>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          <LetterReveal text={profile.name} />
        </h1>
        <LetterReveal
          text={localize(profile.role, locale)}
          delay={0.3}
          staggerDuration={0.015}
          className="mt-2 font-mono text-sm tracking-wider text-muted-foreground uppercase"
        />
        <Reveal
          as="p"
          onMount
          y={12}
          className="mt-4 max-w-md text-base text-pretty text-muted-foreground sm:mt-5 sm:text-lg"
        >
          {localize(profile.tagline, locale)}
        </Reveal>
        <ul className="mt-6 flex flex-wrap gap-2 sm:mt-7">
          {links.map(({ label, href, icon: Icon, color }, index) => (
            <Reveal as="li" key={label} onMount y={12} delay={(index + 1) * 0.08}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-input bg-card px-3 py-2 text-sm font-medium transition-colors hover:border-highlight/50 hover:bg-highlight-soft hover:text-highlight-foreground"
              >
                <Icon
                  className={cn("size-4", stackIconBrand)}
                  style={stackIconVars(color)}
                  aria-hidden
                />
                <span translate="no">{label}</span>
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
        className="relative hidden aspect-square w-full max-w-[320px] overflow-hidden rounded-xl border bg-muted md:block"
      >
        <HeroVideo />
      </Reveal>
    </section>
  );
}
