export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Tile, Button, Card, CardHeader, CardTitle, CardContent, Badge, Field, Input, Select, Textarea, Labeled } from "@/components/ui";


export default function NewTicket() {
  async function create(formData: FormData) {
    "use server";
    const payload = {
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),
      priority: String(formData.get("priority") || "P3"),
    };
    const cookie = cookies().toString();
    const base = process.env.NEXTAUTH_URL || "";
    const res = await fetch(`${base}/api/tickets`, {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("No se pudo crear");
    const { ticket } = await res.json();
    redirect(`/newui/tickets/${ticket.id}`);
  }

  return (
    <Card title="Nuevo ticket" description="Crea una nueva atención">
      <form action={create} className="space-y-4">
        <Labeled label="Título">
          <Input name="title" required placeholder="Ej: Mantención bomba nº23" />
        </Labeled>
        <Labeled label="Descripción">
          <Textarea name="description" rows={5} placeholder="Detalle del problema..." />
        </Labeled>
        <Labeled label="Prioridad">
          <Select name="priority" defaultValue="P3">
            <option>P1</option><option>P2</option><option>P3</option><option>P4</option>
          </Select>
        </Labeled>
        <Button type="submit">Crear</Button>
      </form>
    </Card>
  );
}
