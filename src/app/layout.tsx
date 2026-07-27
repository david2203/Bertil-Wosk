import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bertilwosk.se"),
  title: {
    // 51 characters — fits before Google truncates (~60).
    default: "Bertil Wosk – om näring, hälsa och ett liv i balans",
    // Sub-pages get "Sidans titel · Bertil Wosk".
    template: "%s · Bertil Wosk",
  },
  // 150 characters — within the ~160 Google displays.
  description:
    "Att leva ett liv i hälsa är att leva ett liv i balans. Bertil Wosk, grundare av Holistic, delar föredrag, meditationer och texter om näring och hälsa.",
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: "Bertil Wosk",
    url: "https://www.bertilwosk.se",
    title: "Bertil Wosk – om näring, hälsa och ett liv i balans",
    description:
      "Att leva ett liv i hälsa är att leva ett liv i balans. Bertil Wosk, grundare av Holistic, delar föredrag, meditationer och texter om näring och hälsa.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

// NOTE: <html lang> is hardcoded to "sv" while the site is Swedish-only.
// When English is enabled, move <html>/<body> into app/[lang]/layout.tsx so
// `lang` reflects the active locale (see AGENTS.md §6).
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
