import { cn } from "@/lib/cn";

export function SectionHeading({
  title,
  intro,
  align = "left",
  className,
}: {
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "text-center mx-auto max-w-2xl" : "",
        className
      )}
    >
      <h2 className="text-2xl md:text-3xl">{title}</h2>
      {intro ? <p className="mt-2 text-muted">{intro}</p> : null}
    </div>
  );
}
