import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Shell from "@/components/Shell";

export const metadata: Metadata = {
  title: "Taller de Bomberos",
  description: "Gestión integral del taller",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body className="bg-[#0f172a] text-[#e5e7eb]">
        <Shell sessionEmail={session?.user?.email ?? null}>
          {children}
        </Shell>
      </body>
    </html>
  );
}

import AppProviders from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
