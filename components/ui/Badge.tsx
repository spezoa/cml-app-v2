"use client";

export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-[#1f2937] bg-[#0b1220] px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}
