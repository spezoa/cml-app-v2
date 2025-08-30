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

  // NUEVO: quitar un rol específico a un usuario
  async function removeUserRole(formData: FormData) {
    "use server";
    const email = String(formData.get("email") || "").trim();
    const roleId = String(formData.get("roleId") || "").trim();
    if (!email || !roleId) return;

    const cookie = cookies().toString();
    const base = process.env.NEXTAUTH_URL || "";
    await fetch(`${base}/api/admin/rbac`, {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie },
      body: JSON.stringify({ action: "removeUserRole", email, roleId }),
    });
    revalidatePath("/admin/rbac");
  }

  // NUEVO: asignar rol inline (idéntico a assignRole, pero separado para claridad)
  async function assignUserRoleInline(formData: FormData) {
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

  // NUEVO: eliminar rol (bloquea isSystem)
  async function deleteRole(formData: FormData) {
    "use server";
    const roleId = String(formData.get("roleId") || "").trim();
    const isSystem = String(formData.get("isSystem") || "false") === "true";
    if (!roleId || isSystem) return;

    const cookie = cookies().toString();
    const base = process.env.NEXTAUTH_URL || "";
    await fetch(`${base}/api/admin/rbac`, {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie },
      body: JSON.stringify({ action: "deleteRole", roleId }),
    });
    revalidatePath("/admin/rbac");
  }

  // NUEVO: eliminar permiso
  async function deletePermission(formData: FormData) {
    "use server";
    const code = String(formData.get("code") || "").trim();
    if (!code) return;

    const cookie = cookies().toString();
    const base = process.env.NEXTAUTH_URL || "";
    await fetch(`${base}/api/admin/rbac`, {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie },
      body: JSON.stringify({ action: "deletePermission", code }),
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
                <li
                  key={r.id}
                  className="flex items-center justify-between border border-[#1f2937] rounded-lg px-3 py-2 bg-[#0b1220]"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{r.name}</span>
                    <Badge>{r.isSystem ? "system" : "custom"}</Badge>
                  </div>

                  {/* Botón eliminar rol (protegido si isSystem) */}
                  <form action={deleteRole} className="inline-flex">
                    <input type="hidden" name="roleId" value={r.id} />
                    <input type="hidden" name="isSystem" value={String(r.isSystem)} />
                    <button
                      type="submit"
                      disabled={r.isSystem}
                      title={r.isSystem ? "Rol del sistema: no se puede eliminar" : "Eliminar rol"}
                      className="rounded-md px-2 text-xs border border-[#1f2937] hover:bg-[#111827] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Eliminar
                    </button>
                  </form>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {(permissions as any[]).map((p: any) => {
                const code: string = (p?.code ?? p) as string;
                return (
                  <div
                    key={code}
                    className="flex items-center justify-between border border-[#1f2937] rounded-md px-3 py-2 bg-[#0b1220]"
                  >
                    <span className="truncate">{code}</span>
                    <form action={deletePermission} className="inline-flex">
                      <input type="hidden" name="code" value={code} />
                      <button
                        type="submit"
                        title="Eliminar permiso"
                        className="rounded-md px-2 text-xs border border-[#1f2937] hover:bg-[#111827]"
                      >
                        Eliminar
                      </button>
                    </form>
                  </div>
                );
              })}
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

        {/* Asignación de rol por email (form general) */}
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
                <option value="" disabled>
                  Selecciona un rol…
                </option>
                {(roles as any[]).map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </Select>
            </Labeled>
            <Button type="submit">Asignar</Button>
          </form>
        </Card>

        {/* Carga masiva */}
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

        {/* Usuarios (con acciones inline) */}
        <Card
          title="Usuarios"
          description="Usuarios y roles asignados"
          ctaLabel=" "
        >
          <div className="space-y-4">
            {(users as any[]).map((u) => {
              const assignedIds = new Set(
                (u.roles ?? []).map((r: any) => r.roleId ?? r.id)
              );
              const availableRoles = (roles as any[]).filter(
                (r) => !assignedIds.has(r.id)
              );

              return (
                <div
                  key={u.id ?? u.email}
                  className="border border-[#1f2937] rounded-xl p-3 bg-[#0b1220]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="truncate">
                      <div className="font-medium">{u.email}</div>
                      {u.name ? (
                        <div className="text-xs text-slate-400">{u.name}</div>
                      ) : null}
                    </div>

                    {/* Asignar rol (selector + botón) */}
                    <form action={assignUserRoleInline} className="flex items-center gap-2">
                      <input type="hidden" name="email" value={u.email} />
                      <Select
                        name="roleId"
                        defaultValue=""
                        className="w-[200px]"
                      >
                        <option value="" disabled>
                          Selecciona rol…
                        </option>
                        {availableRoles.map((r: any) => (
                          <option key={r.id} value={r.id}>
                            {r.name}
                          </option>
                        ))}
                      </Select>
                      <Button type="submit" disabled={availableRoles.length === 0}>
                        Asignar
                      </Button>
                    </form>
                  </div>

                  {/* Roles del usuario con botón para quitar */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(u.roles ?? []).map((r: any) => {
                      const rid = r.roleId ?? r.id;
                      const rname = r.role?.name ?? r.name;
                      return (
                        <form
                          key={rid}
                          action={removeUserRole}
                          className="inline-flex"
                        >
                          <input type="hidden" name="email" value={u.email} />
                          <input type="hidden" name="roleId" value={rid} />
                          <span className="inline-flex items-center gap-1 rounded-md border border-[#1f2937] bg-[#0b1220] px-2 py-0.5 text-xs">
                            {rname}
                            <button
                              type="submit"
                              className="ml-1 rounded-md px-1 text-xs border border-[#1f2937] hover:bg-[#111827]"
                              aria-label={`Quitar rol ${rname}`}
                              title="Quitar"
                            >
                              ×
                            </button>
                          </span>
                        </form>
                      );
                    })}
                    {(u.roles ?? []).length === 0 && (
                      <div className="text-xs text-slate-400">
                        Sin roles asignados.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {(!users || users.length === 0) && (
              <div className="text-sm text-slate-400">Aún no hay usuarios.</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
