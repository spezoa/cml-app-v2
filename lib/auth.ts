import type { NextAuthOptions } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { prisma } from '@/lib/db';

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID ?? 'common',
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Propaga email si llega del proveedor
      const providerEmail =
        (profile as any)?.email ||
        (token as any)?.email ||
        (token as any)?.user?.email;
      if (providerEmail) (token as any).email = String(providerEmail);

      // Access token (por si más adelante llamas Graph)
      const at = (account as any)?.access_token;
      if (at) (token as any).access_token = at;

      // Adjunta userId al token si existe en BD
      if (providerEmail) {
        const user = await prisma.user.findUnique({ where: { email: String(providerEmail) } });
        if (user) (token as any).userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).access_token = (token as any)?.access_token;
      const email = (token as any)?.email;
      if (email) {
        (session as any).user = (session as any).user ?? {};
        (session as any).user.email = String(email);
      }
      const userId = (token as any)?.userId;
      if (userId) {
        (session as any).user.id = String(userId);
      }
      return session;
    },
  },
  events: {
    // Crea/actualiza usuario en la BD al iniciar sesión
    async signIn({ user }) {
      const email = user?.email ? String(user.email) : null;
      if (!email) return;
      await prisma.user.upsert({
        where: { email },
        update: { name: user?.name ?? null },
        create: { email, name: user?.name ?? null },
      });
    },
  },
};
