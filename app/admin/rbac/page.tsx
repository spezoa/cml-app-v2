export const dynamic = 'force-dynamic';
import { requirePerm } from "@/utils/authz";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { ForbiddenError } from "@/utils/errors";

export default async function RBACPage() {
  try {
    await requirePerm("admin.rbac.manage");
  } catch (e: any) {
    if (e instanceof ForbiddenError) {
      if (e.message === "AUTH_REQUIRED") return redirect("/api/auth/signin?callbackUrl=/admin/rbac");
      return redirect("/403");
    }
    throw e;
  }

  const roles = await prisma.role.findMany({
    include: { perms: true, users: { include: { user: true } } },
    orderBy: { name: "asc" }
  });
  const perms = await prisma.permission.findMany({ orderBy: { code: "asc" } });
  const users = await prisma.user.findMany({ orderBy: { email: "asc" } });

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Roles</h2>
        <div className="space-y-3">
          {roles.map(r => (
            <div key={r.id} className="border-b border-panel-border pb-3">
              <div className="font-medium">{r.name} {r.isSystem ? <span className="badge ml-2">system</span> : null}</div>
              <div className="text-xs text-slate-400 mt-1">
                Permisos: {r.perms.map(p => p.permCode).join(", ") || "—"}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Usuarios: {r.users.map(u => u.user.email).join(", ") || "—"}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-4">* Edición por UI vendrá en siguiente iteración. Por ahora gestiona desde Supabase si necesitas cambios.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-medium mb-2">Permisos existentes</h3>
          <ul className="text-sm space-y-1">
            {perms.map(p => <li key={p.code}><code>{p.code}</code></li>)}
          </ul>
        </div>
        <div className="card">
          <h3 className="font-medium mb-2">Usuarios</h3>
          <ul className="text-sm space-y-1">
            {users.map(u => <li key={u.id}>{u.email}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
