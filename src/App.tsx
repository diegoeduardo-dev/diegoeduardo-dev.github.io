import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { copy } from "./copy";
import { useActiveSection } from "./hooks/useActiveSection";
import { useAnchorScroll } from "./hooks/useAnchorScroll";
import { useLanguage } from "./hooks/useLanguage";
import { useTheme } from "./hooks/useTheme";
import type { Lang } from "./i18n/types";

export function App({ initialLang }: { initialLang?: Lang }) {
  const [lang, setLang] = useLanguage(initialLang);
  const { toggleTheme } = useTheme();
  const active = useActiveSection();
  useAnchorScroll();

  const s = copy[lang];

  return (
    <>
      <a className="skip" href="#main">
        {s.skip}
      </a>
      <Header
        s={s}
        lang={lang}
        onLanguage={setLang}
        onToggleTheme={toggleTheme}
        active={active}
      />
      <main id="main">
        <Hero s={s} lang={lang} />
        <Projects lang={lang} s={s} />
        <About s={s} />
        <Experience lang={lang} s={s} />
        <Education lang={lang} s={s} />
        <Skills lang={lang} s={s} />
        <Contact s={s} />
      </main>
      <Footer s={s} />
    </>
  );
}
