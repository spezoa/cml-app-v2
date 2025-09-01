'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = theme === 'system' ? (systemTheme ?? 'dark') : (theme ?? 'dark');
  const next = current === 'dark' ? 'light' : 'dark';

  return (
    <button
      aria-label="Cambiar tema"
      className="inline-flex items-center rounded-xl px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
      onClick={() => setTheme(next)}
      title={current === 'dark' ? 'Cambiar a claro' : 'Cambiar a oscuro'}
    >
      {current === 'dark' ? '🌙 Oscuro' : '☀️ Claro'}
    </button>
  );
}