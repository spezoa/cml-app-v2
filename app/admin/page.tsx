export const dynamic = 'force-dynamic';
import { requirePerm } from "@/utils/authz";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ForbiddenError } from "@/utils/errors";

export default async function AdminHome() {
  try {
    await requirePerm("admin.view");
  } catch (e: any) {
    if (e instanceof ForbiddenError) {
      if (e.message === "AUTH_REQUIRED") return redirect("/api/auth/signin?callbackUrl=/admin");
      return redirect("/403");
    }
    throw e;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card">
        <h2 className="text-xl font-semibold mb-2">RBAC</h2>
        <p className="text-sm text-gray-400">Roles, permisos y asignación por usuario.</p>
        <Link href="/admin/rbac" className="btn mt-4">Abrir</Link>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold mb-2">Ajustes</h2>
        <p className="text-sm text-gray-400">Zona horaria, unidades y branding.</p>
        <Link href="/admin/settings" className="btn mt-4">Abrir</Link>
      </div>
    </div>
  );
}
