import { useState } from "preact/hooks";
import { links } from "../config/portfolio";
import type { Copy } from "../copy";
import { Icon } from "./Icon";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ s }: { s: Copy }) {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    setStatus("sending");
    try {
      const response = await fetch(links.contactForm, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const message =
    status === "sent" ? s.formSent : status === "error" ? s.formError : "";

  return (
    <form className="contact-form" aria-label={s.formTitle} onSubmit={submit}>
      <div className="contact-form-row">
        <label>
          {s.formName}
          <input
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            required
          />
        </label>
        <label>
          {s.formEmail}
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={150}
            required
          />
        </label>
      </div>
      <label>
        {s.formMessage}
        <textarea name="message" rows={4} maxLength={2000} required />
      </label>
      <input type="hidden" name="_subject" value="Contato pelo portfólio" />
      <div className="sr-only" aria-hidden="true">
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="contact-form-actions">
        <button
          type="submit"
          className="button button-primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? s.formSending : s.formSend}
          <Icon name="arrow-up-right" size={19} />
        </button>
        <p className="contact-form-status" role="status">
          {message}
        </p>
      </div>
    </form>
  );
}
