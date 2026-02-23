import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    // تحقق إذا المستخدم موجود
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // تشفير الباسورد
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // إنشاء JWT بعد التسجيل
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // إعداد الرد مع الكوكيز
    const response = NextResponse.json({
      message: "User registered and logged in successfully",
    });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 60 * 60, // ساعة واحدة
      path: "/",
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
