import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PERMS = [
  "ticket.view","ticket.create","ticket.assign","ticket.comment","ticket.close","ticket.*",
  "wo.view","wo.create","wo.update","wo.close","wo.*",
  "assets.view","assets.edit",
  "admin.view","admin.rbac.manage","admin.settings.manage","admin.templates.manage","admin.sla.manage","admin.*",
  "reports.view"
];

async function main() {
  for (const code of PERMS) {
    await prisma.permission.upsert({ where: { code }, update: {}, create: { code } });
  }
  const superuser = await prisma.role.upsert({ where: { name: "Superuser" }, update: {}, create: { name: "Superuser", isSystem: true } });
  for (const code of PERMS) {
    await prisma.rolePermission.upsert({
      where: { roleId_permCode: { roleId: superuser.id, permCode: code } },
      update: { allow: true },
      create: { roleId: superuser.id, permCode: code, allow: true }
    });
  }
  const technician = await prisma.role.upsert({ where: { name: "Technician" }, update: {}, create: { name: "Technician" } });
  const supervisor = await prisma.role.upsert({ where: { name: "Supervisor" }, update: {}, create: { name: "Supervisor" } });

  const techPerms = ["ticket.view","ticket.create","ticket.comment","wo.view","wo.create","assets.view","reports.view"];
  for (const code of techPerms) {
    await prisma.rolePermission.upsert({
      where: { roleId_permCode: { roleId: technician.id, permCode: code } },
      update: { allow: true },
      create: { roleId: technician.id, permCode: code, allow: true }
    });
  }
  const supPerms = ["ticket.*","wo.*","assets.view","reports.view"];
  for (const code of supPerms) {
    await prisma.rolePermission.upsert({
      where: { roleId_permCode: { roleId: supervisor.id, permCode: code } },
      update: { allow: true },
      create: { roleId: supervisor.id, permCode: code, allow: true }
    });
  }
  const email = "admin@example.com";
  const user = await prisma.user.upsert({ where: { email }, update: {}, create: { email, name: "Admin" } });
  await prisma.userRole.upsert({ where: { userId_roleId: { userId: user.id, roleId: superuser.id } }, update: {}, create: { userId: user.id, roleId: superuser.id } });
  console.log("Seed completed");
}
main().finally(() => prisma.$disconnect());
