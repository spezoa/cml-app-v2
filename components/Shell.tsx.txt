"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sessionEmail?: string | null;
};

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/tickets", label: "Tickets" },
  { href: "/tickets/new", label: "Nuevo ticket" },
  { href: "/admin", label: "Admin" },
];

export default function Shell({ children, sessionEmail }: Props) {
  const pathname = usePathname();

  return (
    <div className="h-screen grid grid-cols-[280px_1fr] bg-[#0f172a] text-[#e5e7eb]">
      {/* Sidebar */}
      <aside className="h-full bg-[#111827] border-r border-[#1f2937] flex flex-col">
        <div className="p-4">
          <Link href="/" className="text-lg font-semibold">🚒 Taller</Link>
          <div className="text-xs text-slate-400">UI unificada</div>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          {NAV.map(item => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "flex items-center gap-3 px-3 py-2 rounded-lg " +
                  (active
                    ? "bg-[#0b1220] border border-[#1f2937]"
                    : "hover:bg-[#0b1220]")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#1f2937] text-sm">
          {sessionEmail ? (
            <div className="flex items-center justify-between gap-2">
              <div className="truncate">{sessionEmail}</div>
              <form action="/api/auth/signout" method="post">
                <button className="inline-flex items-center rounded-lg border border-[#1f2937] bg-[#0b1220] px-3 py-2 text-xs hover:bg-[#111827]">
                  Salir
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/api/auth/signin"
              className="inline-flex items-center justify-center rounded-lg border border-[#1f2937] bg-[#0b1220] px-3 py-2 text-sm hover:bg-[#111827]"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 border-b border-[#1f2937] bg-[#0f172a]/70 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <div className="text-sm text-slate-400">Gestión de taller</div>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      </div>
    </div>
  );
}
