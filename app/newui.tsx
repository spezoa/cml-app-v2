import { ReactNode } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = { title: "Taller (Nueva UI)" };

export default async function NewUILayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  const nav = [
    { href: "/newui", label: "Inicio" },
    { href: "/newui/tickets", label: "Tickets" },
    { href: "/newui/tickets/new", label: "Nuevo ticket" },
    { href: "/admin", label: "Admin" },
  ];
  return (
    <html lang="es">
      <body className="h-screen grid grid-cols-[280px_1fr] bg-[#0f172a] text-[#e5e7eb]">
        {/* Sidebar */}
        <aside className="h-full bg-[#111827] border-r border-[#1f2937] flex flex-col">
          <div className="p-4">
            <Link href="/newui" className="text-lg font-semibold">🚒 Taller · Nueva UI</Link>
          </div>
          <nav className="flex-1 px-2 space-y-1">
            {nav.map(it => (
              <Link key={it.href} href={it.href} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#0b1220]">
                {it.label}
              </Link>
            ))}
          </nav>
          <div className="p-3 border-t border-[#1f2937] text-sm">
            {session?.user?.email ? (
              <div className="flex items-center justify-between gap-2">
                <div className="truncate">{session.user.email}</div>
                <form action="/api/auth/signout" method="post">
                  <button className="inline-flex items-center rounded-lg border border-[#1f2937] bg-[#0b1220] px-3 py-2 text-xs hover:bg-[#111827]">Salir</button>
                </form>
              </div>
            ) : (
              <Link className="inline-flex items-center justify-center rounded-lg border border-[#1f2937] bg-[#0b1220] px-3 py-2 text-sm hover:bg-[#111827]" href="/api/auth/signin">Iniciar sesión</Link>
            )}
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 border-b border-[#1f2937] bg-[#0f172a]/70 backdrop-blur">
            <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
              <div className="text-sm text-slate-400">Gestión de taller — Nueva UI</div>
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
