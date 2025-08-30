import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requirePerm } from "@/utils/authz";
import { ForbiddenError } from "@/utils/errors";

export async function POST(req: Request) {
  try {
    await requirePerm("admin.rbac.manage");
    const { roleId, prefix, allow } = await req.json();
    if (!roleId || !prefix || typeof allow !== "boolean") {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const perms = await prisma.permission.findMany({
      where: { code: { startsWith: prefix } },
      select: { code: true },
    });

    await prisma.$transaction(
      perms.map((p) =>
        prisma.rolePermission.upsert({
          where: { roleId_permCode: { roleId, permCode: p.code } },
          update: { allow },
          create: { roleId, permCode: p.code, allow },
        })
      )
    );

    return NextResponse.json({ ok: true, updated: perms.length });
  } catch (e) {
    if (e instanceof ForbiddenError) {
      return NextResponse.json({ error: e.message }, { status: 403 });
    }
    console.error("POST /api/admin/rbac/bulk error:", e);
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
