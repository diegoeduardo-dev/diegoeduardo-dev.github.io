import { SITE_ORIGIN } from "../site.config";
import {
  education,
  experience,
  links,
  profile,
  skills,
} from "./config/portfolio";
import { LANGS, type Lang } from "./i18n/types";

const base = import.meta.env.BASE_URL;

export const DEFAULT_LANG: Lang = "pt";
export const HTML_LANG: Record<Lang, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};
const OG_LOCALE: Record<Lang, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

export const pathFor = (lang: Lang) =>
  base + (lang === DEFAULT_LANG ? "" : `${lang}/`);
export const urlFor = (lang: Lang) => SITE_ORIGIN + pathFor(lang);

export function langFromPath(path: string): Lang {
  const rest = path.startsWith(base)
    ? path.slice(base.length)
    : path.replace(/^\//, "");
  const first = rest.split("/")[0] as Lang;
  return LANGS.includes(first) && first !== DEFAULT_LANG ? first : DEFAULT_LANG;
}

export type HeadElement = {
  type: "meta" | "link" | "script";
  props: Record<string, string>;
};

const title = (lang: Lang) => `${profile.name} | ${profile.role[lang]}`;
const image = `${SITE_ORIGIN}${base}og.png`;

function jsonLd(lang: Lang) {
  const org = (name: string) => ({ "@type": "Organization", name });
  const current = experience.find((e) => e.end === null);
  const person = {
    "@type": "Person",
    "@id": `${urlFor(DEFAULT_LANG)}#person`,
    name: profile.name,
    jobTitle: profile.role[lang],
    description: profile.tagline[lang],
    url: urlFor(lang),
    image: `${SITE_ORIGIN}${base}photo.jpg`,
    email: `mailto:${links.email}`,
    sameAs: [links.github, links.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Belford Roxo",
      addressRegion: "RJ",
      addressCountry: "BR",
    },
    knowsAbout: skills.flatMap((g) => g.items),
    knowsLanguage: ["pt-BR", "en", "es"],
    ...(current ? { worksFor: org(current.org) } : {}),
    alumniOf: education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.org,
    })),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "ProfilePage",
        "@id": `${urlFor(lang)}#profile`,
        url: urlFor(lang),
        name: title(lang),
        description: profile.description[lang],
        inLanguage: HTML_LANG[lang],
        mainEntity: { "@id": person["@id"] },
        isPartOf: {
          "@type": "WebSite",
          name: profile.name,
          url: urlFor(DEFAULT_LANG),
        },
      },
    ],
  };
}

export function buildHead(lang: Lang) {
  const description = profile.description[lang];
  const meta = (
    key: "name" | "property",
    name: string,
    content: string,
  ): HeadElement => ({
    type: "meta",
    props: { [key]: name, content },
  });
  const elements: HeadElement[] = [
    meta("name", "description", description),
    meta("name", "robots", "index, follow, max-image-preview:large"),
    meta("name", "author", profile.name),
    { type: "link", props: { rel: "canonical", href: urlFor(lang) } },
    ...LANGS.map<HeadElement>((l) => ({
      type: "link",
      props: { rel: "alternate", hreflang: HTML_LANG[l], href: urlFor(l) },
    })),
    {
      type: "link",
      props: {
        rel: "alternate",
        hreflang: "x-default",
        href: urlFor(DEFAULT_LANG),
      },
    },
    meta("property", "og:type", "profile"),
    meta("property", "og:site_name", profile.name),
    meta("property", "og:title", title(lang)),
    meta("property", "og:description", description),
    meta("property", "og:url", urlFor(lang)),
    meta("property", "og:locale", OG_LOCALE[lang]),
    ...LANGS.filter((l) => l !== lang).map((l) =>
      meta("property", "og:locale:alternate", OG_LOCALE[l]),
    ),
    meta("property", "og:image", image),
    meta("property", "og:image:type", "image/png"),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", `${profile.name}, ${profile.role[lang]}`),
    meta("property", "profile:first_name", "Diego Eduardo"),
    meta("property", "profile:last_name", "Soares da Silva"),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", title(lang)),
    meta("name", "twitter:description", description),
    meta("name", "twitter:image", image),
    {
      type: "script",
      props: {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd(lang)),
      },
    },
  ];
  return { htmlLang: HTML_LANG[lang], title: title(lang), elements };
}

export function applyHead(lang: Lang) {
  const head = buildHead(lang);
  document.documentElement.lang = head.htmlLang;
  document.title = head.title;
  for (const { type, props } of head.elements) {
    const { children, ...attrs } = props;
    let selector: string = type;
    if (type === "script") selector = 'script[type="application/ld+json"]';
    else if (props.name) selector = `meta[name="${props.name}"]`;
    else if (props.hreflang)
      selector = `link[rel="alternate"][hreflang="${props.hreflang}"]`;
    else if (props.rel) selector = `link[rel="${props.rel}"]`;
    else if (props.property === "og:locale:alternate") continue;
    else if (props.property) selector = `meta[property="${props.property}"]`;
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement(type);
      document.head.appendChild(el);
    }
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    if (children !== undefined) el.textContent = children;
  }

  document.head
    .querySelectorAll('meta[property="og:locale:alternate"]')
    .forEach((n) => n.remove());
  for (const { props } of head.elements.filter(
    (e) => e.props.property === "og:locale:alternate",
  )) {
    const m = document.createElement("meta");
    for (const [k, v] of Object.entries(props)) m.setAttribute(k, v);
    document.head.appendChild(m);
  }
}
