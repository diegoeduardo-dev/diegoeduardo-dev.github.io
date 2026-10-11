import { cv, profile } from "../config/portfolio";
import type { Copy } from "../copy";
import type { Lang } from "../i18n/types";
import { Icon } from "./Icon";
import { SkillsTicker } from "./SkillsTicker";

export function Hero({ s, lang }: { s: Copy; lang: Lang }) {
  const name = profile.nameLines[0];

  return (
    <section id="top" className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">
          <span className="sr-only">{profile.name}: </span>
          <span>{s.first}</span>{" "}
          <span className="hero-emphasis">{s.second}</span>
        </h1>
        <p className="hero-description">{s.introduction}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            {s.view}
            <Icon name="arrow-down" size={20} />
          </a>
          <a
            className="button button-secondary"
            href={cv[lang]}
            download
            title={s.cvNote}
          >
            {s.cv}
            <Icon name="download-simple" size={19} />
          </a>
        </div>
      </div>

      <div className="portrait-composition">
        <span className="portrait-outline" aria-hidden="true" />
        <div className="portrait-motion">
          <figure className="portrait">
            <img
              src={profile.photo}
              width={384}
              height={384}
              alt={name}
              fetchpriority="high"
            />
            <figcaption>
              <strong>{name}</strong>
              <span>{s.location}</span>
            </figcaption>
          </figure>
          <div className="portrait-note" aria-hidden="true">
            <span>&lt;/&gt;</span>Spring Boot & Angular
            <br />
            <small>{s.developer}</small>
          </div>
        </div>
      </div>

      <SkillsTicker s={s} />
    </section>
  );
}
