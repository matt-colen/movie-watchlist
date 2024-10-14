import { useContext } from "react";
import { nanoid } from "nanoid";
import { AppContext } from "../App";
import SearchWelcome from "./SearchWelcome";
import SearchLoading from "./SearchLoading";
import MovieCard from "./MovieCard";
import "./SearchResults.css";

export default function SearchResults() {
  const { isLoading, fullMovieData } = useContext(AppContext);

  const movieElements = fullMovieData.map((movie) => {
    return <MovieCard {...movie} key={nanoid()} />;
  });

  if (isLoading) return <SearchLoading />;

  return (
    <section id="results" className="results grid">
      {!fullMovieData.length > 0 ? <SearchWelcome /> : movieElements}
    </section>
  );
}
