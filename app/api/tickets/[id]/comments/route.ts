import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requirePerm } from "@/utils/authz";

export async function POST(req: Request, { params }: { params: { id: string }}) {
  const { user } = await requirePerm("tickets.comment");
  const { body } = await req.json();
  const comment = await prisma.ticketComment.create({
    data: { ticketId: params.id, authorId: user.id, body }
  });
  return NextResponse.json({ comment }, { status: 201 });
}
