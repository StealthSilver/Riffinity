import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://riffinity.vercel.app",
  "https://riffinity-fe.vercel.app",
];
const envAllowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = new Set([...defaultAllowedOrigins, ...envAllowedOrigins]);

// Prevent mongoose from buffering commands when not connected
mongoose.set("bufferCommands", false);

app.use(express.json());

// Lazy DB connection middleware (do not block requests if DB is down).
app.use(async (req, res, next) => {
  if (dbDisabled) return next();
  if (mongoose.connection.readyState === 1) return next(); // connected
  try {
    await connectDB();
  } catch {
    // Keep serving requests; route layer can decide how to handle DB-down mode.
  }
  return next();
});
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
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
let dbDisabled = false;

async function start() {
  try {
    await connectDB();
  } catch (err) {
    console.error("Starting without MongoDB connection:", err);
  }

  try {
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to bind server:", err);
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
    if (process.env.MONGODB_URI.includes("<db_password>")) {
      dbDisabled = true;
      console.warn(
        "MongoDB is disabled: replace <db_password> in MONGODB_URI. Running in memory-only mode."
      );
      return;
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
    const message = err instanceof Error ? err.message : String(err);
    if (message.toLowerCase().includes("bad auth")) {
      dbDisabled = true;
      console.warn(
        "MongoDB auth failed. Running in memory-only mode until backend restart."
      );
      return;
    }
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

// Export the Express app for Vercel serverless usage
export default app;
