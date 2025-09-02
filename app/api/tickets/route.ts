import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const includeDeleted = url.searchParams.get("includeDeleted") === "1";
  const where = includeDeleted ? {} : { deletedAt: null as any };
  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: { openedAt: "desc" },
    take: 200,
  });
  return NextResponse.json(tickets);
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }
    const body = await req.json().catch(() => ({} as any));
    const title = String(body.title || "").trim() || "Nuevo ticket";
    const priorityRaw = String(body.priority || "P3").toUpperCase();
    const description = body.description ? String(body.description) : null;

    const allowed = new Set(["P1","P2","P3","P4"]);
    const priority = (allowed.has(priorityRaw) ? priorityRaw : "P3") as any;

    const user = await prisma.user.upsert({
      where: { email: session.user.email! },
      update: { name: session.user.name ?? undefined },
      create: { email: session.user.email!, name: session.user.name ?? null },
    });

    const count = await prisma.ticket.count();
    const code = `TCK-${new Date().getFullYear()}-${String(count + 1).padStart(6, "0")}`;

    const created = await prisma.ticket.create({
      data: { code, title, priority, description, openedById: user.id },
    });

    await prisma.ticketEvent.create({
      data: {
        ticketId: created.id,
        actorId: user.id,
        type: "CREATED",
        payload: { title, priority, description },
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    console.error("[/api/tickets] create error", err?.message || err);
    return NextResponse.json({ error: "No se pudo crear el ticket" }, { status: 500 });
  }
}