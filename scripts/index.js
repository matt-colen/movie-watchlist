document.getElementById("search-form").addEventListener("submit", (e) => {
  const searchInput = document.getElementById("search-bar__input").value;

  e.preventDefault();
  renderMovies(searchInput);
});

// Function to fetch movie data
const fetchMovieData = async (title) => {
  try {
    const response = await fetch(
      `/.netlify/functions/movieSearch?title=${title}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch movie data");
  }
};

// Function to render movie data
const renderMovies = async (input) => {
  try {
    const data = await fetchMovieData(input);
    console.log(data);
    // Do something with the movie data
  } catch (error) {
    console.error(error);
  }
};
