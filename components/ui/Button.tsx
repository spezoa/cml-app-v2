// components/ui/button.tsx
import * as React from "react";

function cn(...cls: Array<string | false | undefined | null>) {
  return cls.filter(Boolean).join(" ");
}

type Variant = "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
type Size = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  "inline-flex items-center justify-center rounded-xl font-medium transition-colors select-none";
const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
  icon: "h-10 w-10",
};
const variants: Record<Variant, string> = {
  default:
    "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100",
  secondary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
  outline:
    "border border-zinc-300 hover:bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:text-zinc-100",
  ghost:
    "text-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800",
  destructive:
    "bg-red-600 text-white hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-500",
  link:
    "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100 p-0 h-auto",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
