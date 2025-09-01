import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID || "common",
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Propaga tokens de Azure (si existen)
      const at = (account as any)?.access_token;
      const idt = (account as any)?.id_token;
      if (at) (token as any).accessToken = at;
      if (idt) (token as any).idToken = idt;

      // Propaga email si viene en el perfil
      const email = (profile as any)?.email || (profile as any)?.upn || (profile as any)?.preferred_username;
      if (email) token.email = email;

      return token;
    },
    async session({ session, token }) {
      // Adjunta tokens a la sesión (útil p/ Graph)
      (session as any).accessToken = (token as any).accessToken;
      (session as any).idToken = (token as any).idToken;

      // Asegura email de usuario
      if (token?.email && session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
    async signIn({ profile, account }) {
      // Filtro por dominio permitido (opcional)
      const email = (profile as any)?.email || (profile as any)?.upn || (profile as any)?.preferred_username;
      const domains = (process.env.ALLOWED_EMAIL_DOMAINS || "")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      if (domains.length && email) {
        const ok = domains.some((d) => email.toLowerCase().endsWith("@" + d) || email.toLowerCase().endsWith(d));
        if (!ok) return false;
      }

      // Filtro por tenant permitido (opcional)
      const allowedTenant = process.env.AZURE_ALLOWED_TENANT || process.env.AZURE_AD_TENANT_ID;
      try {
        const idt = (account as any)?.id_token;
        if (allowedTenant && idt && allowedTenant !== "common") {
          const payload = JSON.parse(Buffer.from(String(idt).split(".")[1], "base64").toString("utf-8"));
          const tid = payload?.tid;
          if (tid && tid !== allowedTenant) return false;
        }
      } catch {
        // Ignorar parsing errors: no bloquea el sign in
      }
      return true;
    },
  },
};