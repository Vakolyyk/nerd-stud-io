import axios from "axios";

type AuthenticateUser = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    companyName: string;
  };
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export const authenticateUser = async (
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

export const refreshAccessToken = async (token: any) => {
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
