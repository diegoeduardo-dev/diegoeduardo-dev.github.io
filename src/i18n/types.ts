export const LANGS = ["pt", "en", "es"] as const;
export type Lang = (typeof LANGS)[number];

export type Localized = Record<Lang, string>;
export type LocalizedList = Record<Lang, string[]>;
