import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Taller Bomberos",
  description: "Gestión de taller - Bomberos",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  const nav = [
    { href: "/", label: "Inicio" },
    { href: "/tickets", label: "Tickets" },
    { href: "/tickets/new", label: "Nuevo ticket" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <html lang="es">
      <body className="h-screen grid grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="h-full bg-panel border-r border-panel-border flex flex-col">
          <div className="p-4">
            <Link href="/" className="text-lg font-semibold">🚒 Taller</Link>
          </div>
          <nav className="flex-1 px-2 space-y-1">
            {nav.map(it => (
              <Link key={it.href} href={it.href} className="sidebar-link">{it.label}</Link>
            ))}
          </nav>
          <div className="p-3 border-t border-panel-border text-sm">
            {session?.user?.email ? (
              <div className="flex items-center justify-between gap-2">
                <div className="truncate">{session.user.email}</div>
                <form action="/api/auth/signout" method="post">
                  <button className="btn text-xs">Salir</button>
                </form>
              </div>
            ) : (
              <Link className="btn w-full" href="/api/auth/signin">Iniciar sesión</Link>
            )}
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-col">
          <header className="topbar">
            <div className="container-page py-3 flex items-center justify-between">
              <div className="text-sm text-slate-400">Gestión de taller</div>
            </div>
          </header>
          <main className="container-page py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
