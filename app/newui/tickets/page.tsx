export const dynamic = 'force-dynamic';
import Link from "next/link";

async function getTickets() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/tickets`, { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudo cargar");
  return (await res.json()).tickets as any[];
}

export default async function TicketsPage() {
  const tickets = await getTickets();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tickets</h1>
        <Link className="inline-flex items-center rounded-lg border border-[#1f2937] bg-[#0b1220] px-3 py-2 text-sm hover:bg-[#111827]" href="/newui/tickets/new">Nuevo</Link>
      </div>
      <div className="grid gap-3">
        {tickets.map(t => (
          <Link href={`/newui/tickets/${t.id}`} key={t.id}
            className="rounded-xl p-5 border border-[#1f2937] bg-[#111827]">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{t.code} · {t.title}</div>
                <div className="text-xs text-slate-400 mt-1">{t.asset?.code || "—"} · {t.priority} · {t.status}</div>
              </div>
              <div className="inline-flex items-center rounded-md border border-[#1f2937] bg-[#0b1220] px-2 py-0.5 text-xs">{t.status}</div>
            </div>
          </Link>
        ))}
        {tickets.length === 0 && <div className="text-sm text-slate-400">No hay tickets aún.</div>}
      </div>
    </div>
  );
}
