import { NextResponse } from "next/server";

export async function GET() {
  const raw = process.env.DATABASE_URL ?? "";
  const trimmed = raw.trim();

  const startsWithPostgres = /^postgres(ql)?:\/\//.test(trimmed);
  const hasQuotes = /^['"]/.test(trimmed) || /['"]$/.test(trimmed);
  const uses6543 = /:6543\//.test(trimmed);
  const hasPgbouncer = /pgbouncer=true/.test(trimmed);
  const hasSsl = /sslmode=/.test(trimmed);
  const looksSupabaseHost = /\.supabase\.co/.test(trimmed);
  const hasAtSign = /@/.test(trimmed);

  const sampleStart = trimmed.slice(0, 16);
  const sampleEnd = trimmed.slice(-6);
  const length = trimmed.length;

  return NextResponse.json({
    ok: Boolean(trimmed),
    startsWithPostgres,
    hasQuotes,
    uses6543,
    hasPgbouncer,
    hasSsl,
    looksSupabaseHost,
    hasAtSign,
    length,
    sampleStart,
    sampleEnd,
    hint: "Debe comenzar con postgresql:// y usar puerto 6543 + pgbouncer=true&connection_limit=1&sslmode=require"
  });
}
