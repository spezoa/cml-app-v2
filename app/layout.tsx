import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignInOut from "@/components/SignInOut";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="es">
      <body>
        <header className="bg-white border-b">
          <div className="container py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="font-bold">Taller Bomberos</Link>
              <nav className="flex gap-4 text-sm">
                <Link href="/tickets">Tickets</Link>
                <Link href="/admin">Admin</Link>
              </nav>
            </div>
            <SignInOut session={session} />
          </div>
        </header>
        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}
