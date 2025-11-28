import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import type { ChatMessage, Thread } from "./context";
import { MyContext } from "./context";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState<ChatMessage[]>([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState<Thread[]>([]);
  const [currentModel, setCurrentModel] = useState<string>("gpt-4o-mini");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    allThreads,
    setAllThreads,
    currentModel,
    setCurrentModel,
    mobileSidebarOpen,
    setMobileSidebarOpen,
  };

  return (
    <div className="app">
      <MyContext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  );
}

export default App;
