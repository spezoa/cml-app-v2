"use client";

import Link from "next/link";
import { ReactNode } from "react";

type CardProps = {
  title: string;
  description?: string;
  href?: string;          // si viene, el botón “Abrir” navega
  disabled?: boolean;     // muestra mismo estilo, pero sin interacción
  icon?: ReactNode;
  children?: ReactNode;   // contenido extra (metadatos, etc.)
  ctaLabel?: string;      // texto del botón (default Abrir)
};

export default function Card({
  title,
  description,
  href,
  disabled,
  icon,
  children,
  ctaLabel = "Abrir",
}: CardProps) {
  return (
    <div
      className={[
        "rounded-3xl border bg-[#111827] border-[#1f2937] p-6",
        "min-h-[180px] flex flex-col justify-between",
        "transition-all",
        disabled
          ? "opacity-60"
          : "hover:bg-[#0b1220] hover:border-slate-600",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        {icon ? <div className="mt-1 text-slate-300">{icon}</div> : null}
        <div>
          <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
          {description ? (
            <p className="mt-1 text-slate-300">{description}</p>
          ) : null}
        </div>
      </div>

      {/* contenido libre (metadatos, listas, etc.) */}
      {children ? <div className="mt-3">{children}</div> : null}

      <div className="mt-4">
        {href ? (
          disabled ? (
            <button
              disabled
              className="inline-flex items-center rounded-lg border border-[#1f2937] bg-[#0b1220] px-4 py-2 text-sm opacity-70 cursor-not-allowed"
            >
              {ctaLabel}
            </button>
          ) : (
            <Link
              href={href}
              className="inline-flex items-center rounded-lg border border-[#1f2937] bg-[#0b1220] px-4 py-2 text-sm hover:bg-[#111827]"
            >
              {ctaLabel}
            </Link>
          )
        ) : (
          <button
            disabled
            className="inline-flex items-center rounded-lg border border-[#1f2937] bg-[#0b1220] px-4 py-2 text-sm opacity-70 cursor-not-allowed"
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
}
