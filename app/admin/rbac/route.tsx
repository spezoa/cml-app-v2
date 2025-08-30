import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requirePerm } from "@/utils/authz";

const prisma = new PrismaClient();

// GET: devuelve roles, permisos y usuarios (con roles)
export async function GET() {
  try {
    await requirePerm("admin.view"); // Ajusta si usas otro permiso
    const [roles, permissions, users] = await Promise.all([
      prisma.role.findMany({ orderBy: { name: "asc" } }),
      prisma.permission.findMany({ orderBy: { code: "asc" } }),
      prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          roles: { include: { role: true } }, // user.roles[] con role adentro
        },
        orderBy: { email: "asc" },
      }),
    ]);

    return NextResponse.json({ roles, permissions, users });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "GET RBAC error" }, { status: 500 });
  }
}

// POST: acciones RBAC {action: "...", ...payload}
export async function POST(req: NextRequest) {
  try {
    // Para mutaciones, pedimos permiso de gestión
    await requirePerm("admin.manage"); // o "admin.view" si quieres ser permisivo

    const body = await req.json();
    const action = String(body?.action || "");

    switch (action) {
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

      case "addPermission": {
        const code = String(body?.code || "").trim();
        if (!code) return bad("Falta 'code'");
        // Crea si no existe
        const perm = await prisma.permission.upsert({
          where: { code },
          update: {},
          create: { code },
        });
        return ok({ permission: perm });
      }

      case "deletePermission": {
        const code = String(body?.code || "");
        if (!code) return bad("Falta 'code'");
        await prisma.rolePermission.deleteMany({ where: { permCode: code } });
        await prisma.permission.deleteMany({ where: { code } });
        return ok();
      }

      case "assignRole": {
        const email = String(body?.email || "").trim().toLowerCase();
        const roleId = String(body?.roleId || "");
        if (!email || !roleId) return bad("Faltan 'email' o 'roleId'");

        // Asegura usuario
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) user = await prisma.user.create({ data: { email } });

        // Asigna (evita duplicados)
        await prisma.userRole.upsert({
          where: {
            userId_roleId: { userId: user.id, roleId }, // requiere @@unique([userId, roleId]) en el modelo
          },
          update: {},
          create: { userId: user.id, roleId },
        });

        return ok();
      }

      case "removeUserRole": {
        const email = String(body?.email || "").trim().toLowerCase();
        const roleId = String(body?.roleId || "");
        if (!email || !roleId) return bad("Faltan 'email' o 'roleId'");

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return bad("Usuario no encontrado", 404);

        // Borra por compuesto (si no tienes unique, usa deleteMany)
        await prisma.userRole.deleteMany({
          where: { userId: user.id, roleId },
        });

        return ok();
      }

      default:
        return bad(`Acción no soportada: '${action}'`, 400);
    }
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "POST RBAC error" }, { status: 500 });
  }
}

function ok(data: any = {}) {
  return NextResponse.json({ ok: true, ...data });
}
function bad(msg: string, status = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status });
}
