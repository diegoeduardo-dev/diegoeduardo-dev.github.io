import { links } from "../config/portfolio";
import type { Copy } from "../copy";
import { ArrowLink } from "./ArrowLink";
import { Reveal } from "./Reveal";

export function About({ s }: { s: Copy }) {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <h2 id="about-title" className="multiline">
          {s.aboutTitle}
        </h2>
        <Reveal className="about-copy">
          <p className="lead">{s.aboutText}</p>
          <p>{s.aboutText2}</p>
          <p>{s.aboutText3}</p>
          <div className="about-links">
            <ArrowLink href={links.linkedin}>LinkedIn</ArrowLink>
            <ArrowLink href={links.github}>GitHub</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
