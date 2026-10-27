import { getTranslations } from "next-intl/server";
import { FaWhatsapp } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/data/profile";
import { stackIconBrand, stackIconVars } from "@/lib/stack-color";
import { cn } from "@/lib/utils";
import { CopyEmailButton } from "./copy-email-button";

export async function Footer() {
  const t = await getTranslations("footer");
  const tCommon = await getTranslations("common");

  const contacts = [
    {
      label: t("email"),
      detail: profile.email,
      href: `mailto:${profile.email}`,
      icon: SiGmail,
      color: "#EA4335",
      external: false,
    },
    {
      label: "WhatsApp",
      detail: profile.whatsapp.display,
      href: `https://wa.me/${profile.whatsapp.number}`,
      icon: FaWhatsapp,
      color: "#25D366",
      external: true,
    },
  ];

  return (
    <footer className="border-t py-10 sm:py-16">
      <Reveal>
        <p className="font-heading text-2xl font-medium tracking-tight text-balance sm:text-3xl">{t("cta")}</p>
      </Reveal>
      <ul className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
        {contacts.map(({ label, detail, href, icon: Icon, color, external }, index) => (
          <Reveal as="li" key={href} y={12} delay={(index + 1) * 0.08}>
            <a
              href={href}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className="group flex items-center gap-3 rounded-lg border bg-card px-4 py-3 transition-colors hover:border-highlight/50 hover:bg-highlight-soft hover:text-highlight-foreground"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-md bg-muted text-foreground transition-colors group-hover:bg-background">
                <Icon
                  className={cn("size-4 transition-transform duration-200 group-hover:scale-110", stackIconBrand)}
                  style={stackIconVars(color)}
                  aria-hidden
                />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{label}</span>
                <span className="block truncate font-mono text-xs text-muted-foreground">{detail}</span>
              </span>
              {external && <span className="sr-only">{tCommon("newTab")}</span>}
            </a>
          </Reveal>
        ))}
      </ul>
      <Reveal y={12} delay={0.24} className="mt-4">
        <CopyEmailButton email={profile.email} />
      </Reveal>
    </footer>
  );
}
