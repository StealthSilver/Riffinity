import express, { Router } from "express";
const router = express.Router();
import Thread from "../models/Thread";

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

export default router;
