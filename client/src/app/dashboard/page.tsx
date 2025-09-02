"use client";
import { signOut, useSession } from "next-auth/react";

import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { data: session } = useSession();

  const logout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <AuthGuard>
      <div className="flex flex-col gap-4">
        Hello, {session?.user?.email}
        <Button onClick={logout}>Logout</Button>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
