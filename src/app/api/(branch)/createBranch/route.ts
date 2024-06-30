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

    const newBranch = await db.branch.create({
      data: {
        branch_name,
        branch_location,
        opening_time: new Date(`1970-01-01T${opening_time}:00Z`),
        closing_time: new Date(`1970-01-01T${closing_time}:00Z`),
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
      { message: "Success to create new branch", branches: allBranches },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Error to create new branch" },
      { status: 500 }
    );
  }
}
