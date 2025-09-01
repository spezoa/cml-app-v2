'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

type Comment = { id: string; body: string; createdAt: string; author: { id: string; email: string | null; name: string | null } };

export default function TicketComments({ ticketId }: { ticketId: string }) {
  const qc = useQueryClient();
  const [body, setBody] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ticket-comments', ticketId],
    queryFn: async () => {
      const res = await fetch(`/api/tickets/${ticketId}/comments`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Error cargando comentarios');
      return (await res.json()) as { comments: Comment[] };
    }
  });

  const add = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/tickets/${ticketId}/comments`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ body }),
      });
      if (!res.ok) throw new Error('Error al comentar');
      return await res.json();
    },
    onSuccess: () => {
      setBody("");
      qc.invalidateQueries({ queryKey: ['ticket-comments', ticketId] });
    }
  });

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {isLoading && <div className="text-sm text-gray-500">Cargando comentarios…</div>}
        {isError && <div className="text-sm text-red-600">No se pudieron cargar comentarios.</div>}
        {!isLoading && !isError && data?.comments?.length === 0 && (
          <div className="text-sm text-gray-500">Aún no hay comentarios.</div>
        )}
        <ul className="space-y-3">
          {data?.comments?.map(c => (
            <li key={c.id} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
              <div className="text-xs text-gray-500">
                {c.author?.name || c.author?.email || 'Usuario'} · {new Date(c.createdAt).toLocaleString()}
              </div>
              <div className="whitespace-pre-wrap text-sm mt-1">{c.body}</div>
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); if (!body.trim()) return; add.mutate(); }}
        className="flex items-start gap-2"
      >
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Escribe un comentario…"
          className="flex-1 rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          rows={3}
        />
        <button
          disabled={add.isPending || !body.trim()}
          className="h-10 px-4 rounded-md text-sm font-medium bg-gray-900 text-white disabled:opacity-50"
        >
          {add.isPending ? 'Enviando…' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}