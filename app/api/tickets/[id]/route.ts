import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(_req: Request, { params }: { params: { id: string }}) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: params.id },
    include: {
      comments: { include: { author: true }, orderBy: { createdAt: "asc" } },
      asset: true,
      subsystem: true,
      events: { include: { actor: true }, orderBy: { createdAt: "desc" } }
    }
  });
  if (!ticket) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ticket });
}

export async function PATCH(req: Request, { params }: { params: { id: string }}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await req.json().catch(() => ({} as any));
  const allowed = new Set(["P1","P2","P3","P4"]);
  const data: any = {};
  if (typeof body.title === "string") data.title = body.title;
  if (typeof body.description === "string") data.description = body.description;
  if (typeof body.assigneeId === "string" || body.assigneeId === null) data.assigneeId = body.assigneeId;
  if (typeof body.status === "string") data.status = body.status;
  if (typeof body.priority === "string") data.priority = allowed.has(String(body.priority).toUpperCase()) ? String(body.priority).toUpperCase() : undefined;

  const updated = await prisma.ticket.update({ where: { id: params.id }, data });

  const actor = await prisma.user.upsert({
    where: { email: session.user.email! },
    update: { name: session.user.name ?? undefined },
    create: { email: session.user.email!, name: session.user.name ?? null },
  });

  await prisma.ticketEvent.create({
    data: {
      ticketId: params.id,
      actorId: actor?.id,
      type: "UPDATED",
      payload: data,
    },
  });

  return NextResponse.json({ ticket: updated });
}

export async function DELETE(_req: Request, { params }: { params: { id: string }}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const actor = await prisma.user.upsert({
    where: { email: session.user.email! },
    update: { name: session.user.name ?? undefined },
    create: { email: session.user.email!, name: session.user.name ?? null },
  });

  const deleted = await prisma.ticket.update({
    where: { id: params.id },
    data: { deletedAt: new Date() },
  });

  await prisma.ticketEvent.create({
    data: {
      ticketId: params.id,
      actorId: actor?.id,
      type: "DELETED",
      payload: {},
    },
  });

  return NextResponse.json({ ticket: deleted });
}