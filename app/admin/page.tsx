export const dynamic = 'force-dynamic';

import { tile } from '@/components/admin/tile';

export default function AdminHome() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Consola de Administración</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Configura la aplicación, roles y permisos.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Tile
          title="Roles y permisos"
          description="Gestiona RBAC (roles, permisos, asignaciones)."
          href="/admin/rbac"
        />

        <Tile
          title="Parámetros"
          description="Zona horaria, unidades, branding."
          disabled
        />

        <Tile
          title="Usuarios"
          description="Alta/baja, asignación de roles (próximamente)."
          disabled
        />
      </div>
    </div>
  );
}
