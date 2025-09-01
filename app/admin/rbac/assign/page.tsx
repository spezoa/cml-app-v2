export const dynamic = 'force-dynamic';

import { cookies } from 'next/headers';
import Link from 'next/link';

async function fetchData(userId: string) {
  const cookie = cookies().toString();
  const base = process.env.NEXTAUTH_URL || '';
  const res = await fetch(`${base}/api/admin/users/${userId}/roles`, { cache: 'no-store', headers: { cookie } });
  if (!res.ok) return null;
  return res.json();
}

export default async function AssignRolesPage({ searchParams }: { searchParams: { userId?: string } }) {
  const userId = searchParams?.userId;
  if (!userId) {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">Asignar roles</h1>
        <p>Abra esta página con <code>?userId=&lt;id&gt;</code> para gestionar roles del usuario.</p>
        <Link className="underline" href="/admin/rbac">Volver a RBAC</Link>
      </div>
    );
  }
  const data = await fetchData(userId);
  if (!data) return <div>Error cargando datos.</div>;
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Roles de {data.user.email}</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {data.roles.map((r: any) => {
          const assigned = data.userRoleIds.includes(r.id);
          return (
            <form key={r.id} action={`/api/admin/users/${userId}/roles`} method="post" className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <div className="font-medium">{r.name}</div>
                {r.isSystem && <div className="text-xs text-gray-500">Sistema</div>}
              </div>
              {assigned ? (
                <button formAction={`/api/admin/users/${userId}/roles`} formaction={`/api/admin/users/${userId}/roles`} formMethod="post" className="hidden" />
              ) : null}
              {assigned ? (
                <button
                  formAction={`/api/admin/users/${userId}/roles`}
                  formMethod="dialog"
                  className="h-9 px-3 rounded-md border"
                  onClick={async (e) => {
                    e.preventDefault();
                    await fetch(`/api/admin/users/${userId}/roles`, { method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ roleId: r.id }) });
                    location.reload();
                  }}
                >
                  Quitar
                </button>
              ) : (
                <button
                  className="h-9 px-3 rounded-md bg-gray-900 text-white"
                  onClick={async (e) => {
                    e.preventDefault();
                    await fetch(`/api/admin/users/${userId}/roles`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ roleId: r.id }) });
                    location.reload();
                  }}
                >
                  Asignar
                </button>
              )}
            </form>
          );
        })}
      </div>
      <Link className="underline" href="/admin/rbac">Volver a RBAC</Link>
    </div>
  );
}