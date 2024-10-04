import { useState, useEffect } from "react";
import Search from "./Search";
import MovieResults from "./MovieResults";

export default function SearchPage() {
  const [inputValue, setInputValue] = useState("");
  const [movieData, setMovieData] = useState([]);

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

      // Check if data is in expected format
      if (!data || !Array.isArray(data.Search)) {
        throw new Error("Invalid data format");
      }

      setMovieData(data.Search); // Assuming the API response contains a 'Search' array
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!movieData.length > 0) return;
  }, [movieData]);

  console.log(movieData);

  return (
    <>
      <Search
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSearch={handleSearch}
      />
      <MovieResults movieData={movieData} />
    </>
  );
}
