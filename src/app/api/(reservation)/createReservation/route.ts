import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  function addMinutesToDate(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
  }

  function isTimeLessThanOrEqual(time1: Date, time2: Date) {
    const hours1 = time1.getHours();
    const minutes1 = time1.getMinutes();
    const hours2 = time2.getHours();
    const minutes2 = time2.getMinutes();

    return hours1 < hours2 || (hours1 === hours2 && minutes1 <= minutes2);
  }

  function isTimeGreaterThanOrEqual(time1: Date, time2: Date) {
    const hours1 = time1.getHours();
    const minutes1 = time1.getMinutes();
    const hours2 = time2.getHours();
    const minutes2 = time2.getMinutes();

    return hours1 > hours2 || (hours1 === hours2 && minutes1 >= minutes2);
  }

  try {
    const body = await request.json();

    const { customerId, serviceOnBranchId, time } = body;

    const branchId = await db.serviceOnBranch.findFirst({
      where: { id: serviceOnBranchId },
      select: { branchId: true },
    });

    const openCloseTime = await db.branch.findFirst({
      where: { id: branchId?.branchId },
      select: { opening_time: true, closing_time: true },
    });

    const sessionLong = await db.serviceOnBranch.findFirst({
      where: { id: serviceOnBranchId },
      select: { minutes: true },
    });

    if (!openCloseTime || !sessionLong) {
      return NextResponse.json(
        { message: "Branch or service not found" },
        { status: 404 }
      );
    }

    const today = new Date();
    const [hours, minutes] = time.split(":").map(Number);
    const startingTime = new Date(today.setUTCHours(hours, minutes, 0, 0));
    const finishTime = addMinutesToDate(startingTime, sessionLong.minutes);

    // Check if reservation falls within the branch's operating hours
    if (
      !isTimeGreaterThanOrEqual(startingTime, openCloseTime.opening_time) &&
      !isTimeLessThanOrEqual(finishTime, openCloseTime.closing_time)
    ) {
      return NextResponse.json(
        { message: "Reservation time is out of operating hours" },
        { status: 400 }
      );
    }

    const newReservation = await db.reservation.create({
      data: {
        customerId,
        serviceOnBranchId,
        time: startingTime,
      },
    });

    const allReservation = await db.reservation.findMany({
      where: { customerId },
    });

    return NextResponse.json(
      {
        message: "Success to create new reservation",
        reservations: allReservation,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
