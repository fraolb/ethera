import { NextResponse } from "next/server";
import User from "@/models/creator";
import Content from "@/models/contents";
import dbConnect from "@/lib/mongodb";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { walletAddress, title, descripton, contentType, tier, contentLink } =
      await request.json();

    // Find the user
    const user = await User.findOne({ walletAddress });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Create a new content
    const newContent = new Content({
      createdBy: walletAddress,
      title,
      descripton,
      contentType,
      contentLink,
      tier,
    });
    await newContent.save();

    return NextResponse.json(newContent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding content", error },
      { status: 500 }
    );
  }
}
