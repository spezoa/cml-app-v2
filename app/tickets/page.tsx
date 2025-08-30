export const dynamic = 'force-dynamic';
import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function TicketsPage() {
  const tickets = await prisma.ticket.findMany({ orderBy: { openedAt: "desc" }, take: 50 });
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tickets</h1>
        <Link href="/tickets/new" className="btn btn-primary">Nuevo Ticket</Link>
      </div>
      <div className="card">
        <table className="w-full text-sm">
          <thead className="text-left">
            <tr><th>Code</th><th>Título</th><th>Prioridad</th><th>Estado</th><th>Cola</th><th>Abierto</th></tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t.id} className="border-t">
                <td className="py-2">{t.code}</td>
                <td>{t.title}</td>
                <td>{t.priority}</td>
                <td>{t.status}</td>
                <td>{t.queue}</td>
                <td>{t.openedAt.toISOString().substring(0,10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
