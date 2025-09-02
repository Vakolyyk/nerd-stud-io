"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { CustomSession } from "@/types/auth";

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Handle refresh token failure
    if ((session as CustomSession)?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/login" });
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  if ((session as CustomSession)?.error === "RefreshAccessTokenError") {
    return (
      <div className="text-center mt-8">
        Session expired. Redirecting to login...
      </div>
    );
  }

  return children;
};

export default AuthGuard;
