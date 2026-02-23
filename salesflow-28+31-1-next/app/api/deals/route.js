import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Deal from "@/lib/models/Deal";

export async function GET() {
  await connectDB();
  const deals = await Deal.find().sort({ createdAt: -1 });
  return NextResponse.json(deals);
}

export async function POST(req) {
  await connectDB();
  const { client, amount, status } = await req.json();

  const newDeal = await Deal.create({ client, amount, status });
  return NextResponse.json(newDeal, { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const { id, updates } = await req.json();
  const updatedDeal = await Deal.findByIdAndUpdate(id, updates, { new: true });
  return NextResponse.json(updatedDeal);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Deal.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deal deleted" });
}
