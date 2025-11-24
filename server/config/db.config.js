import mongoose from "mongoose";

const connectDB = async (DB_URL) => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

export default connectDB;