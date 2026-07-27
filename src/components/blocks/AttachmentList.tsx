import type { Attachment } from "@/lib/types";

export function AttachmentList({
  attachments,
  downloadLabel,
}: {
  attachments?: Attachment[];
  downloadLabel: string;
}) {
  const items = (attachments ?? []).filter((a) => a.url);
  if (items.length === 0) return null;

  return (
    <ul className="mt-6 space-y-2">
      {items.map((a, i) => (
        <li key={i}>
          <a
            href={a.url}
            download
            className="inline-flex items-center gap-2 rounded border border-line bg-soft px-4 py-2 text-sm text-petrol hover:bg-sky"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M8 1v9m0 0L4.5 6.5M8 10l3.5-3.5M2 13h12"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            {a.label ?? downloadLabel}
          </a>
        </li>
      ))}
    </ul>
  );
}
