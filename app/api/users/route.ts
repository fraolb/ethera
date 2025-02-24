import { NextResponse } from "next/server";
import User from "@/models/creator";
import dbConnect from "@/lib/mongodb";

// GET all users
export async function GET() {
  await dbConnect();

  try {
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users", error },
      { status: 500 }
    );
  }
}

// CREATE a new user
export async function POST(request: Request) {
  await dbConnect();

  try {
    const { creator, description, walletAddress, profileImg, isCreator } =
      await request.json();

    // Check if the user already exists
    const existingUser = await User.findOne({ walletAddress });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Create a new user
    const newUser = new User({
      creator,
      description,
      walletAddress,
      profileImg,
      isCreator,
    });
    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log("the error in api is ", error);
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}
