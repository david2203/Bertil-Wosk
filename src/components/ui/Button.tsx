import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center rounded font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-base",
  sm: "h-10 px-4 text-sm",
};

const variants: Record<Variant, string> = {
  primary: "bg-petrol text-white hover:bg-petrol-700 focus-visible:outline-petrol",
  outline: "border border-line text-ink hover:bg-soft focus-visible:outline-petrol",
  ghost: "text-petrol hover:underline focus-visible:outline-petrol",
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(base, sizes[size], variants[variant], className);
}

// Link button (navigates).
export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={classes(variant, size, className)}>
      {children}
    </Link>
  );
}

// Action button (onClick / submit).
export function ButtonAction({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
