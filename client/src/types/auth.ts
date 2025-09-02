import { Session } from "next-auth";

export type JWTToken = {
  id: string;
  email: string;
  companyName: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  error?: string;
};

export type AuthUser = {
  id: string;
  email: string;
  companyName: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
};

export interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    companyName: string;
  };
  accessToken?: string;
  error?: string;
}

export type RegistrationStepOne = {
  companyName: string;
  legalCompanyAddress: string;
  companyType: string;
};

export type RegistrationStepTwo = {
  accessCode: string;
  password: string;
  phone: string;
  repeatPassword: string;
  sessionId: string;
  userEmail: string;
};

export type RegistrationStep1Response = {
  sessionId: string;
  message: string;
};

export type RegistrationStep2Response = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    companyName: string;
  };
};

export type ForgotPassword = {
  email: string;
};

export type ResetPassword = {
  password: string;
  repeatPassword: string;
  token: string;
};
