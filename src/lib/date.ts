import type { Locale } from "@/i18n/config";

const LOCALE_TAGS: Record<Locale, string> = {
  sv: "sv-SE",
};

/**
 * Formats a date as "27 Juni 2027".
 *
 * Swedish month names are lowercase by convention, so Intl returns
 * "27 juni 2027" — the month is capitalised here to match the design.
 */
export function formatDate(
  value: string | undefined,
  lang: Locale
): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const parts = new Intl.DateTimeFormat(LOCALE_TAGS[lang] ?? "sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);

  return parts
    .map((p) =>
      p.type === "month"
        ? p.value.charAt(0).toUpperCase() + p.value.slice(1)
        : p.value
    )
    .join("");
}
