import express from "express";
import "dotenv/config";
import OpenAI from "openai";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/test", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: req.body.message,
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();

    console.log(data);

    res.send(data.choices[0].message.content);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred");
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
