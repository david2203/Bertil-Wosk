import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "surface" | "soft" | "petrol";

const toneClasses: Record<Tone, string> = {
  surface: "bg-surface text-ink",
  soft: "bg-soft text-ink",
  petrol: "bg-petrol text-white",
};

export function Section({
  tone = "surface",
  className,
  children,
  ...rest
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn(toneClasses[tone], "py-16 md:py-20", className)} {...rest}>
      <Container>{children}</Container>
    </section>
  );
}
