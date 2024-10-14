import WatchlistBtn from "./WatchlistBtn";
import "./MovieCard.css";
import starIcon from "src/assets/star.svg";

export default function MovieCard({
  Title,
  imdbRating,
  imdbID,
  Runtime,
  Genre,
  Plot,
  Poster,
}) {
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
            <img className="icon--favorite" src={starIcon} alt="Star icon" />
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
        <WatchlistBtn id={imdbID} />
        <div id="movie__details--text" className="movie__details--text">
          <p>{Plot}</p>
        </div>
      </div>
    </div>
  );
}
