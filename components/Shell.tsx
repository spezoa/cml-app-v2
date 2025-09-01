import * as React from 'react';

export type ShellProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
};

export default function Shell({ children, title, description, actions }: ShellProps) {
  return (
    <div>
      {(title || description || actions) && (
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {title && <h1 className="truncate text-2xl font-semibold tracking-tight text-white">{title}</h1>}
            {description && <p className="mt-1 text-sm text-gray-300">{description}</p>}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}