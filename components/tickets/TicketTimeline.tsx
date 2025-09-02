'use client';
import * as React from 'react';

type Actor = { name?: string | null; email?: string | null };
type Event = {
  id: string;
  type: 'CREATED' | 'UPDATED' | 'STATUS_CHANGED' | 'COMMENTED' | 'ASSIGNED' | 'DELETED';
  payload?: any;
  createdAt: string | Date;
  actor?: Actor | null;
};

function fmtDate(d: string | Date) {
  const dt = typeof d === 'string' ? new Date(d) : d;
  return dt.toLocaleString();
}

function human(e: Event): string {
  const who = e.actor?.name || e.actor?.email || 'Sistema';
  switch (e.type) {
    case 'CREATED':
      return `Creación del ticket por ${who}`;
    case 'UPDATED':
      return `Actualización por ${who}`;
    case 'STATUS_CHANGED':
      return `Cambio de estado por ${who}`;
    case 'COMMENTED':
      return `Nuevo comentario por ${who}`;
    case 'ASSIGNED':
      return `Asignación por ${who}`;
    case 'DELETED':
      return `Ticket marcado como eliminado por ${who}`;
    default:
      return `${e.type} por ${who}`;
  }
}

export default function TicketTimeline({ events }: { events: Event[] }) {
  if (!events?.length) return <p className="text-sm text-muted-foreground">Sin actividades aún.</p>;
  return (
    <ol className="relative border-s ps-5 space-y-5">
      {events.map((e) => (
        <li key={e.id} className="space-y-1">
          <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full bg-indigo-500" />
          <div className="text-sm text-foreground">{human(e)}</div>
          {e.payload ? (
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words bg-muted/30 p-2 rounded-md overflow-x-auto">
              {JSON.stringify(e.payload, null, 2)}
            </pre>
          ) : null}
          <div className="text-xs text-muted-foreground">{fmtDate(e.createdAt)}</div>
        </li>
      ))}
    </ol>
  );
}