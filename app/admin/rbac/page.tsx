export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { requirePerm } from "@/utils/authz";
import { ForbiddenError } from "@/utils/errors";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Input, Select, Textarea, Labeled } from "@/components/ui/Field";
import Badge from "@/components/ui/Badge";

// ---- helpers ----
async function getRBAC() {
  const cookie = cookies().toString();
  const base = process.env.NEXTAUTH_URL || "";
  const res = await fetch(`${base}/api/admin/rbac`, {
    cache: "no-store",
    headers: { cookie },
  });
  if (res.status === 401 || res.status === 403) return { roles: [], permissions: [], users: [] };
  if (!res.ok) return { roles: [], permissions: [], users: [] };
  const data = await res.json();
  // Tolera estructuras distintas
  return {
    roles: data.roles ?? [],
    permissions: data.permissions ?? data.perms ?? [],
    users: data.users ?? [],
  };
}

export default async function RBACPage() {
  // Gate de permisos (solo vista admin; las acciones validan en API)
  try {
    await requirePerm("admin.view");
  } catch (e: any) {
    if (e instanceof ForbiddenError) redirect("/403");
    throw e;
  }

  const { roles, permissions, users } = await getRBAC();

  // --- Server Actions (POST contra tus APIs existentes) ---
  async function createRole(formData: FormData) {
    "use server";
    const name = String(formData.get("name") || "").trim();
    if (!name) return;

    const cookie = cookies().toString();
    const base = process.env.NEXTAUTH_URL || "";
    await fetch(`${base}/api/admin/rbac`, {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie },
      body: JSON.stringify({ action: "createRole", name }),
    });
    revalidatePath("/admin/rbac");
  }

  async function addPermission(formData: FormData) {
    "use server";
    const code = String(formData.get("code") || "").trim();
    if (!code) return;

    const cookie = cookies().toString();
    const base = process.env.NEXTAUTH_URL || "";
    await fetch(`${base}/api/admin/rbac`, {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie },
      body: JSON.stringify({ action: "addPermission", code }),
    });
    revalidatePath("/admin/rbac");
  }

  async function assignRole(formData: FormData) {
    "use server";
    const email = String(formData.get("email") || "").trim();
    const roleId = String(formData.get("roleId") || "").trim();
    if (!email || !roleId) return;

    const cookie = cookies().toString();
    const base = process.env.NEXTAUTH_URL || "";
    await fetch(`${base}/api/admin/rbac`, {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie },
      body: JSON.stringify({ action: "assignRole", email, roleId }),
    });
    revalidatePath("/admin/rbac");
  }

  async function bulkImport(formData: FormData) {
    "use server";
    const payloadRaw = String(formData.get("payload") || "");
    if (!payloadRaw) return;

    const cookie = cookies().toString();
    const base = process.env.NEXTAUTH_URL || "";
    await fetch(`${base}/api/admin/rbac/bulk`, {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie },
      body: payloadRaw, // ya es JSON
    });
    revalidatePath("/admin/rbac");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">RBAC</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roles */}
        <Card
          title="Roles"
          description="Crea y visualiza los roles del sistema."
          ctaLabel=" "
        >
          <div className="space-y-4">
            <ul className="space-y-2">
              {(roles as any[]).map((r) => (
                <li key={r.id} className="flex items-center justify-between border border-[#1f2937] rounded-lg px-3 py-2 bg-[#0b1220]">
                  <span className="font-medium">{r.name}</span>
                  <Badge>{r.isSystem ? "system" : "custom"}</Badge>
                </li>
              ))}
              {(!roles || roles.length === 0) && (
                <div className="text-sm text-slate-400">Aún no hay roles.</div>
              )}
            </ul>

            <form action={createRole} className="space-y-2">
              <Labeled label="Nuevo rol">
                <Input name="name" placeholder="Ej: superuser" required />
              </Labeled>
              <Button type="submit">Crear rol</Button>
            </form>
          </div>
        </Card>

        {/* Permisos */}
        <Card
          title="Permisos"
          description="Alta de códigos de permiso (p. ej. tickets.view, admin.view, *)."
          ctaLabel=" "
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {(permissions as any[]).map((p: any) => (
                <div key={p.code ?? p} className="border border-[#1f2937] rounded-md px-3 py-2 bg-[#0b1220] truncate">
                  {p.code ?? p}
                </div>
              ))}
              {(!permissions || permissions.length === 0) && (
                <div className="text-sm text-slate-400">Aún no hay permisos.</div>
              )}
            </div>

            <form action={addPermission} className="space-y-2">
              <Labeled label="Nuevo permiso">
                <Input name="code" placeholder="Ej: tickets.manage" required />
              </Labeled>
              <Button type="submit">Agregar permiso</Button>
            </form>
          </div>
        </Card>

        {/* Asignación de rol por email */}
        <Card
          title="Asignar rol a usuario"
          description="Busca por email (SSO) y asigna un rol."
          ctaLabel=" "
        >
          <form action={assignRole} className="space-y-3">
            <Labeled label="Email del usuario">
              <Input name="email" type="email" placeholder="usuario@tuorg.com" required />
            </Labeled>
            <Labeled label="Rol">
              <Select name="roleId" defaultValue="">
                <option value="" disabled>Selecciona un rol…</option>
                {(roles as any[]).map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </Select>
            </Labeled>
            <Button type="submit">Asignar</Button>
          </form>
        </Card>

        {/* Carga masiva (opcional) */}
        <Card
          title="Importación masiva"
          description="Pega JSON con roles, permisos y asignaciones."
          ctaLabel=" "
        >
          <form action={bulkImport} className="space-y-3">
            <Labeled label="JSON">
              <Textarea
                name="payload"
                rows={8}
                placeholder={`{
  "roles": [{"name":"superuser","isSystem":true}],
  "permissions": ["*", "tickets.view", "admin.view"],
  "assign": [{"email":"tu@correo.com","role":"superuser"}]
}`}
              />
            </Labeled>
            <Button type="submit">Procesar</Button>
          </form>
        </Card>
        <Card title="Usuarios" description="Usuarios y roles asignados" ctaLabel=" ">
  <div className="space-y-2">
    {(users as any[]).map((u) => (
      <div
        key={u.id ?? u.email}
        className="flex items-center justify-between border border-[#1f2937] rounded-md px-3 py-2 bg-[#0b1220]"
      >
        <div className="truncate">
          <div className="font-medium">{u.email}</div>
          {u.name ? (
            <div className="text-xs text-slate-400">{u.name}</div>
          ) : null}
        </div>
        <div className="flex gap-2">
          {(u.roles ?? []).map((r: any) => (
            <Badge key={r.roleId ?? r.id}>{r.role?.name ?? r.name}</Badge>
          ))}
        </div>
      </div>
    ))}
    {(!users || users.length === 0) && (
      <div className="text-sm text-slate-400">Aún no hay usuarios.</div>
    )}
  </div>
</Card>

      </div>
    </div>
  );
}
