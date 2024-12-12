import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function authMiddleware(req: Request) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    return decoded.userId;
  } catch (error) {
    return null;
  }
}
