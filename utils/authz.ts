import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getUserPermissions, can } from "@/lib/rbac";
import { ForbiddenError } from "@/utils/errors";

export async function requireUser() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) throw new ForbiddenError("AUTH_REQUIRED");
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ForbiddenError("USER_NOT_REGISTERED");
  return user;
}

export async function requirePerm(needed: string) {
  const user = await requireUser();
  const perms = await getUserPermissions(user.id);
  if (!can(perms, needed)) throw new ForbiddenError(`PERM:${needed}`);
  return { user, perms };
}
