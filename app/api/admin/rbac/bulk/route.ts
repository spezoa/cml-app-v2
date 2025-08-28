import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { roleId, prefix, allow } = await req.json();
  const perms = await prisma.permission.findMany({ where: { code: { startsWith: prefix } } });
  for (const p of perms) {
    await prisma.rolePermission.upsert({
      where: { roleId_permCode: { roleId, permCode: p.code } },
      update: { allow },
      create: { roleId, permCode: p.code, allow }
    });
  }
  return NextResponse.json({ ok: true, count: perms.length });
}
