// Fetches all watchlist items from localStorage
const getAllWatchlistItems = () => {
  const items = [];
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("watchlist-")) {
      const item = JSON.parse(localStorage.getItem(key));
      items.push(item);
    }
  });
  console.log(items);
  return items;
};

// Renders watchlist movies in the results section
const renderMovies = () => {
  const watchlistItems = getAllWatchlistItems();

  if (watchlistItems.length > 0) {
    let html = "";

    watchlistItems.forEach((movie) => {
      html += `
    <div id="${movie.id}" class="movie grid">
      <img
        class="movie__poster"
        src="${movie.poster}"
        alt="Move poster for ${movie.title}"
      />
      <div class="movie__details">
        <div class="movie__details--primary flex">
          <h2 class="movie-title">${movie.title}</h2>
          <div class="movie-rating__container flex">
            <img
              class="icon--favorite"
              src="../assets/icons/star.svg"
              alt="Star icon"
            />
            <p id="movie-rating" class="movie-rating">${movie.rating}</p>
          </div>
        </div>
        <div class="movie__details--secondary flex">
          <p id="movie-length" class="movie-length">${movie.length}</p>
          <p id="movie-genres" class="movie-genres">
            ${movie.genre}
          </p>
        </div>
        <button class="btn btn--watchlist btn--remove" data-watchlist=${movie.id}>Remove from Watchlist</button>
        <div id="movie__details--text" class="movie__details--text">
          <p>
            ${movie.plot}
          </p>
        </div>
      </div>
    </div>
    `;
    });

    results.innerHTML = html;
  } else {
    results.innerHTML = `
    <div class="icon__container">
      <p>Your watchlist is looking a little empty...</p>
      <a href="../index.html">Let's add some movies!</a>
    </div>
    `;
  }
};

// Updates movie watchlist in localStorage
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

// Updates watchlist btn styling
const watchlistBtnRender = (id) => {
  const watchlistBtn = document.querySelector(`#${id} .btn--watchlist`);
  watchlistBtn.textContent === "Remove from Watchlist"
    ? (watchlistBtn.textContent = "Add to Watchlist")
    : (watchlistBtn.textContent = "Remove from Watchlist");
  watchlistBtn.classList.toggle("btn--remove");
  renderMovies();
};

// Initial call to render the localStorage items
renderMovies();

document.getElementById("results").addEventListener("click", (e) => {
  const movieId = e.target.dataset.watchlist;
  if (movieId) {
    updateMovieWatchlist(movieId);
  }
});
