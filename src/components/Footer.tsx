import type { Copy } from "../copy";

export function Footer({ s }: { s: Copy }) {
  return (
    <footer className="footer wrap">
      <a className="wordmark" href="#top">
        diego<span>.</span>
      </a>
      <span>
        © {new Date().getFullYear()} · {s.footer}
      </span>
      <a className="back-top" href="#top">
        {s.top}
        <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
}
