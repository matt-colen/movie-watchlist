const results = document.getElementById("results");

document.getElementById("search-form").addEventListener("submit", (e) => {
  const searchInput = document.getElementById("search-bar__input").value;
  e.preventDefault();
  searchInput && renderMovies(searchInput);
});

// Fetch movie results
const fetchMovieResults = async (userInput) => {
  try {
    const res = await fetch(
      `/.netlify/functions/movieSearch?title=${userInput}`
    );
    const data = await res.json();

    if (data.Response === "True") {
      return fetchMovieDetails(data);
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

// Fetch movie details for each result
const fetchMovieDetails = async (movies) => {
  const movieData = movies.Search.map(async (movie) => {
    const movieId = movie.imdbID;
    const movieDetailsUrl = `/.netlify/functions/movieDetails?id=${movieId}`;
    const movieDetailsResponse = await fetch(movieDetailsUrl);
    return await movieDetailsResponse.json();
  });

  return await Promise.all(movieData);
};

// Clears previous search results
const clearPreviousSearch = () => (results.innerHTML = "");

// Render movie data
const renderMovies = async (input) => {
  const movieData = await fetchMovieResults(input);
  let html = "";

  clearPreviousSearch();

  if (!movieData) {
    results.innerHTML = `<p>An error occured. Please try again</p>`;
    return;
  }

  if (movieData.length === 0) {
    results.innerHTML = `<p>No movies found</p>`;
    return;
  }

  movieData.forEach((movie) => {
    html += `
    <div class="movie grid">
      <img
        class="movie__poster"
        src="${movie.Poster}"
        alt="Move poster for ${movie.Title}"
      />
      <div class="movie__details">
        <div class="movie__details--primary flex">
          <h2 class="movie-title">${movie.Title}</h2>
          <div class="movie-rating__container flex">
            <img
              class="icon--favorite"
              src="assets/icons/star.svg"
              alt="Star icon"
            />
            <p id="movie-rating" class="movie-rating">${movie.imdbRating}</p>
          </div>
        </div>
        <div class="movie__details--secondary flex">
          <p id="movie-length" class="movie-length">${movie.Runtime}</p>
          <p id="movie-genres" class="movie-genres">
            ${movie.Genre}
          </p>
          <button class="btn btn--watchlist flex">
            <img
              class="icon--watchlist"
              src="assets/icons/watchlist.svg"
              alt="Add to watchlist icon"
            />
            Watchlist
          </button>
        </div>
        <div id="movie__details--text" class="movie__details--text">
          <p>
            ${movie.Plot}
          </p>
        </div>
      </div>
    </div>
    `;
  });

  results.innerHTML = html;
};
