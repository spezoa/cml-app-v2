import * as React from 'react';
import Link from 'next/link';
import SignInOut from '@/components/SignInOut';

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
      {/* Topbar */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur">
        <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-semibold">
              Taller Bomberos
            </Link>
            <Link href="/tickets" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
              Tickets
            </Link>
            <Link href="/admin" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
              Admin
            </Link>
          </div>
          <SignInOut />
        </nav>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {(title || description || actions) && (
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="min-w-0">
              {title && <h1 className="truncate text-2xl font-semibold tracking-tight">{title}</h1>}
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
