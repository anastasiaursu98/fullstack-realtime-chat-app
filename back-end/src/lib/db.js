import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log("Adding reuse connection.");
            return;
        }
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        throw error;
    }
};