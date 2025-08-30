import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requirePerm } from "@/utils/authz";

export async function GET(req: Request) {
  await requirePerm("tickets.view");
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;
  const q = searchParams.get("q") || undefined;

  const tickets = await prisma.ticket.findMany({
    where: {
      status: status as any || undefined,
      OR: q ? [
        { title: { contains: q, mode: "insensitive" } },
        { code: { contains: q, mode: "insensitive" } },
      ] : undefined
    },
    orderBy: { openedAt: "desc" },
    take: 50,
    include: { asset: true, subsystem: true }
  });
  return NextResponse.json({ tickets });
}

export async function POST(req: Request) {
  const { user } = await requirePerm("tickets.create");
  const data = await req.json();
  const code = "T-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const created = await prisma.ticket.create({
    data: {
      code,
      title: data.title,
      description: data.description ?? null,
      assetId: data.assetId ?? null,
      subsystemId: data.subsystemId ?? null,
      category: data.category ?? null,
      system: data.system ?? null,
      priority: (data.priority ?? "P3"),
      status: "NEW",
      openedById: user.id
    }
  });
  return NextResponse.json({ ticket: created }, { status: 201 });
}
