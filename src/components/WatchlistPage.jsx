import { NavLink } from "react-router-dom";
import "./WatchlistPage.css";

export default function WatchlistPage() {
  return (
    <section id="results" className="results grid">
      <div className="icon__container">
        <p>Your watchlist is looking a little empty...</p>
        <NavLink className="btn btn--secondary" to="/">
          Add some movies
        </NavLink>
      </div>
    </section>
  );
}
