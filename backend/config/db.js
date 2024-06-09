import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance=await mongoose.connect(process.env.MONGO_URI);
    console.log(`Server successfully connected to MongoDB. Mongo Host: ${connectionInstance.connection.host}👍`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
