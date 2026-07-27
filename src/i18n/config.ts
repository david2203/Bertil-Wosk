// Locale configuration — the single switch for adding languages.
//
// Swedish-only at launch. To enable English:
//   1. add "en" to `locales`
//   2. create src/i18n/dictionaries/en.json
//   3. fill English fields in Sanity (see AGENTS.md §6)
// The LanguageToggle and /en routes activate automatically.

export const locales = ["sv"] as const;
export const defaultLocale: Locale = "sv";

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
