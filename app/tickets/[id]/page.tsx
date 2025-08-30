export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/db";

async function getTicket(id: string) {
  return prisma.ticket.findUnique({
    where: { id },
    include: { comments: { include: { author: true }, orderBy: { createdAt: "asc" } } }
  });
}

export default async function TicketDetail({ params }: { params: { id: string }}) {
  const ticket = await getTicket(params.id);
  if (!ticket) return <div className="text-sm text-slate-400">Ticket no encontrado.</div>;

  async function addComment(formData: FormData) {
    "use server";
    const body = String(formData.get("body") || "");
    await fetch(`${process.env.NEXTAUTH_URL || ""}/api/tickets/${ticket.id}/comments`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    });
  }

  return (
    <div className="grid md:grid-cols-[2fr_1fr] gap-6">
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold">{ticket.code} · {ticket.title}</h1>
          <div className="badge">{ticket.status}</div>
        </div>
        <p className="text-slate-300 whitespace-pre-wrap">{ticket.description || "Sin descripción"}</p>

        <h3 className="mt-6 mb-2 font-medium">Comentarios</h3>
        <div className="space-y-3">
          {ticket.comments.map(c => (
            <div key={c.id} className="border-b border-panel-border pb-2">
              <div className="text-xs text-slate-400">{c.author?.email || "?"} · {new Date(c.createdAt).toLocaleString()}</div>
              <div className="text-sm">{c.body}</div>
            </div>
          ))}
          {ticket.comments.length === 0 && <div className="text-sm text-slate-400">Aún no hay comentarios.</div>}
        </div>

        <form action={addComment} className="mt-4 space-y-2">
          <textarea name="body" required rows={3} className="input" placeholder="Escribe un comentario..."></textarea>
          <button className="btn">Enviar</button>
        </form>
      </div>

      <aside className="space-y-4">
        <div className="card">
          <div className="font-medium mb-2">Metadatos</div>
          <div className="text-sm text-slate-400">Prioridad: {ticket.priority}</div>
          <div className="text-sm text-slate-400">Estado: {ticket.status}</div>
          <div className="text-sm text-slate-400">Apertura: {new Date(ticket.openedAt).toLocaleString()}</div>
        </div>
      </aside>
    </div>
  );
}
