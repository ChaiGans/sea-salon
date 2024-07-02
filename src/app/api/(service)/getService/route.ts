import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const allServices = await db.service.findMany();

    return NextResponse.json(
      { message: "Successfully get all service", services: allServices },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Fail to get service" },
      { status: 500 }
    );
  }
}
