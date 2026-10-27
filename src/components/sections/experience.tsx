import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { certificates } from "@/data/certificates";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/motion/reveal";
import { localize } from "@/lib/localized";
import { ProjectTabs } from "./project-tabs";

export async function Experience() {
  const locale = await getLocale();
  const t = await getTranslations("experience");
  const tCommon = await getTranslations("common");

  const experienceList = (
    <ol className="divide-y border-y">
      {experience.map((item, index) => (
        <Reveal
          as="li"
          key={`${item.start}-${item.place}`}
          delay={index * 0.06}
          className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
        >
          <p className="font-mono text-sm text-muted-foreground">
            {item.start} — {item.end ?? t("present")}
          </p>
          <div>
            <p className="font-medium">
              {localize(item.role, locale)}
              <span className="text-muted-foreground"> · {item.place}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{localize(item.summary, locale)}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );

  const certificateGrid = (
    <ul className="grid gap-4 sm:grid-cols-2">
      {certificates.map((certificate, index) => {
        const name = localize(certificate.name, locale);
        const card = (
          <>
            <div className="relative aspect-16/10 overflow-hidden rounded-md border bg-white">
              <Image
                src={certificate.image}
                alt={t("certificatePreview", { name })}
                fill
                sizes="(min-width: 640px) 440px, 100vw"
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-medium">{name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{certificate.issuer}</p>
              </div>
              <p className="shrink-0 font-mono text-sm text-muted-foreground">{certificate.date}</p>
            </div>
            {certificate.url && (
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium transition-colors group-hover:text-primary">
                {t("verify")}
                <ArrowUpRight className="size-3.5" aria-hidden />
                <span className="sr-only">{tCommon("newTab")}</span>
              </span>
            )}
          </>
        );
        const cardClass =
          "group block h-full rounded-xl border bg-card p-3 text-card-foreground transition-colors duration-300 hover:border-foreground/20";

        return (
          <Reveal as="li" key={certificate.slug} delay={index * 0.06}>
            {certificate.url ? (
              <a href={certificate.url} target="_blank" rel="noopener noreferrer" className={cardClass}>
                {card}
              </a>
            ) : (
              <div className={cardClass}>{card}</div>
            )}
          </Reveal>
        );
      })}
    </ul>
  );

  return (
    <section aria-labelledby="experience-title">
      <Reveal>
        <h2 id="experience-title" className="font-heading text-3xl font-medium tracking-tighter sm:text-4xl">
          {t("title")}
        </h2>
      </Reveal>
      <ProjectTabs
        label={t("tabsLabel")}
        layoutId="experience-tab-active"
        tabs={[
          {
            id: "experience",
            label: t("experienceTab"),
            count: experience.length,
            content: experienceList,
          },
          {
            id: "certificates",
            label: t("certificatesTab"),
            count: certificates.length,
            content: certificateGrid,
          },
        ]}
      />
    </section>
  );
}
