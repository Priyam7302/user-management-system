import mongoose from "mongoose";
import "dotenv/config";

export async function connectToDB(req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting to DB, ", error.message);
  }
}
