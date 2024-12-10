import dbConnect from "@/app/Config/db";
import user from "@/app/Models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import Cors from "cors";

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'], // Allowed methods
  origin: '*', // Replace with your front-end domain or use '*' for all origins
});

const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

export async function POST(req) {
  // Run the CORS middleware for each request
  await runMiddleware(req, req, cors);

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
