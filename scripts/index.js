const results = document.getElementById("results");
let moviesOnPage; // Container for actively searched movies

// Fetch movie results from user search
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

// Fetch full movie details for each search result
const fetchMovieDetails = async (movies) => {
  const movieData = movies.Search.map(async (movie) => {
    const movieId = movie.imdbID;
    const movieDetailsUrl = `/.netlify/functions/movieDetails?id=${movieId}`;
    const movieDetailsResponse = await fetch(movieDetailsUrl);
    return await movieDetailsResponse.json();
  });

  return await Promise.all(movieData);
};

// Clears previous search results from input field and results section
const clearPreviousSearch = () => {
  results.innerHTML = "";
  document.getElementById("search-bar__input").value = "";
};

// Renders movie data in results section
const renderMovies = async (input) => {
  const movieData = await fetchMovieResults(input);
  moviesOnPage = [...movieData];
  let html = "";

  clearPreviousSearch();

  if (!movieData) {
    results.innerHTML = `<p>An error occured. Please try again</p>`;
    return;
  }

  movieData.forEach((movie) => {
    const inWatchlist = localStorage.getItem(`watchlist-${movie.imdbID}`);

    html += `
    <div id="${movie.imdbID}" class="movie grid">
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
        </div>
        <button class="${
          inWatchlist ? "btn btn--watchlist btn--remove" : "btn btn--watchlist"
        }" data-watchlist=${movie.imdbID}>${
      inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"
    }</button>
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

// Updates watchlist in localStorage
const updateMovieWatchlist = (id) => {
  if (!localStorage.getItem(`watchlist-${id}`)) {
    const movieOnPage = moviesOnPage.find((movie) => movie.imdbID === id);
    const { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID } =
      movieOnPage;
    const movieDetails = {
      id: imdbID,
      poster: Poster,
      title: Title,
      rating: imdbRating,
      length: Runtime,
      genre: Genre,
      plot: Plot,
    };
    localStorage.setItem(`watchlist-${id}`, JSON.stringify(movieDetails));
    watchlistBtnRender(id);
  } else {
    localStorage.removeItem(`watchlist-${id}`);
    watchlistBtnRender(id);
  }
};

// Renders the applicable watchlist btn styling
const watchlistBtnRender = (id) => {
  const watchlistBtn = document.querySelector(`#${id} .btn--watchlist`);
  watchlistBtn.textContent === "Remove from Watchlist"
    ? (watchlistBtn.textContent = "Add to Watchlist")
    : (watchlistBtn.textContent = "Remove from Watchlist");
  watchlistBtn.classList.toggle("btn--remove");
};

document.getElementById("search-form").addEventListener("submit", (e) => {
  const searchInput = document.getElementById("search-bar__input").value;
  e.preventDefault();
  searchInput
    ? renderMovies(searchInput)
    : (document.getElementById(
        "results"
      ).innerHTML = `<p>Unable to find what you’re looking for. Please try another search.</p>`);
});

document.getElementById("results").addEventListener("click", (e) => {
  const movieId = e.target.dataset.watchlist;
  if (movieId) {
    updateMovieWatchlist(movieId);
  }
});
