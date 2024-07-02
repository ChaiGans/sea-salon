import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      branch_name,
      branch_location,
      opening_time,
      closing_time,
      services,
    } = body;

    // Convert times to JavaScript Date objects to compare
    const openTime = new Date(`1970-01-01T${opening_time}:00Z`);
    const closeTime = new Date(`1970-01-01T${closing_time}:00Z`);

    // Check if closing time is before opening time
    if (closeTime <= openTime) {
      return NextResponse.json(
        {
          message: "Closing time must be after opening time.",
        },
        {
          status: 400,
        }
      );
    }

    const newBranch = await db.branch.create({
      data: {
        branch_name,
        branch_location,
        opening_time: openTime,
        closing_time: closeTime,
        services: {
          create: services.map((service: { id: number; minutes: number }) => ({
            Service: {
              connect: { id: service.id },
            },
            minutes: service.minutes,
          })),
        },
      },
    });

    const allBranches = await db.branch.findMany();

    return NextResponse.json(
      {
        message: "Success to create new branch",
        branches: allBranches,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error to create new branch",
        error: error.message || "Unexpected error occurred",
      },
      {
        status: 500,
      }
    );
  }
}
