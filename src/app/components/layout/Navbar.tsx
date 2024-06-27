import { getServerSession } from "next-auth";
import Link from "next/link";
import ClientNavbar from "../home/ClientNavbar";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { ExtendedSession } from "@/app/api/auth/[...nextauth]/options";
const Navbar = async () => {
  const session = (await getServerSession(options)) as ExtendedSession;

  return (
    <>
      <nav className="flex justify-between items-center bg-custom-purple-1 h-14 font-poppinssb px-4">
        <Link href="/">Sea Salon</Link>
        <div className="flex flex-row items-center space-x-4">
          {session ? (
            <>
              {session.user.role === "admin" && (
                <Link href="/dashboard">Dashboard</Link>
              )}
              {session.user.role === "user" && (
                <Link href="/reservations">Reservations</Link>
              )}
              <ClientNavbar />
            </>
          ) : (
            <>
              <Link href="/signup">Sign Up</Link>
              <Link href="/signin">Login</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
