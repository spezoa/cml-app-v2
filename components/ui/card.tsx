'use client';
import * as React from 'react';
import Link from 'next/link';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

type BaseDivProps = React.HTMLAttributes<HTMLDivElement>;

type ExtraProps = {
  /** Título opcional para header uniforme */
  title?: string;
  /** Descripción opcional bajo el título */
  description?: string;
  /** CTAs: si hay href, se muestra botón simple */
  href?: string;
  ctaLabel?: string;
  disabled?: boolean;
};

const base =
  'rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden';
const headerCls = 'px-5 pt-5';
const titleCls = 'text-base font-semibold tracking-tight';
const descCls = 'mt-1 text-sm text-gray-600 dark:text-gray-400';
const contentCls = 'px-5 pb-5';
const footerCls = 'px-5 pb-5 flex items-center justify-end gap-3';

export function Card(props: BaseDivProps & ExtraProps) {
  const { className, children, title, description, href, ctaLabel = 'Abrir', disabled, ...rest } = props;
  const Inner = (
    <div className={cn(base, className)} {...rest}>
      {(title || description) && (
        <div className={headerCls}>
          {title && <h3 className={titleCls}>{title}</h3>}
          {description && <p className={descCls}>{description}</p>}
        </div>
      )}
      <div className={contentCls}>{children}</div>
      {href && (
        <div className={footerCls}>
          <Link
            className={cn(
              'inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium',
              disabled
                ? 'pointer-events-none opacity-50'
                : 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white'
            )}
            href={disabled ? '#' : href}
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </div>
  );
  return Inner;
}

export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return <div className={cn(headerCls, className)} {...rest} />;
}
export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const { className, ...rest } = props;
  return <h3 className={cn(titleCls, className)} {...rest} />;
}
export function CardDescription(props: React.HTMLAttributes<HTMLParagraphElement>) {
  const { className, ...rest } = props;
  return <p className={cn(descCls, className)} {...rest} />;
}
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return <div className={cn(contentCls, className)} {...rest} />;
}
export function CardFooter(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return <div className={cn(footerCls, className)} {...rest} />;
}
export default Card;
