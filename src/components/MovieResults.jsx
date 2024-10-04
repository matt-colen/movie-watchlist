import { useContext } from "react";
import Welcome from "./Welcome";
import "./MovieResults.css";
import { MovieContext } from "./Layout";

export default function MovieResults() {
  const { movieData } = useContext(MovieContext);

  return (
    <section id="results" className="results grid">
      {!movieData?.length > 0 && <Welcome />}
    </section>
  );
}
