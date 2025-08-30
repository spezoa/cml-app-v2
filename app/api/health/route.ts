import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const now = await prisma.$queryRaw<any>`select now()`;
    return NextResponse.json({ ok: true, db: "up", now });
  } catch (e: any) {
    console.error("Health error:", e);
    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}
