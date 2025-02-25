import { NextResponse } from "next/server";
import User from "@/models/creator";
import Content from "@/models/contents";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  await dbConnect();

  try {
    // Fetch all content
    const content = await Content.find({});

    // If no content is found, return a 404 error
    if (content.length === 0) {
      return NextResponse.json(
        { message: "No content found for this user" },
        { status: 404 }
      );
    }

    // Return the fetched content
    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { message: "Error fetching content", error: error },
      { status: 500 }
    );
  }
}
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
      createdBy: user,
      walletAddress,
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
