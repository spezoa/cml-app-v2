import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requirePerm } from "@/utils/authz";
import { log } from "@/utils/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  await requirePerm("reports.view"); // o admin.view

  const now = new Date();
  const since24h = new Date(now.getTime() - 24*60*60*1000);

  const [
    total,
    open,
    new24h,
    avgResp,
    avgReso,
  ] = await Promise.all([
    prisma.ticket.count(),
    prisma.ticket.count({ where: { status: { in: ["NEW","TRIAGED","IN_PROGRESS","ON_HOLD"] } } }),
    prisma.ticket.count({ where: { openedAt: { gte: since24h } } }),
    prisma.ticket.aggregate({
      _avg: { slaResponseMinutes: true },
      where: { slaResponseMinutes: { not: null } },
    }),
    prisma.ticket.aggregate({
      _avg: { slaResolutionMinutes: true },
      where: { slaResolutionMinutes: { not: null } },
    }),
  ]);

  const payload = {
    ts: now.toISOString(),
    tickets: { total, open, new24h },
    sla: {
      avgResponseMinutes: avgResp._avg.slaResponseMinutes ?? null,
      avgResolutionMinutes: avgReso._avg.slaResolutionMinutes ?? null,
    },
  };

  log.info("metrics_served", payload);
  return NextResponse.json(payload);
}