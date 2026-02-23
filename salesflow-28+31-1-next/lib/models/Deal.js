import mongoose from "mongoose";

const DealSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Deal || mongoose.model("Deal", DealSchema);
