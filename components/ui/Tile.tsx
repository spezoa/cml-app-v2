'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

type TileProps = {
  title: string;
  description?: string;
  href?: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function Tile({
  title,
  description,
  href,
  disabled,
  children,
  className,
}: TileProps) {
  const inner = (
    <Card
      className={cn(
        'transition-all hover:shadow-md',
        disabled ? 'opacity-60 pointer-events-none' : 'cursor-pointer',
        className
      )}
      // atributo accesible correcto para “deshabilitado”
      aria-disabled={disabled ? true : undefined}
    >
      <CardHeader>
        <CardTitle className="text-base font-semibold tracking-tight">
          {title}
        </CardTitle>
        {description ? (
          <CardDescription>{description}</CardDescription>
        ) : null}
      </CardHeader>
      {children ? <CardContent>{children}</CardContent> : null}
    </Card>
  );

  // Si hay href y no está disabled, que sea un link clickeable
  if (href && !disabled) {
    return <Link href={href}>{inner}</Link>;
  }

  // En otro caso, un contenedor neutro (mantiene estilos)
  return <div>{inner}</div>;
}
