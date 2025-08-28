import Link from "next/link";
export default function AdminHome() {
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
    </div>
  );
}
