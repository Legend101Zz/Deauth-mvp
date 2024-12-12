//@ts-nocheck

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb.ts";
import { Address } from "@/models/Address";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const addresses = await Address.find({ user_id: session.user.id });
    return NextResponse.json(addresses);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch addresses" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const address = await Address.create({
      ...data,
      user_id: session.user.id,
    });

    return NextResponse.json(address);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create address" },
      { status: 500 }
    );
  }
}
