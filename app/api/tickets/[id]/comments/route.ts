import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { id: string }}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { body } = await req.json();

  const user = await prisma.user.upsert({
    where: { email: session.user.email! },
    update: { name: session.user.name ?? undefined },
    create: { email: session.user.email!, name: session.user.name ?? null },
  });

  const comment = await prisma.ticketComment.create({
    data: { ticketId: params.id, authorId: user.id, body }
  });

  await prisma.ticketEvent.create({
    data: {
      ticketId: params.id,
      actorId: user.id,
      type: "COMMENTED",
      payload: { bodyLength: String(body || '').length },
    },
  });

  return NextResponse.json({ comment }, { status: 201 });
}