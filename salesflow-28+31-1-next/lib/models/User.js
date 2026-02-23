import mongoose from "mongoose";
import { type } from "node:os";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  tokens: [
    {
      token: { type: String }
    }
  ],

  role: {
    type: String,
    enum: ["Admin", "Manager", "salesRep"],
    default: "salesRep",
  },

  emailVerified: { type: Boolean, default: true }

}, { timestamps: true });

export default mongoose.models.User || 
mongoose.model("User", UserSchema);
