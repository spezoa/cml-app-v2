'use client';

import * as React from 'react';
import Link from 'next/link';

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ');
}

type BaseDivProps = React.HTMLAttributes<HTMLDivElement>;

type ExtraProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  ctaLabel?: string;
  disabled?: boolean;
};

const baseCard =
  'rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 shadow-sm overflow-hidden';
const hover =
  'transition-colors hover:bg-gray-50 dark:hover:bg-neutral-800';
const headerCls = 'px-5 sm:px-6 pt-5 sm:pt-6';
const bodyCls = 'px-5 sm:px-6 pb-5 sm:pb-6';
const footerCls = 'px-5 sm:px-6 py-3 border-t border-gray-200 dark:border-neutral-800 text-sm';

export function CardHeader({ className, ...rest }: BaseDivProps) {
  return <div className={cn(headerCls, className)} {...rest} />;
}
export function CardContent({ className, ...rest }: BaseDivProps) {
  return <div className={cn(bodyCls, className)} {...rest} />;
}
export function CardFooter({ className, ...rest }: BaseDivProps) {
  return <div className={cn(footerCls, className)} {...rest} />;
}
export function CardTitle({ className, ...rest }: BaseDivProps) {
  return <h3 className={cn('text-base font-semibold', className)} {...rest} />;
}
export function CardDescription({ className, ...rest }: BaseDivProps) {
  return <p className={cn('text-sm text-gray-600 dark:text-gray-400', className)} {...rest} />;
}

/** Card contenedor que también puede actuar como tile de navegación */
export function Card({
  className,
  title,
  description,
  icon,
  href,
  ctaLabel,
  disabled,
  children,
  ...rest
}: BaseDivProps & ExtraProps) {
  const content = (
    <div
      className={cn(baseCard, !disabled && hover, disabled && 'opacity-60 pointer-events-none', className)}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {(title || description || icon) ? (
        <CardHeader>
          <div className="flex items-center gap-3">
            {icon ? <div className="text-xl">{icon}</div> : null}
            <div className="min-w-0">
              {title ? <CardTitle className="truncate">{title}</CardTitle> : null}
              {description ? <CardDescription className="line-clamp-2">{description}</CardDescription> : null}
            </div>
          </div>
        </CardHeader>
      ) : null}

      {children ? <CardContent>{children}</CardContent> : null}

      {(href || ctaLabel) ? (
        <CardFooter className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">{ctaLabel || 'Abrir'}</span>
          <span aria-hidden>→</span>
        </CardFooter>
      ) : null}
    </div>
  );

  return href && !disabled ? (
    <Link
      href={href}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
    >
      {content}
    </Link>
  ) : (
    content
  );
}