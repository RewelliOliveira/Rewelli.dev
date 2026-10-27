import { getLocale, getTranslations } from "next-intl/server";
import { experience } from "@/data/experience";
import { localize } from "@/lib/localized";

export async function Experience() {
  const locale = await getLocale();
  const t = await getTranslations("experience");

  return (
    <section aria-labelledby="experience-title">
      <h2 id="experience-title" className="font-heading text-3xl font-medium tracking-tight">
        {t("title")}
      </h2>
      <ol className="mt-8 divide-y border-y">
        {experience.map((item) => (
          <li
            key={`${item.start}-${item.place}`}
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
          </li>
        ))}
      </ol>
    </section>
  );
}
