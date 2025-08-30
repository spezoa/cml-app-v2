export const dynamic = 'force-dynamic';
import { requirePerm } from "@/utils/authz";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ForbiddenError } from "@/utils/errors";

export default async function AdminHome() {
  try {
    await requirePerm("admin.view");
  } catch (e) {
    if (e instanceof ForbiddenError) redirect("/403");
    throw e;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card">
        <h2 className="text-xl font-semibold mb-2">RBAC</h2>
        <p className="text-sm text-gray-600">Roles, permisos y asignación por prefijo.</p>
        <Link href="/admin/rbac" className="btn mt-4">Abrir</Link>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold mb-2">Ajustes (General)</h2>
        <p className="text-sm text-gray-600">Zona horaria, unidades, branding.</p>
        <Link href="/admin/settings" className="btn mt-4">Abrir</Link>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold mb-2">SLA y Reglas</h2>
        <p className="text-sm text-gray-600">Prioridades, MTTA/MTTR, ruteo de tickets.</p>
        <Link href="/admin/sla" className="btn mt-4">Abrir</Link>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold mb-2">Plantillas</h2>
        <p className="text-sm text-gray-600">Checklists NFPA 1910/1962/1932 — versionado.</p>
        <Link href="/admin/templates" className="btn mt-4">Abrir</Link>
      </div>
    </div>
  );
}
