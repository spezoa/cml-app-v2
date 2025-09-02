'use client';
import * as React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components';

type Ticket = {
  id: string;
  code: string;
  title: string;
  priority: 'P1'|'P2'|'P3'|'P4';
  status: string;
  openedAt: string;
  deletedAt?: string | null;
};

function PriorityBadge({ p }: { p: Ticket['priority'] }) {
  const label = { P1: 'Crítica', P2: 'Alta', P3: 'Media', P4: 'Baja' }[p] ?? p;
  return <Badge className="rounded-lg">{label}</Badge>;
}

export default function TicketsList() {
  const [includeDeleted, setIncludeDeleted] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [items, setItems] = React.useState<Ticket[]>([]);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `/api/tickets${includeDeleted ? '?includeDeleted=1' : ''}`;
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('No se pudo cargar el listado');
      const data = await res.json();
      setItems(data);
    } catch (e: any) {
      setError(e.message || 'Error');
    } finally {
      setLoading(false);
    }
  }, [includeDeleted]);

  React.useEffect(() => { load(); }, [load]);

  const exportUrl = `/api/tickets/export${includeDeleted ? '?includeDeleted=1' : ''}`;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>Tickets</CardTitle>
          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={includeDeleted}
                onChange={(e) => setIncludeDeleted(e.target.checked)}
                aria-label="Mostrar tickets eliminados"
              />
              Mostrar eliminados
            </label>
            <a
              href={exportUrl}
              className="inline-flex items-center rounded-xl px-3 py-1.5 text-sm bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Exportar CSV
            </a>
            <Link
              href="/tickets/new"
              className="inline-flex items-center rounded-xl px-3 py-1.5 text-sm bg-gray-800 text-gray-100 hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Nuevo ticket
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading && <div className="text-muted-foreground">Cargando…</div>}
        {error && <div className="text-destructive">{error}</div>}
        {!loading && !error && !items.length && (
          <div className="text-muted-foreground">Sin tickets aún.</div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="flow-root">
            <ul role="list" className="divide-y divide-border rounded-xl border">
              {items.map((t) => (
                <li key={t.id} className="p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Link href={`/tickets/${t.id}`} className="font-medium hover:underline">
                          {t.code}
                        </Link>
                        <PriorityBadge p={t.priority} />
                        {t.deletedAt ? (
                          <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                            eliminado
                          </span>
                        ) : null}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{t.title}</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>{t.status}</div>
                      <div>{new Date(t.openedAt).toLocaleString()}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}