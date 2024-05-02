document.getElementById("search-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchInput = document.getElementById("search-bar__input").value;
  try {
    const data = await fetchMovieData(searchInput);
    console.log(data);
    // Do something with the movie data
  } catch (error) {
    console.error(error);
  }
});

// Function to fetch movie data
const fetchMovieData = async (title) => {
  try {
    const response = await fetch(
      `/.netlify/functions/movieSearch?title=${encodeURIComponent(title)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch movie data");
  }
};
