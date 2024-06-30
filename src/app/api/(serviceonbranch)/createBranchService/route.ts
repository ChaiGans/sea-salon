import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { branchId, serviceId, minutes } = body;

    const newServiceBranch = await db.serviceOnBranch.create({
      data: {
        branchId,
        serviceId,
        minutes,
      },
    });

    return NextResponse.json(
      {
        message: "Success to create new relation service-branch",
        serviceOnBranch: newServiceBranch,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error to create new relation service-branch" },
      { status: 500 }
    );
  }
}
