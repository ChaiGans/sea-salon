import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { service_name } = body;
    if (!service_name) {
      return NextResponse.json(
        { message: "Service name is required" },
        { status: 400 }
      );
    }

    const newService = await db.service.create({
      data: {
        service_name,
      },
    });

    // const allServices = await db.service.findMany();

    return NextResponse.json(
      { message: "Success to create new service", services: newService },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error to create new service" },
      { status: 500 }
    );
  }
}
