'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/site';
import SignInOut from '@/components/SignInOut';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect } from 'react';

function cx(...c: Array<string | false | null | undefined>) { return c.filter(Boolean).join(' '); }

export default function Navbar() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]); // close on route change
  return (
    <header className="border-b border-gray-200 bg-white/70 dark:border-gray-800 dark:bg-gray-950/70 backdrop-blur sticky top-0 z-40">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        {/* Left: Brand + Desktop Nav */}
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold text-gray-900 dark:text-gray-100">Taller Bomberos</Link>
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    'text-sm px-2 py-1 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                    active
                      ? 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: theme + auth (desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <SignInOut />
        </div>

        {/* Mobile: burger */}
        <button
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 dark:border-gray-700"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Navegación</span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <SignInOut />
              </div>
            </div>
            <div className="flex flex-col">
              {NAV_ITEMS.map(item => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cx(
                      'px-2 py-2 rounded-md text-sm',
                      active
                        ? 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}