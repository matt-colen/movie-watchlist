import { nanoid } from "nanoid";
import MovieCard from "./MovieCard";

export default function WatchlistGrid({ watchlist }) {
  const watchlistMovieElements = watchlist.map((movie) => {
    return <MovieCard {...movie} key={nanoid()} />;
  });

  return watchlistMovieElements;
}
