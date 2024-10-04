import Welcome from "./Welcome";
import "./MovieResults.css";

export default function MovieResults({ movieData }) {
  return (
    <section id="results" className="results grid">
      {!movieData.length > 0 && <Welcome />}
    </section>
  );
}
