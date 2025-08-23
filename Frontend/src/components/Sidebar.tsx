import "../styles/Sidebar.css";
import logo from "../assets/Riffinity_Logo.svg";
import { SquarePen, CircleUserRound } from "lucide-react";

function Sidebar() {
  return (
    <section className="sidebar">
      {/* new chat button */}
      <div className="topDiv">
        <img className="logo" src={logo} alt="logo" />
        <button>
          <SquarePen />
        </button>
      </div>

      {/* history */}
      <ul className="history">
        <li>thread 1</li>
        <li>thread 1</li>
        <li>thread 1</li>
      </ul>

      {/* sign  */}
      <div className="sign">
        <CircleUserRound />
        <p className="accName">Silver</p>
      </div>
    </section>
  );
}

export default Sidebar;
