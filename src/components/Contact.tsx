import { useEffect, useRef, useState } from "preact/hooks";
import { links } from "../config/portfolio";
import type { Copy } from "../copy";
import { ContactForm } from "./ContactForm";
import { Icon } from "./Icon";

type CopyState = "idle" | "copied" | "error";

export function Contact({ s }: { s: Copy }) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  async function copyEmail() {
    clearTimeout(timeout.current);
    try {
      await navigator.clipboard.writeText(links.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    timeout.current = setTimeout(() => setCopyState("idle"), 3500);
  }

  const copied = copyState === "copied";
  const status = copyState === "error" ? s.copyError : copied ? s.copied : "";

  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="wrap contact-grid">
        <div className="contact-intro">
          <h2 id="contact-title" className="multiline">
            {s.talk}
          </h2>
          <p>{s.talkText}</p>
          <address className="contact-copy">
            <div className="contact-direct">
              <a className="contact-address" href={`mailto:${links.email}`}>
                {links.email}
                <Icon name="arrow-up-right" size={23} />
              </a>
              <button
                type="button"
                className="button button-secondary"
                onClick={copyEmail}
              >
                <Icon name={copied ? "check" : "copy"} size={18} />
                {copied ? s.copied : s.copyEmail}
              </button>
            </div>
            <p className="copy-status" role="status">
              {status}
            </p>
            <div className="contact-socials">
              <a
                className="button project-button social-button social-button-github"
                href={links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="github-logo" size={20} />
                GitHub
              </a>
              <a
                className="button project-button social-button social-button-linkedin"
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="linkedin-logo" size={20} />
                LinkedIn
              </a>
              <a
                className="button project-button social-button social-button-email"
                href={`mailto:${links.email}`}
              >
                <Icon name="envelope-simple" size={20} />
                {s.formOpen}
              </a>
            </div>
          </address>
        </div>
        <ContactForm s={s} />
      </div>
    </section>
  );
}
