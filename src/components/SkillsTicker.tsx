import { useEffect, useRef, useState } from "preact/hooks";
import { skills } from "../config/portfolio";
import type { Copy } from "../copy";

const items = skills.flatMap((group) => group.items);

export function SkillsTicker({ s }: { s: Copy }) {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`skills-ticker ${paused || !visible ? "is-paused" : ""}`}
      ref={ref}
    >
      <div className="skills-ticker-view" aria-hidden="true">
        <div className="skills-ticker-rail">
          {[0, 1].map((copy) => (
            <ul className="skills-ticker-group" key={copy}>
              {items.map((item) => (
                <li key={item}>
                  {item}
                  <span>·</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="skills-ticker-pause"
        onClick={() => setPaused(!paused)}
        aria-pressed={paused}
      >
        {paused ? s.resumeTicker : s.pauseTicker}
      </button>
    </div>
  );
}
