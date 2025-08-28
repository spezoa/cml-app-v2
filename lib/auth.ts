import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID ?? "common"
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) token.access_token = account.access_token;
      if (profile && typeof (profile as any).email === "string") token.email = (profile as any).email;
      return token;
    },
    async session({ session, token }) {
      (session as any).access_token = token.access_token;
      if (token.email) session.user.email = String(token.email);
      return session;
    }
  }
};
