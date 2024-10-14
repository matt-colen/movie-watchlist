import { useContext } from "react";
import { AppContext } from "../App";
import WatchlistWelcome from "./WatchlistWelcome";
import WatchlistGrid from "./WatchlistGrid";
import "./WatchlistPage.css";

export default function WatchlistPage() {
  const { fullMovieData } = useContext(AppContext);
  const watchlistMovies = fullMovieData.filter((movie) => movie.inWatchlist);

  return (
    <section id="results" className="results grid">
      {!watchlistMovies.length > 0 ? (
        <WatchlistWelcome />
      ) : (
        <WatchlistGrid watchlistMovies={watchlistMovies} />
      )}
    </section>
  );
}
