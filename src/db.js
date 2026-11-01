import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Atlas Connected Successfully!");
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;