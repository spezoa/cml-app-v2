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
      <body><script dangerouslySetInnerHTML={ { __html: `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var d = (t==='dark') || (!t || t==='system') && m;var e=document.documentElement;e.classList.toggle('dark', d);}catch(e){}})();` } } />>
        <AppProviders>
          <Shell>{children}</Shell>
        </AppProviders>
      </body>
    </html>
  );
}
