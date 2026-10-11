import { useEffect, useState } from "preact/hooks";

type Theme = "light" | "dark";

function save(value: Theme) {
  try {
    localStorage.setItem("theme", value);
  } catch {}
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    globalThis.document?.documentElement?.dataset?.theme === "dark"
      ? "dark"
      : "light",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    save(theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
  };
}
