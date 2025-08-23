import express, { Router } from "express";
const router = express.Router();
import Thread from "../models/Thread";
import getOpenAiAPIResponse from "../utils/openai";

// test

router.post("/test", async (req, res) => {
  try {
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
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
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
    const thread = await Thread.findOne({ threadId });

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
    const deletedThread = await Thread.findOneAndDelete({ threadId });

    if (!deletedThread) {
      res.status(404).json({ error: "thread not found" });
    }

    res.status(200).json({ success: "thread deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed ot fetch thread" });
  }
});

// chatting wiht the model

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      // create a new thread in db
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    if (!message.trim()) {
      const assistantReply = "Please enter a prompt to talk.";
      thread.messages.push({ role: "assistant", content: assistantReply });
      thread.updatedAt = new Date();
      await thread.save();
      return res.json({ assistantReply });
    }

    const assistantReply = await getOpenAiAPIResponse(message);

    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();
    await thread.save();

    res.json({ assistantReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
