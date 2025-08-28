"use client";
import { useEffect, useState } from "react";
import type { Role, Permission } from "@prisma/client";

type RoleWithPerms = Role & { perms: { permCode: string; allow: boolean }[] };

export default function RBACPage() {
  const [roles, setRoles] = useState<RoleWithPerms[]>([]);
  const [perms, setPerms] = useState<Permission[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/rbac");
      const data = await res.json();
      setRoles(data.roles);
      setPerms(data.perms);
    })();
  }, []);

  const save = async (roleId: string, permCode: string, allow: boolean) => {
    await fetch("/api/admin/rbac", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ roleId, permCode, allow }) });
  };

  const bulkByPrefix = async (roleId: string, prefix: string, allow: boolean) => {
    await fetch("/api/admin/rbac/bulk", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ roleId, prefix, allow }) });
    const res = await fetch("/api/admin/rbac");
    const data = await res.json();
    setRoles(data.roles);
  };

  const filtered = perms.filter(p => p.code.includes(filter));

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-xl font-semibold">Roles & Permisos</h1>
        <div className="mt-4 flex items-center gap-3">
          <input placeholder="Filtrar permisos (prefijo: ticket., wo., admin.)" value={filter} onChange={(e)=>setFilter(e.target.value)} />
          <span className="text-xs text-gray-500">Tip: usa prefijos, ej. <code>ticket.</code></span>
        </div>
      </div>

      {roles.map(role => (
        <div key={role.id} className="card">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{role.name}</h2>
            <div className="flex gap-2">
              <button className="btn" onClick={()=>bulkByPrefix(role.id, filter || "ticket.", true)}>Seleccionar por prefijo</button>
              <button className="btn" onClick={()=>bulkByPrefix(role.id, filter || "ticket.", false)}>Remover por prefijo</button>
            </div>
          </div>
          <div className="mt-4 grid md:grid-cols-2 gap-2">
            {filtered.map(p => {
              const has = (role.perms || []).some((rp: any) => rp.permCode === p.code && rp.allow);
              return (
                <label key={p.code} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked={has} onChange={(e)=>save(role.id, p.code, e.target.checked)} />
                  <span>{p.code}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
