import { NextResponse } from "next/server";
import User from "@/models/creator"; // Adjust the import path
import dbConnect from "@/lib/mongodb";

// Explicitly type the params object as a Promise
interface Params {
  walletAddress: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  await dbConnect();

  // Await the params object to resolve the walletAddress
  const { walletAddress } = await params;

  try {
    const user = await User.findOne({ walletAddress });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  await dbConnect();

  // Await the params object to resolve the walletAddress
  const { walletAddress } = await params;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { walletAddress },
      await request.json(),
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  await dbConnect();

  // Await the params object to resolve the walletAddress
  const { walletAddress } = await params;

  try {
    const deletedUser = await User.findOneAndDelete({ walletAddress });
    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting user", error },
      { status: 500 }
    );
  }
}
