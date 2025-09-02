import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { AuthUser, CustomSession, JWTToken } from "@/types/auth";
import { authenticateUser, refreshAccessToken } from "@/lib/auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const authResult = await authenticateUser(
          credentials.email,
          credentials.password,
        );
        if (!authResult) return null;

        return {
          id: authResult.user.id,
          email: authResult.user.email,
          companyName: authResult.user.companyName,
          accessToken: authResult.accessToken,
          refreshToken: authResult.refreshToken,
          accessTokenExpires: Date.now() + 30 * 60 * 1000, // Наприклад 30 хвилин
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      const u = user as AuthUser;
      const t = token as unknown as JWTToken;
      if (user) {
        return {
          ...token,
          id: u.id,
          email: u.email,
          companyName: u.companyName,
          accessToken: u.accessToken,
          refreshToken: u.refreshToken,
          accessTokenExpires: u.accessTokenExpires,
        };
      }

      if (Date.now() < t.accessTokenExpires) {
        return t;
      }

      return await refreshAccessToken(t);
    },

    async session({ session, token }) {
      const s = session as CustomSession;
      const t = token as unknown as JWTToken;
      s.user.id = t.id;
      s.user.email = t.email;
      s.user.companyName = t.companyName;
      s.accessToken = t.accessToken;
      s.error = t.error;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
