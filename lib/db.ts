import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

function createClient() {
  const client = new PrismaClient();

  client.$use(async (params, next) => {
    const writeOps = new Set(["create", "update", "upsert", "delete", "deleteMany", "updateMany"]);
    const isWrite = writeOps.has(params.action);
    const model = params.model ?? undefined;

    const result = await next(params);

    if (isWrite && model && model !== "AuditLog") {
      try {
        const entityId: string | undefined =
          (result && typeof result === "object" && "id" in result) ? String((result as any).id) : undefined;
        await client.auditLog.create({
          data: {
            action: `${model}.${params.action}`,
            entity: model,
            entityId,
            meta: params.args ? params.args as any : undefined,
          }
        });
      } catch {}
    }
    return result;
  });

  return client;
}

export const prisma = global.prisma ?? createClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;
