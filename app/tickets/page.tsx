export const dynamic = 'force-dynamic';
import Link from "next/link";
import { cookies } from "next/headers";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

async function getTickets() {
  const cookie = cookies().toString();
  const base = process.env.NEXTAUTH_URL || "";
  const res = await fetch(`${base}/api/tickets`, {
    cache: "no-store",
    headers: { cookie },
  });
  if (res.status === 401 || res.status === 403) return [];
  if (!res.ok) throw new Error(`/api/tickets → ${res.status}`);
  const data = await res.json();
  return (data?.tickets ?? []) as any[];
}

export default async function TicketsPage() {
  const tickets = await getTickets();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tickets</h1>
        <Button href="/newui/tickets/new">Nuevo</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tickets.map((t: any) => (
          <Card
            key={t.id}
            title={`${t.code} · ${t.title}`}
            description={`${t.asset?.code || "—"}`}
            href={`/newui/tickets/${t.id}`}
            ctaLabel="Ver detalle"
          >
            <div className="flex gap-2 text-slate-300">
              <Badge>{t.priority}</Badge>
              <Badge>{t.status}</Badge>
            </div>
          </Card>
        ))}
      </div>

      {tickets.length === 0 && (
        <div className="text-sm text-slate-400">
          No hay tickets (o faltan permisos).
        </div>
      )}
    </div>
  );
}

import TicketsList from '@/components/tickets/TicketsList';

export default function Page() {
  return <TicketsList />;
}
