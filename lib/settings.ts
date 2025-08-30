import { prisma } from "@/lib/db";

export async function getSetting(key: string) {
  const row = await prisma.setting.findUnique({ where: { key } });
  return row?.value ?? null;
}

export async function setSetting(key: string, value: string | null, userId?: string) {
  return prisma.setting.upsert({
    where: { key },
    update: { value, updatedById: userId ?? null },
    create: { key, value, updatedById: userId ?? null }
  });
}

export async function getSettings(keys: string[]) {
  const rows = await prisma.setting.findMany({ where: { key: { in: keys } } });
  const out: Record<string, string | null> = {};
  for (const k of keys) out[k] = rows.find(r => r.key === k)?.value ?? null;
  return out;
}
