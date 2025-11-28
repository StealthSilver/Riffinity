import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

// Prevent mongoose from buffering commands when not connected
mongoose.set("bufferCommands", false);

app.use(express.json());

// DB readiness / lazy connection middleware (helps in serverless cold starts)
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState === 1) return next(); // connected
  try {
    await connectDB();
    return next();
  } catch (e) {
    return res.status(503).json({ error: "Database not connected" });
  }
});
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://riffinity.vercel.app",
        "https://riffinity-main.vercel.app",
      ];
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

app.use("/api", chatRoutes);

// Start the server only in traditional runtime (not Vercel serverless)
// Cache for in-flight mongoose connection promise to avoid duplicate connects
let _connecting: Promise<void> | null = null;

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

if (!process.env.VERCEL) {
  // local / non-serverless environment
  start();
}

async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }
    if (mongoose.connection.readyState === 1) return; // already connected
    if (_connecting) {
      await _connecting; // reuse in-flight promise
      return;
    }
    _connecting = mongoose
      .connect(process.env.MONGODB_URI, {
        dbName: "Riffinity",
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .finally(() => {
        _connecting = null;
      });
    await _connecting;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

// Export the Express app for Vercel serverless usage
export default app;
