import { useEffect } from "preact/hooks";

const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useAnchorScroll() {
  useEffect(() => {
    const address = new URL(location.href);
    const initialSection = document.getElementById(address.hash.slice(1));
    address.searchParams.delete("lite");
    address.hash = "";
    if (address.href !== location.href) {
      history.replaceState(
        history.state,
        "",
        address.pathname + address.search,
      );
    }
    if (initialSection) initialSection.scrollIntoView({ behavior: "instant" });

    const onClick = (event: MouseEvent) => {
      const modified =
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      if (event.defaultPrevented || event.button !== 0 || modified) return;

      const link = (event.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const id = link?.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
      if (id === "main") {
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
