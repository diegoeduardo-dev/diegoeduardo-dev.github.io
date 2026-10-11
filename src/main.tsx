import { hydrate, render } from "preact";
import "./styles/global.css";
import { App } from "./App";
import type { Lang } from "./i18n/types";
import { redirectToPreferredLanguage } from "./lib/browserLanguage";
import { buildHead, langFromPath } from "./seo";

const Root = ({ lang }: { lang?: Lang }) => <App initialLang={lang} />;

if (typeof window !== "undefined" && !redirectToPreferredLanguage()) {
  const root = document.getElementById("root")!;
  (root.hasChildNodes() ? hydrate : render)(<Root />, root);
}

export async function prerender(data: { url: string }) {
  const { renderToString } = await import("preact-render-to-string");
  const lang = langFromPath(data.url);
  const head = buildHead(lang);
  return {
    html: renderToString(<Root lang={lang} />),
    head: {
      lang: head.htmlLang,
      title: head.title,
      elements: new Set(head.elements),
    },
  };
}
