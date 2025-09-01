import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const tickets = await prisma.ticket.findMany({ orderBy: { openedAt: "desc" }, take: 100 });
  return NextResponse.json(tickets);
}

export async function POST(req: Request) {
  const data = await req.json();
  const count = await prisma.ticket.count();
  const code = `TCK-${new Date().getFullYear()}-${String(count+1).padStart(6,"0")}`;
  const openedBy = await prisma.user.findFirst();
  const created = await prisma.ticket.create({
    data: { code, title: data.title ?? "Nuevo Ticket", priority: data.priority ?? "P3", openedById: openedBy?.id! }
  });
  return NextResponse.json(created);
}
