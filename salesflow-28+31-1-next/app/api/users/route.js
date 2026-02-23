import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB(); // نتأكد إن DB متصلة

export async function POST(req) {
  const { action } = req.nextUrl.searchParams; // ?action=register أو ?action=login
  const body = await req.json();

  if (action === "register") {
    const { username, email, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return new Response("User already exists", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    return new Response(JSON.stringify({ message: "User registered", userId: newUser._id }), {
      status: 201,
    });
  }

  if (action === "login") {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) return new Response("User not found", { status: 404 });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return new Response("Invalid password", { status: 401 });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return new Response(JSON.stringify({ token, userId: user._id }), { status: 200 });
  }

  return new Response("Invalid action", { status: 400 });
}

// مثال للـ GET profile
export async function GET(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return new Response("Unauthorized", { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return new Response("User not found", { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new Response("Invalid token", { status: 401 });
  }
}
