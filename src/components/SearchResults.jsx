import { useContext } from "react";
import { AppContext } from "../App";
import SearchWelcome from "./SearchWelcome";
import SearchLoading from "./SearchLoading";
import "./SearchResults.css";

export default function SearchResults() {
  const { isLoading, fullMovieData, movieElements } = useContext(AppContext);

  return (
    <section id="results" className="results grid">
      {(isLoading && <SearchLoading />) || !fullMovieData.length > 0 ? (
        <SearchWelcome />
      ) : (
        movieElements
      )}
    </section>
  );
}
