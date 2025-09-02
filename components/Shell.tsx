import * as React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import SignInOut from './SignInOut';

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ');
}

export type ShellProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
};

export default function Shell({ children, title, description, actions }: ShellProps) {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-gray-200/80 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-neutral-900/50">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-semibold">
              Taller
            </Link>
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <Link href="/tickets" className="hover:underline">Tickets</Link>
              <Link href="/tickets/new" className="hover:underline">Nuevo</Link>
              <Link href="/admin" className="hover:underline">Admin</Link>
              <span className="text-gray-400 dark:text-gray-500">Reportes</span>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SignInOut />
          </div>
        </div>
      </header>

      {/* Page container */}
      <main className="container py-8">
        {(title || description || actions) && (
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              {title && <h1 className="text-xl font-semibold">{title}</h1>}
              {description && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>}
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}