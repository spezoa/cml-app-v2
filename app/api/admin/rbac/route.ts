import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const roles = await prisma.role.findMany({ include: { perms: true }, orderBy: { name: "asc" } });
  const perms = await prisma.permission.findMany({ orderBy: { code: "asc" } });
  return NextResponse.json({ roles, perms });
}

export async function POST(req: Request) {
  const { roleId, permCode, allow } = await req.json();
  await prisma.rolePermission.upsert({
    where: { roleId_permCode: { roleId, permCode } },
    update: { allow },
    create: { roleId, permCode, allow }
  });
  return NextResponse.json({ ok: true });
}
