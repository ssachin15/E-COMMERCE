import mpngogoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mpngogoose.connect(process.env.mongoURI, {
 serverSelectionTimeoutMS: 5000,
        tls: true,
        });
        console.log("MongoDB connected successfully");
    }   catch (error) { 
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }   
};

export default connectDB;