import { skills } from "../config/portfolio";
import type { Copy } from "../copy";
import type { Lang } from "../i18n/types";
import { Reveal } from "./Reveal";

export function Skills({ lang, s }: { lang: Lang; s: Copy }) {
  return (
    <section
      id="skills"
      className="stack-section wrap"
      aria-labelledby="skills-title"
    >
      <div className="section-heading">
        <h2 id="skills-title" className="multiline">
          {s.stackTitle}
        </h2>
        <p>{s.stackText}</p>
      </div>
      <Reveal className="stack-list">
        {skills.map((group) => (
          <div className="stack-row" key={group.title.en}>
            <h3>{group.title[lang]}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
