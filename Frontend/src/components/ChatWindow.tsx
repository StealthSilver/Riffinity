import "../styles/ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "../context.js";
import { useContext, useState, useEffect, useRef } from "react";
import { PropagateLoader } from "react-spinners";
import { ChevronDown, SendHorizontal, Share, Cpu, Menu } from "lucide-react";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setPrevChats,
    setNewChat,
    currentModel,
    setCurrentModel,
    mobileSidebarOpen,
    setMobileSidebarOpen,
  } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const modelRef = useRef<HTMLDivElement | null>(null);

  const models = [
    "gpt-4o-mini",
    "gpt-4o",
    "gpt-4.1-mini",
    "gpt-4.1",
    "o3-mini",
  ];

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
        model: currentModel,
      }),
    };

    try {
      const baseUrl = "https://riffinity.onrender.com";
      const response = await fetch(`${baseUrl}/api/chat`, options);
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

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setModelMenuOpen(false);
      }
    }
    if (modelMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modelMenuOpen]);

  return (
    <div className="chatWindow">
      {/* navbar */}
      <div className="navbar">
        <button
          className="hamburgerBtn"
          aria-label="Open menu"
          aria-expanded={mobileSidebarOpen}
          onClick={() => setMobileSidebarOpen((o) => !o)}
        >
          <Menu size={20} />
        </button>
        <div
          className="modelDiv"
          onClick={() => setModelMenuOpen((o) => !o)}
          ref={modelRef}
        >
          <Cpu size={18} /> Model
          <ChevronDown
            className={modelMenuOpen ? "chevron rotated" : "chevron"}
            size={16}
          />
          {modelMenuOpen && (
            <div className="modelDropdown" role="menu">
              <div className="modelHeader">Models</div>
              {models.map((m) => (
                <div
                  key={m}
                  className={
                    "modelOption" + (m === currentModel ? " active" : "")
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentModel(m);
                    setModelMenuOpen(false);
                  }}
                >
                  <Cpu size={14} />
                  <span>{m}</span>
                </div>
              ))}
              <div className="modelFooter">More models coming soon...</div>
            </div>
          )}
        </div>
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
