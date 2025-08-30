import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requirePerm } from "@/utils/authz";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    await requirePerm("admin.manage");

    const payload = await req.json();
    const roles: Array<{ name: string; isSystem?: boolean }> = payload?.roles ?? [];
    const permissions: string[] = payload?.permissions ?? payload?.perms ?? [];
    const assign: Array<{ email: string; role: string }> = payload?.assign ?? [];

    // 1) Roles
    for (const r of roles) {
      const name = String(r?.name || "").trim();
      if (!name) continue;
      await prisma.role.upsert({
        where: { name },
        update: { isSystem: !!r.isSystem },
        create: { name, isSystem: !!r.isSystem },
      });
    }

    // 2) Permisos
    for (const codeRaw of permissions) {
      const code = String(codeRaw || "").trim();
      if (!code) continue;
      await prisma.permission.upsert({
        where: { code },
        update: {},
        create: { code },
      });
    }

    // 3) Asignaciones email→rol
    for (const a of assign) {
      const email = String(a?.email || "").trim().toLowerCase();
      const roleName = String(a?.role || "").trim();
      if (!email || !roleName) continue;

      const role = await prisma.role.findUnique({ where: { name: roleName } });
      if (!role) continue;

      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) user = await prisma.user.create({ data: { email } });

      await prisma.userRole.upsert({
        where: {
          userId_roleId: { userId: user.id, roleId: role.id },
        },
        update: {},
        create: { userId: user.id, roleId: role.id },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "RBAC bulk error" }, { status: 500 });
  }
}
