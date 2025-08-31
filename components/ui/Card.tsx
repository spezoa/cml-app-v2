// components/ui/card.tsx
import * as React from "react";

function cn(...cls: Array<string | false | undefined | null>) {
  return cls.filter(Boolean).join(" ");
}

export type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80",
        "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 shadow-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = ({ className, ...props }: DivProps) => (
  <div
    className={cn(
      "p-5 border-b border-zinc-100 dark:border-zinc-800",
      className
    )}
    {...props}
  />
);

export const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-lg font-semibold leading-none", className)} {...props} />
);

export const CardDescription = ({ className, ...props }: DivProps) => (
  <div className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)} {...props} />
);

export const CardContent = ({ className, ...props }: DivProps) => (
  <div className={cn("p-5", className)} {...props} />
);

export const CardFooter = ({ className, ...props }: DivProps) => (
  <div className={cn("p-5 pt-0", className)} {...props} />
);
