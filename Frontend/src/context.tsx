import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type Thread = {
  threadId: string;
  title: string;
};

type ChatContextType = {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  reply: string | null;
  setReply: React.Dispatch<React.SetStateAction<string | null>>;
  currThreadId: string;
  setCurrThreadId: React.Dispatch<React.SetStateAction<string>>;
  prevChats: ChatMessage[];
  setPrevChats: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  allThreads: Thread[];
  setAllThreads: React.Dispatch<React.SetStateAction<Thread[]>>;
  newChat: boolean;
  setNewChat: React.Dispatch<React.SetStateAction<boolean>>;
  currentModel: string;
  setCurrentModel: React.Dispatch<React.SetStateAction<string>>;
};

export const MyContext = createContext<ChatContextType>({
  prompt: "",
  setPrompt: () => {},
  reply: null,
  setReply: () => {},
  currThreadId: "",
  setCurrThreadId: () => {},
  prevChats: [],
  setPrevChats: () => {},
  allThreads: [],
  setAllThreads: () => {},
  newChat: false,
  setNewChat: () => {},
  currentModel: "gpt-4o-mini",
  setCurrentModel: () => {},
});

export function MyProvider({ children }: { children: ReactNode }) {
  const [prompt, setPrompt] = useState<string>("");
  const [reply, setReply] = useState<string | null>(null);
  const [currThreadId, setCurrThreadId] = useState<string>("");
  const [prevChats, setPrevChats] = useState<ChatMessage[]>([]);
  const [allThreads, setAllThreads] = useState<Thread[]>([]);
  const [newChat, setNewChat] = useState<boolean>(false);
  const [currentModel, setCurrentModel] = useState<string>("gpt-4o-mini");

  return (
    <MyContext.Provider
      value={{
        prompt,
        setPrompt,
        reply,
        setReply,
        currThreadId,
        setCurrThreadId,
        prevChats,
        setPrevChats,
        allThreads,
        setAllThreads,
        newChat,
        setNewChat,
        currentModel,
        setCurrentModel,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
