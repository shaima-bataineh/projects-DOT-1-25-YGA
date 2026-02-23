import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import Deal from "@/lib/models/Deal";

export async function GET() {
  try {
    await connectDB();

    const totalUsers = await User.countDocuments();
    const totalDeals = await Deal.countDocuments();

    const totalSalesAgg = await Deal.aggregate([
      { $match: { status: "closed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalSales = totalSalesAgg[0]?.total || 0;

    return NextResponse.json({ totalUsers, totalDeals, totalSales });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
