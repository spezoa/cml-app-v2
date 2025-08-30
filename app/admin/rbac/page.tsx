export const dynamic = 'force-dynamic';
import { requirePerm } from "@/utils/authz";
import NextDynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { ForbiddenError } from "@/utils/errors";

const RbacClient = NextDynamic(() => import("@/components/admin/RbacClient"), { ssr: false });

export default async function RBACPage() {
  try {
    await requirePerm("admin.rbac.manage");
  } catch (e) {
    if (e instanceof ForbiddenError) redirect("/403");
    throw e;
  }
  return <RbacClient />;
}
