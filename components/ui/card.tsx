'use client';

import * as React from 'react';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-200 bg-white/70 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60',
        className
      )}
      {...rest}
    />
  );
}

export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn('p-4 md:p-6 border-b border-gray-100 dark:border-gray-800', className)}
      {...rest}
    />
  );
}

export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const { className, ...rest } = props;
  return <h3 className={cn('text-base font-semibold tracking-tight', className)} {...rest} />;
}

export function CardDescription(props: React.HTMLAttributes<HTMLParagraphElement>) {
  const { className, ...rest } = props;
  return <p className={cn('text-sm text-gray-600 dark:text-gray-400', className)} {...rest} />;
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return <div className={cn('p-4 md:p-6', className)} {...rest} />;
}

export function CardFooter(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn('p-4 md:p-6 border-t border-gray-100 dark:border-gray-800', className)}
      {...rest}
    />
  );
}
