import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat";

const app = express();
const PORT = 8080;

// Prevent mongoose from buffering commands when not connected
mongoose.set("bufferCommands", false);

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://riffinity.vercel.app",
      "https://riffinity-main.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/api", chatRoutes);

// Start the server only after a successful DB connection
async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Riffinity",
    });

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
