export const dynamic = 'force-dynamic';
import { cookies } from "next/headers";
import { Tile, Button, Card, CardHeader, CardTitle, CardContent, Badge, Field, Input, Select, Textarea, Labeled } from "@/components/ui";


async function getTicket(id: string) {
  const cookie = cookies().toString();
  const base = process.env.NEXTAUTH_URL || "";
  const res = await fetch(`${base}/api/tickets/${id}`, {
    cache: "no-store",
    headers: { cookie },
  });
  if (res.status === 401 || res.status === 403) return null;
  if (!res.ok) return null;
  const data = await res.json();
  return data?.ticket as any;
}

export default async function TicketDetail({ params }: { params: { id: string }}) {
  const ticket = await getTicket(params.id);
  if (!ticket) return <div className="text-sm text-slate-400">Ticket no encontrado o sin permisos.</div>;

  async function addComment(formData: FormData) {
    "use server";
    const body = String(formData.get("body") || "");
    const cookie = cookies().toString();
    const base = process.env.NEXTAUTH_URL || "";
    await fetch(`${base}/api/tickets/${ticket.id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie },
      body: JSON.stringify({ body }),
    });
  }

  return (
    <div className="grid md:grid-cols-[2fr_1fr] gap-6">
      <Card
        title={`${ticket.code} · ${ticket.title}`}
        description={ticket.asset?.code || "—"}
        ctaLabel=" "
      >
        <div className="flex gap-2 mb-3">
          <Badge>{ticket.priority}</Badge>
          <Badge>{ticket.status}</Badge>
        </div>

        <p className="text-slate-300 whitespace-pre-wrap">
          {ticket.description || "Sin descripción"}
        </p>

        <h3 className="mt-6 mb-2 font-medium">Comentarios</h3>
        <div className="space-y-3">
          {(ticket.comments ?? []).length === 0 && (
            <div className="text-sm text-slate-400">Aún no hay comentarios.</div>
          )}
          {ticket.comments?.map((c: any) => (
            <div key={c.id} className="border-b border-[#1f2937] pb-2">
              <div className="text-xs text-slate-400">
                {c.author?.email || "?"} · {new Date(c.createdAt).toLocaleString()}
              </div>
              <div className="text-sm">{c.body}</div>
            </div>
          ))}
        </div>

        <form action={addComment} className="mt-4 space-y-2">
          <Textarea name="body" required rows={3} placeholder="Escribe un comentario..." />
          <Button type="submit">Enviar</Button>
        </form>
      </Card>

      <Card title="Metadatos" ctaLabel=" ">
        <div className="space-y-2 text-sm text-slate-300">
          <div><span className="text-slate-400">Prioridad:</span> {ticket.priority}</div>
          <div><span className="text-slate-400">Estado:</span> {ticket.status}</div>
          <div><span className="text-slate-400">Apertura:</span> {new Date(ticket.openedAt).toLocaleString()}</div>
        </div>
      </Card>
    </div>
  );
}
