import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

async function createTicket(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "");
  const priority = String(formData.get("priority") || "P3");
  if (!title) return;
  const count = await prisma.ticket.count();
  const code = `TCK-${new Date().getFullYear()}-${String(count+1).padStart(6,"0")}`;
  const user = await prisma.user.findFirst();
  await prisma.ticket.create({
    data: { code, title, priority: priority as any, openedById: user?.id || "" }
  });
  redirect("/tickets");
}

export default function NewTicketPage() {
  return (
    <form action={createTicket} className="card max-w-lg grid gap-3">
      <h1 className="text-xl font-semibold">Nuevo Ticket</h1>
      <div>
        <label>Título</label>
        <input name="title" placeholder="Fuga en línea hidráulica" />
      </div>
      <div>
        <label>Prioridad</label>
        <select name="priority" defaultValue="P3">
          <option value="P1">P1 - Crítico</option>
          <option value="P2">P2 - Alto</option>
          <option value="P3">P3 - Normal</option>
          <option value="P4">P4 - Bajo</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button className="btn btn-primary" type="submit">Crear</button>
      </div>
    </form>
  );
}
