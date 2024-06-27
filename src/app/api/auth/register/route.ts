import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" }),
  phone: z.string().min(10, { message: "Phone number must be valid" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the incoming data against the schema
    const result = userSchema.safeParse({
      email: body.email,
      fullName: body.name,
      phone: body.phone_number,
      password: body.password,
    });

    // Check if the validation failed
    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, phone_number, password } = body;

    // check if email already exists in the database
    const isEmailRegistered = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (isEmailRegistered) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this email already exists",
        },
        { status: 409 }
      );
    }

    // check if phone number already exists in the database
    const isPhoneRegistered = await db.user.findUnique({
      where: {
        phone_number: phone_number,
      },
    });

    if (isPhoneRegistered) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this phone number already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        full_name: name,
        email: email,
        phone_number: phone_number,
        password: hashedPassword,
        role: "CUSTOMER",
      },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}
