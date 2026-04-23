import express, { Router } from "express";
import mongoose from "mongoose";
const router = express.Router();
import Thread from "../models/Thread";
import getAIResponse from "../utils/ai";

type InMemoryMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
};

type InMemoryThread = {
  threadId: string;
  title: string;
  messages: InMemoryMessage[];
  createdAt: Date;
  updatedAt: Date;
};

const inMemoryThreads = new Map<string, InMemoryThread>();

function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

// Get available models from OpenRouter
router.get("/models", async (req, res) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Filter and format models for easier frontend consumption.
    // "Free" models are usually tagged with ":free" and/or zero token pricing.
    const models = data.data
      .map((model: any) => {
        const promptPrice = Number(model?.pricing?.prompt ?? 0);
        const completionPrice = Number(model?.pricing?.completion ?? 0);
        const isFree =
          String(model?.id ?? "").includes(":free") ||
          (promptPrice === 0 && completionPrice === 0);

        return {
          id: model.id,
          name: model.name,
          description: model.description,
          pricing: model.pricing,
          context_length: model.context_length,
          isFree,
        };
      })
      .sort((a: any, b: any) => Number(b.isFree) - Number(a.isFree));

    res.json(models);
  } catch (err) {
    console.error("Error fetching models:", err);
    res.status(500).json({ error: "Failed to fetch models" });
  }
});

// test

router.post("/test", async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({ error: "Database is not connected" });
    }

    const thread = new Thread({
      threadId: "abc",
      title: "Testing new thread",
    });

    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed ot save in db" });
  }
});

// get all threads

router.get("/thread", async (req, res) => {
  try {
    const threads = isDbConnected()
      ? await Thread.find({}).sort({ updatedAt: -1 })
      : Array.from(inMemoryThreads.values()).sort(
          (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
        );

    // most recent thread on top: decending order on UpdatedAt
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed ot fetch threads" });
  }
});

// get one thread

router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = isDbConnected()
      ? await Thread.findOne({ threadId })
      : inMemoryThreads.get(threadId);

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch thread" });
  }
});

// delete a thread

router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedThread = isDbConnected()
      ? await Thread.findOneAndDelete({ threadId })
      : inMemoryThreads.get(threadId);

    if (!deletedThread) {
      return res.status(404).json({ error: "thread not found" });
    }

    if (!isDbConnected()) {
      inMemoryThreads.delete(threadId);
    }

    res.status(200).json({ success: "thread deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed ot fetch thread" });
  }
});

// chatting wiht the model

router.post("/chat", async (req, res) => {
  const { threadId, message, model } = req.body;

  if (!threadId || !message || !model) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let thread = isDbConnected()
      ? await Thread.findOne({ threadId })
      : inMemoryThreads.get(threadId);

    if (!thread) {
      // create a new thread in db
      const newThread = {
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      };

      thread = isDbConnected()
        ? new Thread(newThread)
        : {
            ...newThread,
            messages: [{ role: "user", content: message, timestamp: new Date() }],
            createdAt: new Date(),
            updatedAt: new Date(),
          };
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    if (!message.trim()) {
      const assistantReply = "Please enter a prompt to talk.";
      thread.messages.push({ role: "assistant", content: assistantReply });
      thread.updatedAt = new Date();
      if (isDbConnected()) {
        await (thread as any).save();
      } else {
        inMemoryThreads.set(threadId, thread as InMemoryThread);
      }
      return res.json({ assistantReply });
    }

    const assistantReply = await getAIResponse(message, model);

    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();
    if (isDbConnected()) {
      await (thread as any).save();
    } else {
      inMemoryThreads.set(threadId, thread as InMemoryThread);
    }

    res.json({ assistantReply });
  } catch (err: any) {
    console.error("Error in /chat endpoint:", err);
    const errorMessage = err.message || "Something went wrong";
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
