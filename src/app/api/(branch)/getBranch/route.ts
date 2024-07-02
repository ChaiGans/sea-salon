import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const existingBranches = await db.branch.findMany({
      include: {
        services: {
          include: {
            Service: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Success to get all branches", branches: existingBranches },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Error to get branches" },
      { status: 500 }
    );
  }
}
