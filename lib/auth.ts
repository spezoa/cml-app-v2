import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID ?? "common",
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Guardamos el access_token si viene del proveedor
      const at = (account as any)?.access_token;
      if (at) (token as any).access_token = at;

      // Guardamos email (si viene del perfil o ya estaba en el token)
      const email = (profile as any)?.email ?? (token as any)?.email;
      if (email) (token as any).email = String(email);

      return token;
    },
    async session({ session, token }) {
      // Pasar access_token al objeto de sesión
      (session as any).access_token = (token as any)?.access_token;

      // Proteger session.user y setear email si existe
      const email = (token as any)?.email;
      if (email) {
        (session as any).user = (session as any).user ?? {};
        (session as any).user.email = String(email);
      }

      return session;
    },
  },
};
