import dbConnect from "@/app/Config/db";
import user from "@/app/Models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect(); 
  try {
    let { email, password } = await req.json();

    // Find the user by email
    const userExists = await user.findOne({ email });
    if (!userExists) {
      return NextResponse.json(
        {
          message: "Invalid Credentials",
        },
        { status: 401 }
      );
    }

    // Match the provided password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          message: "Invalid Credentials",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "User logged in successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      {
        message: "Error in Login",
      },
      { status: 400 }
    );
  }
}


export function GET() {
  return NextResponse.json(
    {
      message: "Login Page",
    },
    { status: 200 }
  );
}