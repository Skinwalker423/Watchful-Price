import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    return console.error("mongo uri not defined");
  }

  if (isConnected) return console.log("already connected");
  try {
    const connect = await mongoose.connect(
      process.env.MONGODB_URI
    );
    isConnected = true;
    console.log("now connected");
  } catch (error: any) {
    throw new Error(error);
  }
};
