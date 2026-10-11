import { useEffect, useState } from "preact/hooks";
import { profile } from "../config/portfolio";
import type { Copy } from "../copy";
import { LANGS, type Lang } from "../i18n/types";
import { Icon } from "./Icon";

type HeaderProps = {
  s: Copy;
  lang: Lang;
  onLanguage: (lang: Lang) => void;
  onToggleTheme: () => void;
  active: string;
};

export function Header({
  s,
  lang,
  onLanguage,
  onToggleTheme,
  active,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const links = [
    ["projects", s.projects],
    ["about", s.about],
    ["experience", s.experience],
    ["contact", s.contact],
  ];

  return (
    <header className="header">
      <div className="wrap header-inner">
        <a className="wordmark" href="#top" aria-label={profile.nameLines[0]}>
          diego<span>.</span>
        </a>

        <nav
          id="navigation"
          className={`navigation ${menuOpen ? "is-open" : ""}`}
          aria-label={s.menu}
        >
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="header-tools">
          <label className="language">
            <span className="sr-only">{s.language}</span>
            <select
              value={lang}
              onChange={(event) =>
                onLanguage(event.currentTarget.value as Lang)
              }
            >
              {LANGS.map((code) => (
                <option key={code} value={code}>
                  {code.toUpperCase()}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="icon-button"
            aria-label={s.theme}
            onClick={onToggleTheme}
          >
            <span className="theme-icon theme-icon-sun">
              <Icon name="sun" size={20} />
            </span>
            <span className="theme-icon theme-icon-moon">
              <Icon name="moon" size={20} />
            </span>
          </button>

          <button
            type="button"
            className={`icon-button menu-button ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? s.close : s.menu}
            aria-expanded={menuOpen}
            aria-controls="navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
