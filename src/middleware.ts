import { withAuth } from "next-auth/middleware";
import { getServerSession } from "next-auth";
import { options } from "./app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/reservations") && role !== "user") {
      return NextResponse.redirect(new URL("/denied", req.url));
    }

    if (pathname.startsWith("/dashboard") && role !== "admin") {
      return NextResponse.redirect(new URL("/denied", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/reservations", "/dashboard"],
};
