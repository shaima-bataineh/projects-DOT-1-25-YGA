// lib/db.js (Mongoose version)
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URL;

if (!MONGO_URI) {
  throw new Error("MONGODB_URL must be set in .env");
}

let cached = global.mongoose; // لتجنب إعادة الاتصال في التطوير
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
