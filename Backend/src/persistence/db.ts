import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("Connect")
        if (!process.env.MONGODB_DATABASE) {
            return new Error;
        }
        await mongoose.connect(process.env.MONGODB_DATABASE);
        console.log("Database Connection Successful")
    } catch (error) {
        console.log(error);
    }
}