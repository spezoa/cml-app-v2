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
    <html lang="es" suppressHydrationWarning>
      <body>
        <AppProviders>
          <Shell>{children}</Shell>
        </AppProviders>
      </body>
    </html>
  );
}
