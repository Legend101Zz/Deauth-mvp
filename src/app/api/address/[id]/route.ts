//@ts-nocheck
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb.ts";
import { Address } from "@/models/Address";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const address = await Address.findOneAndUpdate(
      { _id: params.id, user_id: session.user.id },
      data,
      { new: true }
    );

    if (!address) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    return NextResponse.json(address);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update address" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const address = await Address.findOneAndDelete({
      _id: params.id,
      user_id: session.user.id,
    });

    if (!address) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Address deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete address" },
      { status: 500 }
    );
  }
}
