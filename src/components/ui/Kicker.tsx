import { cn } from "@/lib/cn";

// Small uppercase gold label used above headings.
export function Kicker({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-[0.18em] text-gold",
        className
      )}
    >
      {children}
    </p>
  );
}
