import { NavLink } from 'react-router-dom';
import './Watchlist.css'

export default function Watchlist() {
  return (
    <section id="results" className="results grid">
      <div className="icon__container">
        <p>Your watchlist is looking a little empty...</p>
        <NavLink className="btn btn--secondary" to="/">Add Some Movies</NavLink>
      </div>
    </section>
  );
}
