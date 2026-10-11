import { education } from "../config/portfolio";
import type { Copy } from "../copy";
import type { Lang } from "../i18n/types";
import { formatMonth } from "../lib/date";
import { Reveal } from "./Reveal";

export function Education({ lang, s }: { lang: Lang; s: Copy }) {
  return (
    <section
      id="education"
      className="education-section wrap"
      aria-labelledby="education-title"
    >
      <Reveal className="education-grid">
        <h2 id="education-title">{s.education}</h2>
        <ol>
          {education.map((item) => (
            <li className="education" key={item.id}>
              <span>
                <time dateTime={item.start}>
                  {formatMonth(item.start, lang)}
                </time>{" "}
                —{" "}
                {item.end ? (
                  <time dateTime={item.end}>{formatMonth(item.end, lang)}</time>
                ) : (
                  s.now
                )}
              </span>
              <h3>{item.org}</h3>
              <p>
                {item.title[lang]}
                {item.note && ` · ${item.note[lang]}`}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
