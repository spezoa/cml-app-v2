'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ');
}

export type TileProps = {
  href?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
  className?: string;
  ctaLabel?: string;
};

const base =
  'group rounded-xl border border-gray-200 bg-white/70 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60';
const hover = 'transition hover:shadow-md hover:-translate-y-0.5';
const disabledCls = 'opacity-60 pointer-events-none';

const head = 'p-4 md:p-6 border-b border-gray-100 dark:border-gray-800';
const body = 'p-4 md:p-6';
const foot = 'p-4 md:p-6 border-t border-gray-100 dark:border-gray-800';
const titleCls = 'text-base font-semibold tracking-tight';
const descCls = 'text-sm text-gray-600 dark:text-gray-400';

function TileInner({
  title,
  description,
  icon,
  badge,
  ctaLabel,
  className,
  disabled,
  children,
  ...rest
}: Omit<TileProps, 'href'> & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(base, !disabled && hover, disabled && disabledCls, className)}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {(title || description || icon || badge) && (
        <div className={head}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {icon && <div className="text-xl shrink-0">{icon}</div>}
              <div className="min-w-0">
                {title && <h3 className={titleCls}>{title}</h3>}
                {description && <p className={descCls}>{description}</p>}
              </div>
            </div>
            {badge && <div className="shrink-0">{badge}</div>}
          </div>
        </div>
      )}

      {children && <div className={body}>{children}</div>}

      {(ctaLabel) && (
        <div className={foot}>
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>{ctaLabel}</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </div>
        </div>
      )}
    </div>
  );
}

/** Tile clickable (si `href`) o bloque simple si no */
export default function Tile(props: TileProps) {
  const { href, disabled, ctaLabel = 'Abrir', ...rest } = props;

  if (href && !disabled) {
    return (
      <Link href={href} className="no-underline">
        <TileInner {...rest} ctaLabel={ctaLabel} />
      </Link>
    );
  }

  return <TileInner {...rest} />;
}
