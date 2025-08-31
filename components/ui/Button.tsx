"use client";
import * as React from "react";

type Variant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link";

const base =
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none h-9 px-4 py-2 ring-offset-neutral-950";

const variants: Record<Variant, string> = {
  default: "bg-white text-black hover:bg-white/90",
  secondary: "bg-neutral-800 text-neutral-100 hover:bg-neutral-700",
  destructive: "bg-red-600 text-white hover:bg-red-500",
  outline: "border border-neutral-700 hover:bg-neutral-900/40",
  ghost: "hover:bg-neutral-800",
  link: "underline-offset-4 hover:underline",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({
  className = "",
  variant = "default",
  ...props
}: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
