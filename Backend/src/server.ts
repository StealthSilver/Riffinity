import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
  connectDB();
});

const connectDB = async () => {
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
    process.exit(1);
  }
};

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: req.body.message,
//         },
//       ],
//     }),
//   };

//   try {
//     const response = await fetch(
//       "https://api.openai.com/v1/chat/completions",
//       options
//     );
//     const data = await response.json();

//     console.log(data);

//     res.send(data.choices[0].message.content);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error occurred");
//   }
// });
