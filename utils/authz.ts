import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getUserPermissions, can } from "@/lib/rbac";

export async function requireUser() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    throw new Error("No autenticado");
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Usuario no registrado en BD");
  }
  return user;
}

export async function requirePerm(needed: string) {
  const user = await requireUser();
  const perms = await getUserPermissions(user.id);
  if (!can(perms, needed)) {
    throw new Error(`Permiso insuficiente: se requiere ${needed}`);
  }
  return { user, perms };
}
