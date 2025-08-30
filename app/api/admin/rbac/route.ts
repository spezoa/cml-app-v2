// app/api/admin/rbac/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requirePerm } from "@/utils/authz";

// Fuerza Node.js runtime (Prisma no va en edge) y desactiva cache
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Reutiliza Prisma en dev para evitar múltiples instancias
const globalForPrisma = globalThis as unknown as { __prisma?: PrismaClient };
const prisma = globalForPrisma.__prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.__prisma = prisma;

// ---------- GET: roles, permisos, usuarios y rolePerms ----------
export async function GET(_req: NextRequest) {
  try {
    // Permiso de lectura del módulo admin
    await requirePerm("admin.view");

    const [roles, permissions, users, rolePerms] = await Promise.all([
      prisma.role.findMany({ orderBy: { name: "asc" } }),
      prisma.permission.findMany({ orderBy: { code: "asc" } }),
      prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          roles: { include: { role: true } }, // user.roles[] + role
        },
        orderBy: { email: "asc" },
      }),
      prisma.rolePermission.findMany({
        select: { roleId: true, permCode: true },
      }),
    ]);

    return NextResponse.json({ roles, permissions, users, rolePerms });
  } catch (e: any) {
    if (e?.code === "FORBIDDEN" || e?.name === "ForbiddenError") {
      return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ ok: false, error: e?.message ?? "GET RBAC error" }, { status: 500 });
  }
}

// ---------- POST: mutaciones RBAC via { action, ... } ----------
export async function POST(req: NextRequest) {
  try {
    // Permiso de gestión del módulo admin
    await requirePerm("admin.manage");

    let body: any;
    try {
      body = await req.json();
    } catch {
      return bad("Body JSON inválido", 400);
    }

    const action = String(body?.action || "");

    switch (action) {
      // ---- Roles ----
      case "createRole": {
        const name = String(body?.name || "").trim();
        if (!name) return bad("Falta 'name'");
        const role = await prisma.role.create({ data: { name, isSystem: false } });
        return ok({ role });
      }

      case "deleteRole": {
        const roleId = String(body?.roleId || "");
        if (!roleId) return bad("Falta 'roleId'");

        const role = await prisma.role.findUnique({ where: { id: roleId } });
        if (!role) return bad("Rol no encontrado", 404);
        if (role.isSystem) return bad("No se puede eliminar un rol del sistema", 400);

        await prisma.rolePermission.deleteMany({ where: { roleId } });
        await prisma.userRole.deleteMany({ where: { roleId } });
        await prisma.role.delete({ where: { id: roleId } });
        return ok();
      }

      // ---- Permisos ----
      case "addPermission": {
        const code = String(body?.code || "").trim();
        if (!code) return bad("Falta 'code'");
        const permission = await prisma.permission.upsert({
          where: { code },
          update: {},
          create: { code },
        });
        return ok({ permission });
      }

      case "deletePermission": {
        const code = String(body?.code || "").trim();
        if (!code) return bad("Falta 'code'");
        await prisma.rolePermission.deleteMany({ where: { permCode: code } });
        await prisma.permission.deleteMany({ where: { code } });
        return ok();
      }

      // ---- Asignación de roles a usuarios ----
      case "assignRole": {
        const email = String(body?.email || "").trim().toLowerCase();
        const roleId = String(body?.roleId || "").trim();
        if (!email || !roleId) return bad("Faltan 'email' o 'roleId'");

        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) user = await prisma.user.create({ data: { email } });

        // Requiere @@unique([userId, roleId]) en UserRole
        await prisma.userRole.upsert({
          where: { userId_roleId: { userId: user.id, roleId } },
          update: {},
          create: { userId: user.id, roleId },
        });
        return ok();
      }

      case "removeUserRole": {
        const email = String(body?.email || "").trim().toLowerCase();
        const roleId = String(body?.roleId || "").trim();
        if (!email || !roleId) return bad("Faltan 'email' o 'roleId'");

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return bad("Usuario no encontrado", 404);

        await prisma.userRole.deleteMany({ where: { userId: user.id, roleId } });
        return ok();
      }

      // ---- Toggles de permisos por rol ----
      case "grantPerm": {
        const roleId = String(body?.roleId || "").trim();
        const code = String(body?.code || "").trim();
        if (!roleId || !code) return bad("Faltan 'roleId' o 'code'");

        // Asegura que el permiso existe
        await prisma.permission.upsert({
          where: { code },
          update: {},
          create: { code },
        });

        // Requiere @@unique([roleId, permCode]) en RolePermission
        await prisma.rolePermission.upsert({
          where: { roleId_permCode: { roleId, permCode: code } },
          update: {},
          create: { roleId, permCode: code },
        });
        return ok();
      }

      case "revokePerm": {
        const roleId = String(body?.roleId || "").trim();
        const code = String(body?.code || "").trim();
        if (!roleId || !code) return bad("Faltan 'roleId' o 'code'");

        await prisma.rolePermission.deleteMany({ where: { roleId, permCode: code } });
        return ok();
      }

      default:
        return bad(`Acción no soportada: '${action}'`, 400);
    }
  } catch (e: any) {
    if (e?.code === "FORBIDDEN" || e?.name === "ForbiddenError") {
      return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ ok: false, error: e?.message ?? "POST RBAC error" }, { status: 500 });
  }
}

// ---------- helpers ----------
function ok(data: any = {}) {
  return NextResponse.json({ ok: true, ...data });
}
function bad(msg: string, status = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status });
}
