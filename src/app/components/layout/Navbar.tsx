"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [role, setRole] = useState("USER");

  return (
    <>
      {role === "ADMIN" ? (
        <nav className="flex justify-between items-center bg-custom-purple-1 h-14 font-poppinssb px-4">
          <Link href="/">Sea Salon</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      ) : (
        <nav className="flex justify-center items-center bg-custom-purple-1 h-14 font-poppinssb">
          <Link href="/">Sea Salon</Link>
        </nav>
      )}
    </>
  );
};

export default Navbar;
