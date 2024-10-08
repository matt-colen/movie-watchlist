import { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import MovieCard from "./components/MovieCard";
import "./App.css";

const AppContext = createContext();

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [fullMovieData, setFullMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getFullMovieData = async () => {
      const movies = searchResults.map(async (movie) => {
        try {
          const res = await fetch(
            `/.netlify/functions/movieDetails?id=${movie.imdbID}`
          );

          if (!res.ok) {
            throw new Error("Fetch request failed");
          }

          setFetchError(null);
          return await res.json();
        } catch (err) {
          console.error(err);
          setFetchError(err);
        }
      });
      setFullMovieData(await Promise.all(movies));
    };
    getFullMovieData();
  }, [searchResults]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!inputValue) {
      setInputError(true);
      return;
    }

    try {
      const res = await fetch(
        `/.netlify/functions/movieSearch?title=${inputValue}`
      );

      if (!res.ok) {
        throw new Error("Fetch request failed");
      }

      const data = await res.json();
      setInputError(false);
      setFetchError(null);
      clearInput();
      setSearchResults(data.Search);
    } catch (err) {
      console.error(err);
      setFetchError(err);
    }
  };

  const clearInput = () => {
    setInputValue("");
  };

  const movieElements = fullMovieData.map((movie, i) => (
    <MovieCard {...movie} key={i} />
  ));

  return (
    <AppContext.Provider
      value={{
        inputValue,
        setInputValue,
        handleSearch,
        searchResults,
        fullMovieData,
        inputError,
        fetchError,
        movieElements,
      }}
    >
      <div className="container grid">
        <Nav />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </AppContext.Provider>
  );
}

export { AppContext };
