import axios from "axios";
import NextAuth, { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

type AuthenticateUser = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    companyName: string;
  };
};

interface JWTToken {
  id: string;
  email: string;
  companyName: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  error?: string;
}

interface AuthUser {
  id: string;
  email: string;
  companyName: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
}

interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    companyName: string;
  };
  accessToken?: string;
  error?: string;
}

const authenticateUser = async (
  email: string,
  password: string,
): Promise<AuthenticateUser | null> => {
  try {
    const { data } = await axios.post<AuthenticateUser>(
      `${API_BASE_URL}/auth/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } },
    );

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Authentication error:",
        error.response?.data || error.message,
      );
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};

const refreshAccessToken = async (token: any) => {
  try {
    const { data } = await axios.post<{
      accessToken: string;
      refreshToken?: string;
      expiresIn: number;
    }>(
      `${API_BASE_URL}/auth/refresh`,
      { refreshToken: token.refreshToken },
      { headers: { "Content-Type": "application/json" } },
    );

    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken || token.refreshToken,
      accessTokenExpires: Date.now() + data.expiresIn * 1000,
    };
  } catch (error: any) {
    console.error("Refresh token error:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
};

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
