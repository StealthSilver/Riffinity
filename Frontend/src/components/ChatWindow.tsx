import "../styles/ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "../context.js";
import { useContext, useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { ChevronDown, SendHorizontal, Share } from "lucide-react";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const getReply = async () => {
    setLoading(true);
    setNewChat(false);

    console.log("message ", prompt, " threadId ", currThreadId);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };

    try {
      const response = await fetch(
        "https://riffinity.vercel.app/api/chat",
        options
      );
      const res = await response.json();
      console.log(res);

      if (res.error) {
        setReply(`Error: ${res.error}`);
      } else {
        setReply(res.assistantReply);
      }
    } catch (err) {
      console.error("Error in getReply:", err);
      setReply("Failed to get response from server. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }

    setPrompt("");
  }, [reply]);

  return (
    <div className="chatWindow">
      {/* navbar */}
      <div className="navbar">
        <span className="modelDiv">
          Model <ChevronDown />
        </span>
        <div className="shareIconDiv">
          <span className="shareIcon">
            <Share className="share" size={20} />
            <p>Share</p>
          </span>
        </div>
      </div>

      {/* chat */}
      <Chat />

      {/* loader */}
      {loading && (
        <div className="loader">
          <PropagateLoader color="#fff" loading={loading} />
        </div>
      )}

      {/* chatInput */}
      <div className="chatInput">
        <div className="inputBox">
          <input
            type="text"
            placeholder="ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") getReply();
            }}
          />

          <div id="submit" onClick={getReply}>
            <SendHorizontal />
          </div>
        </div>
        {/* t and c */}
        <p className="info">
          Riffinity can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
