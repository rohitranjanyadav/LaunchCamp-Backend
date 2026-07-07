import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config();

const PORT = parseInt(process.env.PORT, 10) || 3000;

if (isNaN(PORT)) {
  console.error(`Invalid PORT: ${process.env.PORT}`);
  process.exit(1);
}

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });

    // Graceful shutdown handlers
    process.on("SIGTERM", () => {
      console.log("SIGTERM received, shutting down...");
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("❌ Fatal: Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
