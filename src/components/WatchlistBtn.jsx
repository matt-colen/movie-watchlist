import { useContext } from "react";
import { AppContext } from "../App";
import "./WatchlistBtn.css";

export default function WatchlistBtn({ id }) {
  const { fullMovieData, handleWatchlistClick } = useContext(AppContext);

  const movieInWatchlist = fullMovieData.filter((movie) => {
    return movie.imdbID === id && movie.inWatchlist;
  });

  return (
    <button
      className={`btn btn--watchlist ${
        movieInWatchlist.length > 0 ? "btn--remove" : ""
      }`}
      id={id}
      onClick={(e) => handleWatchlistClick(e)}
    >
      {movieInWatchlist.length > 0
        ? "Remove from watchlist"
        : "Add to watchlist"}
    </button>
  );
}
