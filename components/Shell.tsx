import * as React from 'react';

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ');
}

export type ShellProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
};

/**
 * Shell: contenedor de página SIN navbar.
 * El navbar queda en app/layout.tsx para evitar duplicados.
 */
export default function Shell({ children, title, description, actions, className }: ShellProps) {
  return (
    <section className={cn('space-y-6', className)}>
      {(title || description || actions) && (
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && <h1 className="text-xl font-semibold">{title}</h1>}
            {description && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}