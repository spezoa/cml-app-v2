'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/site';
import SignInOut from '@/components/SignInOut';
import ThemeToggle from '@/components/ThemeToggle';

function cx(...c: Array<string | false | null | undefined>) { return c.filter(Boolean).join(' '); }

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="border-b border-gray-200 bg-white/70 dark:border-gray-800 dark:bg-gray-950/70 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  'text-sm px-2 py-1 rounded-md transition-colors',
                  active ? 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-2"><ThemeToggle /><SignInOut /></div>
      </nav>
    </header>
  );
}