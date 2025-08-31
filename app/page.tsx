export const dynamic = "force-dynamic";
import { Tile, Button, Card, CardHeader, CardTitle, CardContent, Badge, Field, Input, Select, Textarea, Labeled } from "@/components/ui";


export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Inicio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title="Tickets"
          description="Ver y gestionar tickets del taller."
          href="/tickets"
          ctaLabel="Abrir tickets"
        />
        <Card
          title="Nuevo ticket"
          description="Crear una atención preventiva o correctiva."
          href="/tickets/new"
          ctaLabel="Crear"
        />
        <Card
          title="Admin"
          description="Roles, permisos, ajustes y plantillas."
          href="/admin"
          ctaLabel="Ir a Admin"
        />
        <Card
          title="Reportes"
          description="KPIs: backlog, MTTA, MTTR (próximamente)."
          disabled
        />
      </div>
    </div>
  );
}
