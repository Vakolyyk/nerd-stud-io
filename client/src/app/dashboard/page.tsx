"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const Dashboard = () => {
  const logout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      Hello user
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
