import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requirePerm } from "@/utils/authz";

export async function GET(req: Request) {
  await requirePerm("ticket.view");
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;
  const priority = searchParams.get("priority") || undefined;
  const q = searchParams.get("q") || undefined;

  const where: any = {};
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (q) where.OR = [{ title: { contains: q, mode: "insensitive" } }, { code: { contains: q, mode: "insensitive" } }];

  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: { openedAt: "desc" },
    take: 200,
    select: {
      id: true, code: true, title: true, priority: true, status: true,
      openedAt: true, firstResponseAt: true, resolvedAt: true,
      slaResponseMinutes: true, slaResolutionMinutes: true,
    }
  });
  return NextResponse.json({ tickets });
}

export async function POST(req: Request) {
  const { user } = await requirePerm("ticket.create");
  const data = await req.json();
  const count = await prisma.ticket.count();
  const code = `TCK-${new Date().getFullYear()}-${String(count + 1).padStart(6, "0")}`;
  const created = await prisma.ticket.create({
    data: {
      code,
      title: data.title ?? "Nuevo Ticket",
      description: data.description ?? null,
      priority: data.priority ?? "P3",
      openedById: user.id
    }
  });
  return NextResponse.json({ ticket: created }, { status: 201 });
}