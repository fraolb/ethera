import { NextResponse } from "next/server";
import Content from "@/models/contents";
import dbConnect from "@/lib/mongodb";

interface Params {
  walletAddress: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  await dbConnect();

  const { walletAddress } = await params;

  try {
    // Fetch all content created by the user with the given walletAddress
    const content = await Content.find({ walletAddress });

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
