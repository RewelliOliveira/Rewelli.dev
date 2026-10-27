import { getLocale, getTranslations } from "next-intl/server";
import { certificates } from "@/data/certificates";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/motion/reveal";
import { localize } from "@/lib/localized";
import { CertificateList } from "./certificate-list";
import { ExperienceTimeline } from "./experience-timeline";
import { ProjectTabs } from "./project-tabs";

export async function Experience() {
  const locale = await getLocale();
  const t = await getTranslations("experience");
  const tCommon = await getTranslations("common");

  const timelineItems = experience.map((item) => ({
    id: `${item.start}-${item.place}`,
    period: `${item.start} — ${item.end ?? t("present")}`,
    current: !item.end,
    role: localize(item.role, locale),
    place: item.place,
    summary: localize(item.summary, locale),
  }));

  const certificateItems = certificates.map((certificate) => ({
    slug: certificate.slug,
    name: localize(certificate.name, locale),
    issuer: certificate.issuer,
    date: certificate.date,
    image: certificate.image,
    url: certificate.url,
  }));

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
            content: <ExperienceTimeline items={timelineItems} />,
          },
          {
            id: "certificates",
            label: t("certificatesTab"),
            count: certificates.length,
            content: (
              <CertificateList
                items={certificateItems}
                verifyLabel={t("verify")}
                newTabLabel={tCommon("newTab")}
              />
            ),
          },
        ]}
      />
    </section>
  );
}
