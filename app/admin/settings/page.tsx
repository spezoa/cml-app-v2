import { requirePerm, requireUser } from "@/utils/authz";
import { getSettings, setSetting } from "@/lib/settings";

async function saveSettings(formData: FormData) {
  "use server";
  await requirePerm("admin.settings.manage");
  const user = await requireUser();
  const name = String(formData.get("workshopName") || "");
  const tz = String(formData.get("timezone") || "");
  await setSetting("workshopName", name, user.id);
  await setSetting("timezone", tz, user.id);
}

export default async function SettingsPage() {
  await requirePerm("admin.settings.manage");
  const current = await getSettings(["workshopName", "timezone"]);
  const tz = current["timezone"] ?? "America/Santiago";
  const name = current["workshopName"] ?? "";

  return (
    <form action={saveSettings} className="card max-w-lg grid gap-4">
      <h1 className="text-xl font-semibold">Ajustes Generales</h1>
      <div>
        <label>Nombre del taller</label>
        <input name="workshopName" defaultValue={name} placeholder="Ej. Taller Compañía 8" />
      </div>
      <div>
        <label>Zona horaria</label>
        <select name="timezone" defaultValue={tz}>
          <option>America/Santiago</option>
          <option>America/Lima</option>
          <option>America/Bogota</option>
          <option>America/Mexico_City</option>
          <option>UTC</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button className="btn-primary" type="submit">Guardar</button>
        <button className="btn" type="reset">Cancelar</button>
      </div>
    </form>
  );
}
