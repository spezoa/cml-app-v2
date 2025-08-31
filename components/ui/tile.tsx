"use client";

import * as React from "react";
import Link from "next/link";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type TileProps = {
  title: string;
  description?: string;
  href?: string;          // opcional: si falta o disabled=true, se renderiza como <div>
  icon?: React.ReactNode;
  disabled?: boolean;     // <-- NUEVO
  className?: string;
};

export default function Tile({
  title,
  description,
  href,
  icon,
  disabled,
  className,
}: TileProps) {
  const base =
    "rounded-2xl border bg-card shadow-sm p-5 transition relative";
  const interactive =
    "hover:shadow-md hover:border-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring";
  const disabledCls = "opacity-55 cursor-not-allowed pointer-events-none";

  const content = (
    <div className="flex items-start gap-4">
      {icon ? <div className="text-muted-foreground mt-1">{icon}</div> : null}
      <div className="space-y-1">
        <h3 className="text-base font-medium leading-none">{title}</h3>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  );

  if (disabled || !href) {
    return (
      <div
        className={cx(base, disabled ? disabledCls : "", className)}
        aria-disabled={disabled ? true : undefined}
        role="link"
      >
        {content}
      </div>
    );
  }

  return (
    <Link href={href} className={cx(base, interactive, className)}>
      {content}
    </Link>
  );
}
