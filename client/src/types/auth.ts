import { Session } from "next-auth";

export interface JWTToken {
  id: string;
  email: string;
  companyName: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  error?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  companyName: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
}

export interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    companyName: string;
  };
  accessToken?: string;
  error?: string;
}
