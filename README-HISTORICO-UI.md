
# Cambios combinados (Histórico + Soft Delete + Auditoría + UI)

Generado: 2025-09-02T02:12:23

## Instrucciones
1. Reemplaza archivos con este ZIP.
2. Ejecuta migraciones Prisma:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name audit_and_soft_delete
   # Producción:
   npx prisma migrate deploy
   ```
3. Despliega.

## UI
- En **/tickets**:
  - Checkbox **“Mostrar eliminados”** para incluir borrados lógicos.
  - Botón **“Exportar CSV”** (respeta el filtro).
  - Botón **“Nuevo ticket”**.
- En **/tickets/[id]**:
  - Tarjeta **“Historial”** con línea de tiempo (quién hizo qué y cuándo).

## API
- `GET /api/tickets?includeDeleted=1`
- `POST /api/tickets`
- `GET /api/tickets/:id` (incluye `events`)
- `PATCH /api/tickets/:id`
- `DELETE /api/tickets/:id` (soft delete)
- `POST /api/tickets/:id/comments`
- `GET /api/tickets/export`

## Notas importantes

- Revisa variables de entorno en Vercel:
  - `AZURE_AD_CLIENT_ID`, `AZURE_AD_CLIENT_SECRET`, `AZURE_AD_TENANT_ID`
  - (Opcional) `ALLOWED_EMAIL_DOMAINS` (ej: `miempresa.cl,otraempresa.com`)
  - (Opcional) `AZURE_ALLOWED_TENANT` (si quieres fijar un tenant)
- El build de Next 14 ya no requiere `import React` en cada archivo; si tu ESLint personal pide `react/react-in-jsx-scope`, desactívalo o usa el preset de `next`.
