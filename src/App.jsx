import { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import "./App.css";

const AppContext = createContext();

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [fullMovieData, setFullMovieData] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const savedWatchlist = localStorage.getItem("watchlist");
      return savedWatchlist ? JSON.parse(savedWatchlist) : [];
    } catch (error) {
      console.error("Failed to parse watchlist from localStorage:", error);
      return []; // Returns an empty array if parsing fails
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getFullMovieData = async () => {
      if (searchResults.length === 0) return; // Early return for initial render

      const movies = searchResults.map(async (movie) => {
        try {
          const res = await fetch(
            `/.netlify/functions/movieDetails?id=${movie.imdbID}`
          );

          if (!res.ok) {
            throw new Error("Fetch request failed");
          }

          setFetchError(null);
          const data = await res.json();

          // Check if the movie is already in the watchlist
          const isInWatchlist = watchlist.some(
            (watchlistMovie) => watchlistMovie.imdbID === data.imdbID
          );

          return {
            ...data,
            inWatchlist: isInWatchlist, // Sync inWatchlist flag with actual watchlist
          };
        } catch (err) {
          console.error(err);
          setFetchError(err);
        }
      });

      setFullMovieData(await Promise.all(movies));
      setIsLoading(false);
    };

    getFullMovieData();
  }, [searchResults, watchlist]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!inputValue) {
      setInputError(true);
      return;
    }

    setInputError(false);
    setIsLoading(true);

    try {
      const res = await fetch(
        `/.netlify/functions/movieSearch?title=${inputValue}`
      );

      if (!res.ok) {
        throw new Error("Fetch request failed");
      }

      const data = await res.json();
      setFetchError(null);
      clearInput();
      setSearchResults(data.Search);
    } catch (err) {
      console.error(err);
      setFetchError(err);
    }
  };

  const handleWatchlistClick = (e) => {
    const clickedMovieId = e.target.id;

    // Update fullMovieData
    setFullMovieData((prevFullMovieData) => {
      return prevFullMovieData.map((movie) => {
        if (movie.imdbID === clickedMovieId) {
          const updatedMovie = { ...movie, inWatchlist: !movie.inWatchlist };
          return updatedMovie;
        }
        return movie;
      });
    });

    // Update watchlist separately
    setWatchlist((prevWatchlist) => {
      const isInWatchlist = prevWatchlist.some(
        (watchlistMovie) => watchlistMovie.imdbID === clickedMovieId
      );

      if (isInWatchlist) {
        return prevWatchlist.filter((movie) => movie.imdbID !== clickedMovieId);
      } else {
        const movieToAdd = fullMovieData.find(
          (movie) => movie.imdbID === clickedMovieId
        );
        return [...prevWatchlist, movieToAdd];
      }
    });
  };

  // Updates localStorage when watchlist changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Clears search input field
  const clearInput = () => {
    setInputValue("");
  };

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
        isLoading,
        handleWatchlistClick,
        watchlist,
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
