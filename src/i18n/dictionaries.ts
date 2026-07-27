import type { Locale } from "./config";
import sv from "./dictionaries/sv.json";

export type Dictionary = typeof sv;

// Loaders are lazy so only the active locale ships to the client.
// Add `en: () => import("./dictionaries/en.json")` when enabling English.
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  sv: async () => sv,
};

export async function getDictionary(lang: Locale): Promise<Dictionary> {
  const load = dictionaries[lang] ?? dictionaries.sv;
  return load();
}
