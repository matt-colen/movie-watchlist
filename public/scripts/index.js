document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = document.getElementById("search-bar__input");
  getMovies(searchInput.value);
  searchInput.value = "";
});

const getMovies = async (input) => {
  const res = await fetch(`/api/movie/${input}`);
  const data = await res.json();
  console.log(data);
};
