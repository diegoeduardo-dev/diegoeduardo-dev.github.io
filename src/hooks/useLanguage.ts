import { useEffect, useState } from "preact/hooks";
import type { Lang } from "../i18n/types";
import { saveLang } from "../lib/browserLanguage";
import { applyHead, langFromPath, pathFor } from "../seo";

export function useLanguage(initial?: Lang) {
  const [lang, setLangState] = useState<Lang>(
    () => initial ?? langFromPath(location.pathname),
  );

  useEffect(() => {
    applyHead(lang);
  }, [lang]);

  useEffect(() => {
    const onPopState = () => setLangState(langFromPath(location.pathname));
    addEventListener("popstate", onPopState);
    return () => removeEventListener("popstate", onPopState);
  }, []);

  function setLang(next: Lang) {
    if (next === lang) return;
    saveLang(next);
    history.pushState(null, "", pathFor(next));
    setLangState(next);
  }

  return [lang, setLang] as const;
}
