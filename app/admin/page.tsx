export const dynamic = "force-dynamic";

import { requirePerm } from "@/utils/authz";
import { redirect } from "next/navigation";
import { ForbiddenError } from "@/utils/errors";
import Card from "@/components/ui/Card";

export default async function AdminHome() {
  try {
    await requirePerm("admin.view");
  } catch (e: any) {
    if (e instanceof ForbiddenError) redirect("/403");
    throw e;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Gestión de taller</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title="RBAC"
          description="Roles, permisos y asignación por perfil."
          href="/admin/rbac"
        />

        <Card
          title="Ajustes (General)"
          description="Zona horaria, unidades, branding."
          // si aún no está implementado, lo dejas sin href o con disabled
          disabled
        />

        <Card
          title="SLA y Reglas"
          description="Prioridades, MTTA/MTTR, ruteo de tickets."
          disabled
        />

        <Card
          title="Plantillas"
          description="Checklists NFPA 1910/1962/1932 — versionado."
          disabled
        />
      </div>
    </div>
  );
}
