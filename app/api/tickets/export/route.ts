import { prisma } from "@/lib/db";

function toCSV(rows: any[]) {
  if (!rows.length) return "code,title,priority,status,openedAt,openedBy\n";
  const headers = ["code","title","priority","status","openedAt","openedBy"];
  const escape = (v: any) => {
    if (v == null) return "";
    const s = String(v);
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g,'""') + '"';
    return s;
  };
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push([
      escape(r.code),
      escape(r.title),
      escape(r.priority),
      escape(r.status),
      escape(new Date(r.openedAt).toISOString()),
      escape(r.openedBy?.email || r.openedById)
    ].join(","));
  }
  return lines.join("\n");
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const includeDeleted = url.searchParams.get("includeDeleted") === "1";
  const where = includeDeleted ? {} : { deletedAt: null as any };
  const rows = await prisma.ticket.findMany({
    where,
    orderBy: { openedAt: "desc" },
    include: { openedBy: true },
    take: 1000,
  });
  const csv = toCSV(rows);
  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="tickets-export.csv"`,
    },
  });
}