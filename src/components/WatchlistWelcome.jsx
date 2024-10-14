import { NavLink } from "react-router-dom";

export default function WatchlistWelcome() {
  return (
    <div className="icon__container">
      <p>Your watchlist is looking a little empty...</p>
      <NavLink className="btn btn--secondary" to="/">
        Add some movies
      </NavLink>
    </div>
  );
}
