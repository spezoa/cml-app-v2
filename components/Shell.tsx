// components/layout/Shell.tsx
import * as React from 'react';
import Link from 'next/link';

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ');
}

export type ShellProps = {
  children: React.ReactNode;
  /** Título opcional a mostrar arriba */
  title?: string;
  /** Descripción opcional bajo el título */
  description?: string;
  /** Acciones a la derecha del título (botones, etc.) */
  actions?: React.ReactNode;
  className?: string;
};

export default function Shell({
  children,
  title,
  description,
  actions,
  className,
}: ShellProps) {
  return (
    <div className={cn('mx-auto w-full max-w-5xl px-4 py-6 md:py-8', className)}>
      {(title || description || actions) && (
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {title && (
              <h1 className="truncate text-2xl font-semibold tracking-tight">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}

      {children}
    </div>
  );
}
