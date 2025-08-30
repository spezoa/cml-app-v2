import AzureADProvider from "next-auth/providers/azure-ad";
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: { params: { prompt: "login", scope: "openid profile email" } },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "azure-ad") {
        // ensure email casing
        if (token.email) token.email = String(token.email).toLowerCase();
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).access_token = (token as any).access_token;
      if (token.email && session.user) session.user.email = String(token.email);
      return session;
    },
  }
};
