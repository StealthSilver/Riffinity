import "../styles/Sidebar.css";
import logo from "../assets/riffinity_logo.svg";
import { SquarePen, CircleUserRound, Trash } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { MyContext } from "../context";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats,
  } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const baseUrl = "https://riffinity-main.vercel.app";
      const response = await fetch(`${baseUrl}/api/thread`);
      const res = await response.json();

      const filteredData = res.map((thread: any) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));

      setAllThreads(filteredData);

      console.log("Fetched threads:", filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  };

  const changeThread = async (newthreadId: React.SetStateAction<string>) => {
    setCurrThreadId(newthreadId);

    try {
      const baseUrl = "https://riffinity-main.vercel.app";
      const response = await fetch(`${baseUrl}/api/thread/${newthreadId}`);

      const res = await response.json();
      console.log(res);
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteThread = async (threadId: string) => {
    try {
      const baseUrl = "https://riffinity-main.vercel.app";
      const response = await fetch(`${baseUrl}/api/thread/${threadId}`, {
        method: "DELETE",
      });

      await response.json();

      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );

      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="sidebar">
      <div className="topDiv">
        <img className="logo" src={logo} alt="logo" />
        <button onClick={createNewChat}>
          <SquarePen size={20} />
        </button>
      </div>

      <ul className="history">
        {allThreads?.map((thread, idx) => (
          <li
            key={idx}
            onClick={() => changeThread(thread.threadId)}
            className={thread.threadId === currThreadId ? "highlighted" : " "}
          >
            {thread.title}
            <Trash
              className="trash"
              size={16}
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            />
          </li>
        ))}
      </ul>

      <div className="sign">
        <CircleUserRound />
        <p className="accName">Silver</p>
      </div>
    </section>
  );
}

export default Sidebar;
