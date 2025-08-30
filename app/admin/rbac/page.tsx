import { requirePerm } from "@/utils/authz";
import dynamic from "next/dynamic";

const RbacClient = dynamic(() => import("@/components/admin/RbacClient"), { ssr: false });

export default async function RBACPage() {
  await requirePerm("admin.rbac.manage");
  return <RbacClient />;
}
