import { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import "./Layout.css";

const MovieContext = createContext();

export default function Layout() {
  const [inputValue, setInputValue] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [fullMovieData, setFullMovieData] = useState([]);

  const handleSearch = async () => {
    if (!inputValue) return; // Don't fetch if input is empty
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

  useEffect(() => {
    if (!movieData.length > 0) return;

    const getFullMovieData = async () => {
      const movies = movieData.map(async (movie) => {
        const movieId = movie.imdbID;
        const movieDetailsUrl = `/.netlify/functions/movieDetails?id=${movieId}`;
        const movieDetailsResponse = await fetch(movieDetailsUrl);
        return await movieDetailsResponse.json();
      });

      setFullMovieData(await Promise.all(movies));
    };

    getFullMovieData();
  }, [movieData]);

  console.log("movieData", movieData);
  console.log("fullMovieData", fullMovieData);

  return (
    <MovieContext.Provider value={{ setInputValue, handleSearch }}>
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
