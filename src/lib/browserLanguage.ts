import { LANGS, type Lang } from "../i18n/types";
import { langFromPath, pathFor } from "../seo";

const KEY = "lang";
const CRAWLER = /bot|crawl|spider|slurp|lighthouse|facebookexternalhit/i;

function savedLang(): Lang | null {
  try {
    const value = localStorage.getItem(KEY) as Lang | null;
    return value && LANGS.includes(value) ? value : null;
  } catch {
    return null;
  }
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {}
}

function browserLang(): Lang | null {
  for (const tag of navigator.languages ?? [navigator.language]) {
    const lang = tag.slice(0, 2).toLowerCase() as Lang;
    if (LANGS.includes(lang)) return lang;
  }
  return null;
}

export function redirectToPreferredLanguage(): boolean {
  if (langFromPath(location.pathname) !== "pt") return false;
  if (navigator.webdriver || CRAWLER.test(navigator.userAgent)) return false;
  const target = savedLang() ?? browserLang() ?? "pt";
  if (target === "pt") return false;
  location.replace(pathFor(target) + location.search + location.hash);
  return true;
}
