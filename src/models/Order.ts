import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product_id: String,
        quantity: Number,
        price: Number,
        size: String,
        color: String,
      },
    ],
    total: Number,
    shipping_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);
