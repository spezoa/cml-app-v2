import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Taller',
  description: 'Gestión de tickets',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-neutral-950 dark:text-gray-100 antialiased">
        <Providers>
          {/* Navbar global, único */}
          <Navbar />
          <main className="container py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}