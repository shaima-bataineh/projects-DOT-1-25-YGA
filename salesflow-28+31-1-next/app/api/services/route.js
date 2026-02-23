import connectDB from "@/lib/db";
import Service from "@/lib/models/service";

// GET: جلب كل الخدمات
export async function GET() {
  try {
    await connectDB(); // نتأكد من الاتصال
    const services = await Service.find({});
    return new Response(JSON.stringify(services), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch services" }), { status: 500 });
  }
}

// POST: إضافة خدمة جديدة
export async function POST(req) {
  try {
    const { title, desc, icon, link } = await req.json();
    await connectDB();
    const service = await Service.create({ title, desc, icon, link });
    return new Response(JSON.stringify(service), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to create service" }), { status: 500 });
  }
}

// PUT: تعديل خدمة موجودة
export async function PUT(req) {
  try {
    const { id, title, desc, icon, link } = await req.json();
    await connectDB();
    const service = await Service.findByIdAndUpdate(
      id,
      { title, desc, icon, link },
      { new: true }
    );
    return new Response(JSON.stringify(service), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to update service" }), { status: 500 });
  }
}

// DELETE: حذف خدمة
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await connectDB();
    await Service.findByIdAndDelete(id);
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to delete service" }), { status: 500 });
  }
}
