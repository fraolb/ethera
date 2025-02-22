import { NextResponse } from "next/server";
import User from "@/models/creator";
import dbConnect from "@/lib/mongodb";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { walletAddress, title, contentType, tier, likes, contentLink } =
      await request.json();

    // Find the user
    const user = await User.findOne({ walletAddress });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Add the new content to the user's contents array
    user.contents.push({ title, contentType, tier, likes, contentLink });
    await user.save();

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding content", error },
      { status: 500 }
    );
  }
}
