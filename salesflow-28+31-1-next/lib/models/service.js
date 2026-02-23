import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, default: "/icons/thumbs/default.png" },
  link: { type: String, default: "" },
});

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

export default Service;
