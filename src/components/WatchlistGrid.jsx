import { nanoid } from "nanoid";
import MovieCard from "./MovieCard";

export default function WatchlistGrid({ watchlistMovies }) {
  console.log(watchlistMovies);

  const watchlistMovieElements = watchlistMovies.map((movie) => {
    return <MovieCard {...movie} key={nanoid()} />;
  });

  return watchlistMovieElements;
}
