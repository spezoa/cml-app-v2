import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import AppProviders from './providers';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Taller Bomberos',
  description: 'CMMS',
};

const noflash = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var d=(t==='dark')||((!t||t==='system')&&m);document.documentElement.classList.toggle('dark', d);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased">
        <Script id="theme-noflash" strategy="beforeInteractive">{noflash}</Script>
        <AppProviders>
          <Navbar />
          <div className="container py-6">
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}