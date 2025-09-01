'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState, useMemo } from 'react';

type Ticket = {
  id: string;
  code: string;
  title: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  status: string;
  openedAt: string;
  firstResponseAt?: string | null;
  resolvedAt?: string | null;
  slaResponseMinutes?: number | null;
  slaResolutionMinutes?: number | null;
};

export default function TicketsList() {
  const [status, setStatus] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [q, setQ] = useState<string>('');

  const qs = new URLSearchParams();
  if (status) qs.set('status', status);
  if (priority) qs.set('priority', priority);
  if (q) qs.set('q', q);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tickets', status, priority, q],
    queryFn: async () => {
      const res = await fetch(`/api/tickets?${qs.toString()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Error cargando tickets');
      return (await res.json()) as { tickets: Ticket[] };
    }
  });

  const rows = data?.tickets ?? [];

  function minsBetween(a?: string | null, b?: string | null) {
    if (!a || !b) return null;
    const ms = new Date(b).getTime() - new Date(a).getTime();
    return ms > 0 ? Math.round(ms / 60000) : 0;
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          className="h-9 px-3 rounded-md border border-gray-300 dark:border-gray-700 text-sm"
          placeholder="Buscar por título o código…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="h-9 px-3 rounded-md border border-gray-300 dark:border-gray-700 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Estado: todos</option>
          <option>NEW</option>
          <option>TRIAGED</option>
          <option>IN_PROGRESS</option>
          <option>ON_HOLD</option>
          <option>RESOLVED</option>
          <option>CLOSED</option>
        </select>
        <select
          className="h-9 px-3 rounded-md border border-gray-300 dark:border-gray-700 text-sm"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Prioridad: todas</option>
          <option>P1</option>
          <option>P2</option>
          <option>P3</option>
          <option>P4</option>
        </select>
        <Link href="/tickets/new" className="ml-auto h-9 inline-flex items-center rounded-md px-4 text-sm bg-gray-900 text-white">Nuevo Ticket</Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="py-2 pr-3">Código</th>
              <th className="py-2 pr-3">Título</th>
              <th className="py-2 pr-3">Prioridad</th>
              <th className="py-2 pr-3">Estado</th>
              <th className="py-2 pr-3">Apertura</th>
              <th className="py-2 pr-3">SLA Resp. (min)</th>
              <th className="py-2 pr-3">SLA Res. (min)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {rows.map(t => {
              const respMin = t.slaResponseMinutes ?? (t.firstResponseAt ? minsBetween(t.openedAt, t.firstResponseAt) : null);
              const resoMin = t.slaResolutionMinutes ?? (t.resolvedAt ? minsBetween(t.openedAt, t.resolvedAt) : null);
              return (
                <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-2 pr-3 whitespace-nowrap"><Link href={`/tickets/${t.id}`} className="underline">{t.code}</Link></td>
                  <td className="py-2 pr-3">{t.title}</td>
                  <td className="py-2 pr-3">{t.priority}</td>
                  <td className="py-2 pr-3">{t.status}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">{new Date(t.openedAt).toLocaleString()}</td>
                  <td className="py-2 pr-3">{respMin ?? '—'}</td>
                  <td className="py-2 pr-3">{resoMin ?? '—'}</td>
                </tr>
              );
            })}
            {!rows.length && !isLoading && (
              <tr><td colSpan={7} className="py-6 text-center text-gray-500">Sin tickets</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {isLoading && <div className="text-sm text-gray-500">Cargando…</div>}
      {isError && <div className="text-sm text-red-600">Ocurrió un error al cargar los tickets.</div>}
    </div>
  );
}