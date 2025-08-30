export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";

export default function NewTicket() {
  async function create(formData: FormData) {
    "use server";
    const payload = {
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),
      priority: String(formData.get("priority") || "P3"),
    };
    const res = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/tickets`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("No se pudo crear");
    const { ticket } = await res.json();
    redirect(`/newui/tickets/${ticket.id}`);
  }

  return (
    <form action={create} className="max-w-xl rounded-xl p-5 border border-[#1f2937] bg-[#111827] space-y-4">
      <h1 className="text-xl font-semibold">Nuevo ticket</h1>
      <div>
        <label className="block text-sm mb-1">Título</label>
        <input name="title" required className="w-full rounded-md bg-[#0b1220] border border-[#1f2937] px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/40" />
      </div>
      <div>
        <label className="block text-sm mb-1">Descripción</label>
        <textarea name="description" rows={5} className="w-full rounded-md bg-[#0b1220] border border-[#1f2937] px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/40" />
      </div>
      <div>
        <label className="block text-sm mb-1">Prioridad</label>
        <select name="priority" className="w-full rounded-md bg-[#0b1220] border border-[#1f2937] px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/40">
          <option>P1</option><option>P2</option><option selected>P3</option><option>P4</option>
        </select>
      </div>
      <button className="inline-flex items-center rounded-lg border border-[#1f2937] bg-[#0b1220] px-3 py-2 text-sm hover:bg-[#111827]">Crear</button>
    </form>
  );
}
