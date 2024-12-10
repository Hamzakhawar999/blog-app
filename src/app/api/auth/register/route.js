import dbConnect from "@/app/Config/db";
import user from "@/app/Models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  try {
    const data = await req.json();


    if (!data.password) {
      return NextResponse.json(
        {
          success: false,
          message: "Password is required",
        },
        { status: 400 }
      );
    }

    const saltRounds = 10; 

    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

 
    data.password = hashedPassword;

    const response = await user.create(data);

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: response,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An error occurred",
      },
      {
        status: 400,
      }
    );
  }
}
