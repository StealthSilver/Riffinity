import "../styles/ChatWindow.css";
import Chat from "./Chat";
import { ChevronDown, SendHorizontal, Share } from "lucide-react";

function ChatWindow() {
  return (
    <div className="chatWindow">
      {/* navbar */}
      <div className="navbar">
        <span className="modelDiv">
          Model <ChevronDown />
        </span>
        <div className="shareIconDiv">
          <span className="shareIcon">
            <Share className="share" />
            <p>Share</p>
          </span>
        </div>
      </div>

      {/* chat */}
      <Chat></Chat>

      {/* chatInput */}
      <div className="chatInput">
        <div className="inputBox">
          <input type="text" placeholder="ask anything" />
          <div id="submit">
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
