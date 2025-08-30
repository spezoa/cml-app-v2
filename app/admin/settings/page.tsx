export const dynamic = 'force-dynamic';
import { requirePerm } from "@/utils/authz";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { ForbiddenError } from "@/utils/errors";

async function getSetting(key: string) {
  const s = await prisma.setting.findUnique({ where: { key } });
  return s?.value || "";
}

export default async function SettingsPage() {
  try {
    await requirePerm("admin.settings.edit");
  } catch (e: any) {
    if (e instanceof ForbiddenError) {
      if (e.message === "AUTH_REQUIRED") return redirect("/api/auth/signin?callbackUrl=/admin/settings");
      return redirect("/403");
    }
    throw e;
  }

  const name = await getSetting("org.name");
  const tz = await getSetting("org.tz");

  async function save(formData: FormData) {
    "use server";
    const entries = ["org.name","org.tz"] as const;
    for (const key of entries) {
      const value = String(formData.get(key) || "");
      await prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
    }
  }

  return (
    <form action={save} className="card max-w-xl space-y-4">
      <div>
        <label className="block text-sm mb-1">Nombre del taller</label>
        <input name="org.name" defaultValue={name} className="input" />
      </div>
      <div>
        <label className="block text-sm mb-1">Zona horaria</label>
        <input name="org.tz" defaultValue={tz} className="input" placeholder="America/Santiago" />
      </div>
      <button className="btn">Guardar</button>
    </form>
  );
}
