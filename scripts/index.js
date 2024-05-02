document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = document.getElementById("search-bar__input");
  fetchMovieData(searchInput.value).then((data) => {
    console.log(data);
    // Do something with the movie data
  });
});

// Function to fetch movie data
const fetchMovieData = async (title) => {
  const res = await fetch(
    `../functions/movieSearch.js?title="${encodeURIComponent(title)}`
  );
  const data = await res.json();
  return data;
};
