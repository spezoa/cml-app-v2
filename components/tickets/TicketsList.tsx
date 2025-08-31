'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api'; // de B.2
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

type Ticket = {
  id: string;
  title: string;
  priority?: 'P1' | 'P2' | 'P3' | 'P4';
  status?: string;
  createdAt?: string;
};

type TicketsResponse = { tickets: Ticket[] };

export default function TicketsList() {
  const qc = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['tickets'],
    queryFn: () => api<TicketsResponse>('/api/tickets'),
  });

  const [newTitle, setNewTitle] = useState('');

  const createMutation = useMutation({
    mutationFn: async (title: string) =>
      api<{ ok: true; ticket: Ticket }>('/api/tickets', {
        method: 'POST',
        body: JSON.stringify({ title }),
      }),
    onSuccess: () => {
      setNewTitle('');
      qc.invalidateQueries({ queryKey: ['tickets'] });
    },
  });

  return (
    <Card className="shadow-md border border-border/60">
      <CardHeader>
        <CardTitle className="text-lg">Tickets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Nuevo ticket (título)"
            className="w-full rounded-md border px-3 py-2 text-sm bg-background"
          />
          <Button
            onClick={() => newTitle && createMutation.mutate(newTitle)}
            disabled={createMutation.isPending || !newTitle.trim()}
          >
            Crear
          </Button>
        </div>

        {isLoading && <div>Cargando…</div>}
        {isError && (
          <div className="text-red-500">
            Error: {(error as Error).message}
          </div>
        )}

        {!!data?.tickets?.length && (
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-2">Título</th>
                  <th className="text-left p-2">Prioridad</th>
                  <th className="text-left p-2">Estado</th>
                  <th className="text-left p-2">Creado</th>
                  <th className="text-left p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.tickets.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="p-2">{t.title}</td>
                    <td className="p-2">{t.priority ?? 'P3'}</td>
                    <td className="p-2">{t.status ?? 'NEW'}</td>
                    <td className="p-2">
                      {t.createdAt
                        ? new Date(t.createdAt).toLocaleString()
                        : '—'}
                    </td>
                    <td className="p-2">
                      <Link href={`/tickets/${t.id}`} className="underline">
                        Abrir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && !isError && !data?.tickets?.length && (
          <div className="text-muted-foreground">Sin tickets aún.</div>
        )}
      </CardContent>
    </Card>
  );
}
