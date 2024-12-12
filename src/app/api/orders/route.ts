import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb.ts";
import { Order } from "@/models/Order";
import { authMiddleware } from "@/lib/authMiddleware";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const userId = await authMiddleware(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orderData = await req.json();
    const order = await Order.create({
      ...orderData,
      user_id: userId,
      status: "Pending",
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const userId = await authMiddleware(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await Order.find({ user_id: userId }).sort({
      createdAt: -1,
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching orders" },
      { status: 500 }
    );
  }
}
