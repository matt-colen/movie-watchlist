import { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import "./Layout.css";
import MovieTile from "./MovieTile";

const MovieContext = createContext();

export default function Layout() {
  const [inputValue, setInputValue] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [fullMovieData, setFullMovieData] = useState([]);

  useEffect(() => {
    if (!movieData.length > 0) return;
    // Gets the full movie details
    const getFullMovieData = async () => {
      const movies = movieData.map(async (movie) => {
        const movieId = movie.imdbID;
        const movieDetailsUrl = `/.netlify/functions/movieDetails?id=${movieId}`;
        try {
          const res = await fetch(movieDetailsUrl);

          if (!res.ok) {
            throw new Error("Fetch request failed");
          }

          return await res.json();
        } catch (err) {
          console.error(err);
        }
      });

      setFullMovieData(await Promise.all(movies));
    };

    getFullMovieData();
  }, [movieData]);

  const handleSearch = async () => {
    if (!inputValue) return; // Don't fetch if input is empty
    clearInput();

    try {
      const res = await fetch(
        `/.netlify/functions/movieSearch?title=${inputValue}`
      );

      if (!res.ok) {
        throw new Error("Fetch request failed");
      }

      const data = await res.json();
      setMovieData(data.Search);
    } catch (err) {
      console.error(err);
    }
  };

  const clearInput = () => {
    setInputValue("");
  };

  const movieElements = fullMovieData.map((movie, i) => (
    <MovieTile {...movie} key={i} />
  ));

  console.log("inputValue", inputValue);
  console.log("movieData", movieData);
  console.log("fullMovieData", fullMovieData);

  return (
    <MovieContext.Provider
      value={{
        inputValue,
        setInputValue,
        handleSearch,
        movieElements,
        movieData,
      }}
    >
      <div className="container grid">
        <Nav />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </MovieContext.Provider>
  );
}

export { MovieContext };
