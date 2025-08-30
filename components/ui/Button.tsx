"use client";
import Link from "next/link";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children: React.ReactNode;
};

export default function Button({ href, children, className = "", ...rest }: Props) {
  const base =
    "inline-flex items-center rounded-lg border border-[#1f2937] bg-[#0b1220] px-4 py-2 text-sm hover:bg-[#111827] disabled:opacity-60 disabled:cursor-not-allowed";
  if (href) {
    return (
      <Link href={href} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <button className={`${base} ${className}`} {...rest}>
      {children}
    </button>
  );
}
