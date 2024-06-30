import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const cid = request.nextUrl.searchParams.get("customerId");
    console.log(cid);

    const existingReservations = await db.reservation.findMany({
      where: {
        customerId: Number(cid),
      },
      include: {
        serviceOnBranch: {
          include: {
            Service: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Successfully retrieve reservations",
        reservations: existingReservations,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
