document.getElementById("search-form").addEventListener("submit", (e) => {
  const searchInput = document.getElementById("search-bar__input").value;
  e.preventDefault();
  renderMovies(searchInput);
});

// Fetch movie data
const fetchMovieData = async (title) => {
  try {
    const res = await fetch(`/.netlify/functions/movieSearch?title=${title}`);
    return await res.json();
  } catch (e) {
    console.error(e);
  }
};

// Render movie data
const renderMovies = async (input) => {
  const data = await fetchMovieData(input);
  console.log(data);
};
