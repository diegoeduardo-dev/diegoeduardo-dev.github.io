import type { ComponentChildren } from "preact";
import { Icon } from "./Icon";

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ComponentChildren;
  className?: string;
}) {
  return (
    <a
      className={`arrow-link ${className}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
      <Icon name="arrow-up-right" size={20} />
    </a>
  );
}
