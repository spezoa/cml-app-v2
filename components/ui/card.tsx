'use client';

import * as React from 'react';
import Link from 'next/link';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

type BaseDivProps = React.HTMLAttributes<HTMLDivElement>;

type ExtraProps = {
  /** Título opcional que, si existe, renderiza un header uniforme */
  title?: string;
  /** Descripción opcional bajo el título */
  description?: string;
  /** Si existe y no está disabled, el Card se vuelve clickable con <Link> */
  href?: string;
  /** Texto del CTA en el footer (si se usa como tile) */
  ctaLabel?: string;
  /** Ícono opcional a la izquierda del título */
  icon?: React.ReactNode;
  /** Deshabilita interacción y link, muestra estilo atenuado */
  disabled?: boolean;
};

export type CardProps = BaseDivProps & ExtraProps;

const baseCard =
  'group rounded-2xl border border-gray-200 bg-white/70 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60';
const headerCls = 'p-4 md:p-6 border-b border-gray-100 dark:border-gray-800';
const contentCls = 'p-4 md:p-6';
const footerCls = 'p-4 md:p-6 border-t border-gray-100 dark:border-gray-800';
const titleCls = 'text-base font-semibold tracking-tight';
const descCls = 'text-sm text-gray-600 dark:text-gray-400';

export function Card(props: CardProps) {
  const {
    className,
    title,
    description,
    href,
    ctaLabel,
    icon,
    disabled,
    children,
    ...rest
  } = props;

  const isClickable = Boolean(href) && !disabled;

  const Inner = (
    <div
      className={cn(
        baseCard,
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      aria-disabled={disabled ? true : undefined}
      {...rest}
    >
      {(title || description || icon) && (
        <div className={headerCls}>
          <div className="flex items-center gap-3">
            {icon && <div className="text-xl">{icon}</div>}
            <div className="min-w-0">
              {title && <h3 className={titleCls}>{title}</h3>}
              {description && <p className={descCls}>{description}</p>}
            </div>
          </div>
        </div>
      )}

      {(children || (!title && !description)) && (
        <div className={contentCls}>{children}</div>
      )}

      {(ctaLabel || href) && (
        <div className={footerCls}>
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>{ctaLabel ?? (disabled ? 'No disponible' : 'Abrir')}</span>
            {!disabled && <span className="transition-transform group-hover:translate-x-0.5">→</span>}
          </div>
        </div>
      )}
    </div>
  );

  // Si es clickable, envolvemos en Link. Si está deshabilitado, NO hay Link.
  if (isClickable) {
    return (
      <Link href={href!} className="block no-underline">
        {Inner}
      </Link>
    );
  }

  return Inner;
}

// Primitivas por si las usas de forma manual
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
