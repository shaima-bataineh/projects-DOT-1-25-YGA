import jwt from "jsonwebtoken";

export function verifyToken(req, allowedRoles = []) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    throw new Error("No token provided");
  }
 
  if (!token) {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
    throw new Error("Forbidden");
  }

  return decoded;
}
