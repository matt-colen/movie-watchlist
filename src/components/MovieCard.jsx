import { useContext } from "react";
import App, { AppContext } from "../App";
import "./MovieCard.css";

export default function MovieCard({
  Title,
  imdbRating,
  imdbID,
  Runtime,
  Genre,
  Plot,
  Poster,
}) {
  const { handleWatchlistClick } = useContext(AppContext);

  return (
    <div className="movie grid">
      <div className="movie__poster-container">
        <img
          className="movie__poster"
          src={Poster}
          alt={`Movie poster for ${Title}`}
        />
      </div>
      <div className="movie__details">
        <div className="movie__details--primary flex">
          <h2 className="movie-title">{Title}</h2>
          <div className="movie-rating__container flex">
            <img
              className="icon--favorite"
              src="/src/assets/icons/star.svg"
              alt="Star icon"
            />
            <p id="movie-rating" className="movie-rating">
              {imdbRating}
            </p>
          </div>
        </div>
        <div className="movie__details--secondary flex">
          <p id="movie-length" className="movie-length">
            {Runtime}
          </p>
          <p id="movie-genres" className="movie-genres">
            {Genre}
          </p>
        </div>
        <button
          className="btn btn--watchlist"
          id={imdbID}
          onClick={(e) => handleWatchlistClick(e)}
        >
          Add to Watchlist
        </button>
        <div id="movie__details--text" className="movie__details--text">
          <p>{Plot}</p>
        </div>
      </div>
    </div>
  );
}
