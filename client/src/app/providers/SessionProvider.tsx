"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

type SessionProviderProps = {
  children: React.ReactNode;
};
const SessionProvider = ({ children }: SessionProviderProps) => (
  <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
);

export default SessionProvider;
