import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { Context } from "./Context";

function App() {
  const providerValues = {};
  return (
    <div className="app">
      <Context.Provider value={providerValues}>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </Context.Provider>
    </div>
  );
}

export default App;
