'use client';
import { useTheme } from 'next-themes';
import * as React from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const current = theme === 'system' ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
      className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800"
      aria-label="Cambiar tema"
      title="Cambiar tema"
    >
      <span className="hidden sm:inline">{current === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
      <span aria-hidden>{current === 'dark' ? '🌞' : '🌙'}</span>
    </button>
  );
}