import { useContext } from "react";
import { AppContext } from "../App";
import "./WatchlistBtn.css";

export default function WatchlistBtn({ id }) {
  const { watchlist, handleWatchlistClick } = useContext(AppContext);

  const inWatchlist = watchlist.some((movie) => movie.imdbID === id);

  return (
    <button
      className={`btn btn--watchlist ${inWatchlist ? "btn--remove" : ""}`}
      id={id}
      onClick={(e) => handleWatchlistClick(e)}
    >
      {inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
    </button>
  );
}
