import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const allReviews = await db.review.findMany();

    return NextResponse.json(
      { message: "Successfully get all review", reviews: allReviews },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Fail to get review" },
      { status: 500 }
    );
  }
}
