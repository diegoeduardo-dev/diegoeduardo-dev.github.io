import type { Lang } from "../i18n/types";

const locales: Record<Lang, string> = { pt: "pt-BR", en: "en-US", es: "es-ES" };

export function formatMonth(value: string, lang: Lang) {
  const parts = new Intl.DateTimeFormat(locales[lang], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).formatToParts(new Date(`${value}-01T00:00:00Z`));
  const month = parts
    .find((part) => part.type === "month")!
    .value.replace(/\.$/, "");
  const year = parts.find((part) => part.type === "year")!.value;
  return `${month} ${year}`;
}
