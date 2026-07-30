import mongoose from "mongoose";
import dns from "dns";

async function connectDB() {
    try {
        dns.setServers(['8.8.8.8','1.1.1.1']);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB successfully");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;
