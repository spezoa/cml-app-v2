import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "./providers";
import Shell from "@/components/Shell";

export const metadata: Metadata = {
  title: "Taller Bomberos",
  description: "Gestión del taller",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <AppProviders children={undefined}>
          <Shell children={undefined}>{children}</Shell>
        </AppProviders>
      </body>
    </html>
  );
}
