import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    phone: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    dob: { type: Date },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Users = mongoose.model("user", userSchema);
export default Users;

