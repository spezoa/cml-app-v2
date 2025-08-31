import { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export function Badge({ className = "", ...props }: BadgeProps) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs " +
        "border-zinc-700 bg-zinc-900/50 text-zinc-200 " +
        "dark:border-zinc-700 dark:bg-zinc-900/60 " +
        className
      }
      {...props}
    />
  );
}
