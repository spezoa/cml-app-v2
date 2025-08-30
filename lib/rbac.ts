import { prisma } from "@/lib/db";

export async function getUserPermissions(userId: string): Promise<string[]> {
  const roles = await prisma.userRole.findMany({
    where: { userId },
    include: { role: { include: { perms: true } } },
  });
  const set = new Set<string>();
  for (const r of roles) {
    for (const p of r.role.perms) {
      if (p.allow) set.add(p.permCode);
    }
  }
  return Array.from(set);
}

/** Wildcards: '*' or 'prefix.*' cover all under that prefix. */
export function can(perms: Iterable<string>, needed: string): boolean {
  const set = new Set(perms);
  if (set.has("*") || set.has(needed)) return true;
  for (const p of set) {
    if (p.endsWith(".*")) {
      const prefix = p.slice(0, -2);
      if (needed === prefix || needed.startsWith(prefix + ".")) return true;
    }
  }
  return false;
}
