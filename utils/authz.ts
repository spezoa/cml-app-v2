import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ForbiddenError } from "@/utils/errors";
import type { Session } from "next-auth";

export async function requireUser() {
  let session: Session | null = null;
  try {
    session = await getServerSession(authOptions);
  } catch (err) {
    console.error("getServerSession failed:", err);
  }
  const email = session?.user?.email;
  if (!email) throw new ForbiddenError("AUTH_REQUIRED");
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ForbiddenError("USER_NOT_REGISTERED");
  return user;
}

export async function requirePerm(needed: string) {
  const user = await requireUser();
  // get permissions
  const roles = await prisma.userRole.findMany({
    where: { userId: user.id },
    include: { role: { include: { perms: true } } },
  });
  const set = new Set<string>();
  for (const r of roles) for (const p of r.role.perms) if (p.allow) set.add(p.permCode);
  // wildcard logic
  if (set.has("*") || set.has(needed)) return { user, perms: Array.from(set) };
  for (const p of set) {
    if (p.endsWith(".*")) {
      const prefix = p.slice(0, -2);
      if (needed === prefix || needed.startsWith(prefix + ".")) return { user, perms: Array.from(set) };
    }
  }
  throw new ForbiddenError(`PERM:${needed}`);
}
