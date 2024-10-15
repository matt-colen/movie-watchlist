import { NavLink } from "react-router-dom";
import "./WatchlistWelcome.css";

export default function WatchlistWelcome() {
  return (
    <div className="icon__container">
      <p className="watchlist-welcome">
        Your watchlist is looking a little empty...
      </p>
      <NavLink className="btn btn--secondary" to="/">
        Add some movies
      </NavLink>
    </div>
  );
}
