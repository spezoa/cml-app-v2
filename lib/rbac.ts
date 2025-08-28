import { prisma } from "@/lib/db";
export async function getUserPermissions(userId: string) {
  const roles = await prisma.userRole.findMany({ where: { userId }, include: { role: { include: { perms: true } } } });
  const perms = new Set<string>();
  for (const r of roles) for (const rp of (r.role as any).perms) if (rp.allow) perms.add(rp.permCode);
  return [...perms];
}
export function can(perms: string[], needed: string) {
  if (perms.includes(needed)) return true;
  const parts = needed.split(".");
  for (let i = parts.length - 1; i >= 1; i--) {
    const pref = parts.slice(0, i).join(".");
    if (perms.includes(pref + ".*")) return true;
  }
  return false;
}
