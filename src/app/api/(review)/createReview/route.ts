import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

// api to create a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { customer_name, rating, comment } = body;

    const newReview = await db.review.create({
      data: {
        customer_name,
        rating,
        comment,
      },
    });

    return NextResponse.json(
      { message: "Review created successfully", review: newReview },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Review creation fail" },
      { status: 500 }
    );
  }
}
