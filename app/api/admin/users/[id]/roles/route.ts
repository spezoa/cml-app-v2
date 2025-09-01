import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requirePerm } from "@/utils/authz";

export async function GET(_req: NextRequest, { params }: { params: { id: string }}) {
  await requirePerm("admin.rbac.manage");
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: { roles: { include: { role: true } } }
  });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const roles = await prisma.role.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name },
    userRoleIds: user.roles.map(r => r.roleId),
    roles
  });
}

export async function POST(req: NextRequest, { params }: { params: { id: string }}) {
  await requirePerm("admin.rbac.manage");
  const { roleId } = await req.json();
  if (!roleId) return NextResponse.json({ error: "roleId required" }, { status: 400 });
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: params.id, roleId } },
    update: {},
    create: { userId: params.id, roleId }
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {
  await requirePerm("admin.rbac.manage");
  const { roleId } = await req.json();
  if (!roleId) return NextResponse.json({ error: "roleId required" }, { status: 400 });
  await prisma.userRole.delete({
    where: { userId_roleId: { userId: params.id, roleId } }
  });
  return NextResponse.json({ ok: true });
}