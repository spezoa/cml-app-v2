import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requirePerm } from "@/utils/authz";

export async function GET(_req: Request, { params }: { params: { id: string }}) {
  await requirePerm("tickets.view");
  const ticket = await prisma.ticket.findUnique({
    where: { id: params.id },
    include: { comments: { include: { author: true }, orderBy: { createdAt: "asc" } }, asset: true, subsystem: true }
  });
  if (!ticket) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ticket });
}

export async function PUT(req: Request, { params }: { params: { id: string }}) {
  await requirePerm("tickets.update");
  const data = await req.json();
  const updated = await prisma.ticket.update({
    where: { id: params.id },
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      assigneeId: data.assigneeId
    }
  });
  return NextResponse.json({ ticket: updated });
}
