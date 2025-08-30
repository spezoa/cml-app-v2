"use client";

import Link from "next/link";
import { ReactNode } from "react";

type CardProps = {
  title: string;
  description?: string;
  href?: string;          // si viene, muestra botón “Abrir” que navega
  disabled?: boolean;     // para dejar la tarjeta deshabilitada (igual estilo)
  icon?: ReactNode;
};

export default function Card({
  title,
  description,
  href,
  disabled,
  icon,
}: CardProps) {
  const Wrapper = href && !disabled ? Link : "div";

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
        {icon ? (
          <div className="mt-1 text-slate-300">{icon}</div>
        ) : null}
        <div>
          <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
          {description ? (
            <p className="mt-1 text-slate-300">{description}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-4">
        {href ? (
          // botón consistente
          <Wrapper
            href={href as any}
            className={[
              "inline-flex items-center rounded-lg",
              "border border-[#1f2937] bg-[#0b1220]",
              "px-4 py-2 text-sm",
              disabled ? "pointer-events-none opacity-70" : "hover:bg-[#111827]",
            ].join(" ")}
          >
            Abrir
          </Wrapper>
        ) : (
          <button
            disabled
            className="inline-flex items-center rounded-lg border border-[#1f2937] bg-[#0b1220] px-4 py-2 text-sm opacity-70 cursor-not-allowed"
          >
            Abrir
          </button>
        )}
      </div>
    </div>
  );
}
