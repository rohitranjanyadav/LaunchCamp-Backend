import mongoose, { mongo } from "mongoose";

const DEFAULT_OPTIONS = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000, // Fail fast if Atlas is unreachable
  socketTimeoutMS: 45000,
  bufferCommands: false, // Don't queue ops when disconnected
};

/**
 * Connects to MongoDB using the provided URI or process.env.MONGO_URI.
 * @param {string} [uri] - Optional override URI (useful for tests).
 * @returns {Promise<typeof mongoose>}
 * @throws {Error} If connection fails (caller decides whether to exit).
 */

export const connectDB = async (uri = process.env.MONGO_URI) => {
  if (!uri) {
    throw new Error("MONGO_URI is not defined. Check your .env file.");
  }

  // Prevent multiple connections in long-running processes (e.g. Next.js dev)
  if (mongoose.connection.readyState === 1) {
    console.log("⚡ Using existing MongoDB connection");
    return mongoose;
  }

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB runtime error:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected. Attempting to reconnect...");
  });

  try {
    await mongoose.connect(uri, DEFAULT_OPTIONS);
    console.log("✅ MongoDB connected");
    return mongoose;
  } catch (error) {
    console.error("❌ MongoDB initial connection failed:", error.message);
    throw error;
  }
};

export default connectDB;
