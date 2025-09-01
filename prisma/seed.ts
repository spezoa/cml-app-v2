import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const PERMS = [
  'ticket.view', 'ticket.create', 'ticket.update', 'ticket.comment', 'ticket.close', 'ticket.*',
  'wo.view', 'wo.create', 'wo.update', 'wo.close', 'wo.*',
  'assets.view', 'assets.edit',
  'admin.view', 'admin.rbac.manage', 'admin.settings.manage', 'admin.*',
  'reports.view',
];

async function main() {
  // Permisos
  for (const code of PERMS) {
    await prisma.permission.upsert({ where: { code }, update: {}, create: { code } });
  }

  // Roles
  const superuser = await prisma.role.upsert({
    where: { name: 'Superuser' },
    update: {},
    create: { name: 'Superuser', isSystem: true },
  });
  const technician = await prisma.role.upsert({
    where: { name: 'Technician' },
    update: {},
    create: { name: 'Technician' },
  });
  const supervisor = await prisma.role.upsert({
    where: { name: 'Supervisor' },
    update: {},
    create: { name: 'Supervisor' },
  });

  // Permisos por rol
  const superPerms = ['*'];
  for (const code of superPerms) {
    await prisma.rolePermission.upsert({
      where: { roleId_permCode: { roleId: superuser.id, permCode: code } },
      update: { allow: true },
      create: { roleId: superuser.id, permCode: code, allow: true },
    });
  }
  const techPerms = ['ticket.*', 'assets.view'];
  for (const code of techPerms) {
    await prisma.rolePermission.upsert({
      where: { roleId_permCode: { roleId: technician.id, permCode: code } },
      update: { allow: true },
      create: { roleId: technician.id, permCode: code, allow: true },
    });
  }
  const supPerms = ['ticket.*', 'wo.*', 'assets.view', 'reports.view'];
  for (const code of supPerms) {
    await prisma.rolePermission.upsert({
      where: { roleId_permCode: { roleId: supervisor.id, permCode: code } },
      update: { allow: true },
      create: { roleId: supervisor.id, permCode: code, allow: true },
    });
  }

  // Admin inicial (opcional)
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const user = await prisma.user.upsert({
    where: { email },
    update: { name: 'Admin' },
    create: { email, name: 'Admin' },
  });
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: user.id, roleId: superuser.id } },
    update: {},
    create: { userId: user.id, roleId: superuser.id },
  });
}

main().finally(() => prisma.$disconnect());
