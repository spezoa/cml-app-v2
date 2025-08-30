export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";

export default function NewTicketPage() {
  async function create(formData: FormData) {
    "use server";
    const payload = {
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),
      priority: String(formData.get("priority") || "P3"),
    };
    const res = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/tickets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("No se pudo crear");
    const { ticket } = await res.json();
    redirect(`/tickets/${ticket.id}`);
  }

  return (
    <form action={create} className="max-w-xl card space-y-4">
      <h1 className="text-xl font-semibold">Nuevo ticket</h1>
      <div>
        <label className="block text-sm mb-1">Título</label>
        <input name="title" required className="input" />
      </div>
      <div>
        <label className="block text-sm mb-1">Descripción</label>
        <textarea name="description" rows={5} className="input"></textarea>
      </div>
      <div>
        <label className="block text-sm mb-1">Prioridad</label>
        <select name="priority" className="select">
          <option>P1</option><option>P2</option><option selected>P3</option><option>P4</option>
        </select>
      </div>
      <button className="btn">Crear</button>
    </form>
  );
}
