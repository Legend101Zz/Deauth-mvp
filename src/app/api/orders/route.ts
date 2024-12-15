//@ts-nocheck
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb.ts";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orderData = await req.json();
    const order = await Order.create({
      ...orderData,
      user_id: session.user.id,
      status: "Pending",
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await Order.find({ user_id: session.user.id }).sort({
      createdAt: -1,
    });

    const formattedOrders = orders.map((order) => ({
      id: order._id,
      date: order.createdAt.toLocaleDateString(),
      status: order.status,
      total: order.total,
      shipping_address: order.shipping_address,
      items: order.products.map((product) => ({
        name: product.name,
        size: product.size,
        color: product.color,
        quantity: product.quantity,
        price: product.price,
        image: product.image,
      })),
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching orders" },
      { status: 500 }
    );
  }
}
