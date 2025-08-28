# Taller de Bomberos — Starter v100.2 (sin ARFF)
Stack: Next.js (App Router) + TypeScript + Tailwind + NextAuth (Office 365 / Microsoft Entra ID) + Prisma/PostgreSQL.

## Requisitos
- Node 18+
- PostgreSQL 13+
- (Opcional) pnpm

## Configuración rápida
1) Copia `.env.example` a `.env` y completa:
   - `DATABASE_URL` (PostgreSQL de Supabase, Railway, Neon, etc.)
   - `AZURE_AD_CLIENT_ID`, `AZURE_AD_CLIENT_SECRET`, `AZURE_AD_TENANT_ID`
2) Instala dependencias y prepara BD:
   ```bash
   npm i
   npx prisma migrate dev --name init
   npx prisma db seed
   npm run dev
   ```
3) Abre `http://localhost:3000`

## Módulos incluidos
- **SSO Office 365** (Microsoft Entra ID) vía NextAuth/Azure AD.
- **Management Console /admin**: RBAC (roles/permisos por prefijo), Settings (placeholder).
- **Tickets**: listado + creación simple; API básica.
- **Modelo Prisma**: usuarios, roles, permisos, activos, subsistemas, tickets, WO, mangueras, escalas, auditoría.
