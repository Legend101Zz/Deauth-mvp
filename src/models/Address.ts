import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address_line1: String,
    address_line2: String,
    city: String,
    state: String,
    postal_code: String,
    country: String,
    address_type: {
      type: String,
      enum: ["home", "work", "other"],
      default: "home",
    },
  },
  { timestamps: true }
);

export const Address =
  mongoose.models.Address || mongoose.model("Address", AddressSchema);
