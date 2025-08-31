import type { Metadata } from "next";
import AppProviders from "./providers";
import Shell from "@/components/Shell";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Taller de Bomberos",
  description: "Gestión integral del taller",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Si no necesitas el email en Shell, puedes borrar todo lo de getServerSession
  const session = await getServerSession(authOptions);

  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-[#0f172a] text-[#e5e7eb]">
        <AppProviders>
          <Shell sessionEmail={session?.user?.email ?? null}>
            {children}
          </Shell>
        </AppProviders>
      </body>
    </html>
  );
}
