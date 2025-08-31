// components/admin/tile.tsx
'use client';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type TileProps = {
  href: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
  className?: string;
};

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ');
}

export function Tile({
  href,
  title,
  description,
  icon,
  badge,
  disabled,
  className,
}: TileProps) {
  const Wrapper: any = disabled ? 'div' : Link;

  return (
    <Wrapper {...(!disabled ? { href } : {})} aria-disabled={disabled ? true : undefined} className={cn('block', className)}>
      <Card className={cn('group transition-all hover:shadow-md hover:-translate-y-0.5', disabled && 'opacity-60 pointer-events-none')}>
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {icon && <span className="text-xl">{icon}</span>}
              <CardTitle className="text-base">{title}</CardTitle>
            </div>
            {badge}
          </div>
          {description && <CardDescription className="line-clamp-2">{description}</CardDescription>}
        </CardHeader>
      </Card>
    </Wrapper>
  );
}
