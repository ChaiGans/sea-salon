"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const ClientNavbar = () => {
  return (
    <div>
      <Button
        variant={"destructive"}
        onClick={() => {
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/signin`,
          });
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default ClientNavbar;
