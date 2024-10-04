import { NavLink } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <header className="header grid">
      <nav className="nav flex">
        <div className="nav-overlay"></div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link ${isActive ? "selected" : ""}`
          }
        >
          Search
        </NavLink>
        <NavLink
          to="/watchlist"
          className={({ isActive }) =>
            `nav-link ${isActive ? "selected" : ""}`
          }
        >
          Watchlist
        </NavLink>
      </nav>
    </header>
  );
}
