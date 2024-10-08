import { useContext } from "react";
import Welcome from "./SearchWelcome";
import "./SearchResults.css";
import { AppContext } from "../App";

export default function SearchResults() {
  const { fullMovieData, movieElements } = useContext(AppContext);

  return (
    <section id="results" className="results grid">
      {!fullMovieData.length > 0 ? <Welcome /> : movieElements}
    </section>
  );
}
