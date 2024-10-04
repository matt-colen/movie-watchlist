import { useContext } from "react";
import Search from "./Search";
import MovieResults from "./MovieResults";
import { MovieContext } from "./Layout";

export default function SearchPage() {
  const { inputValue, setInputValue, handleSearch, movieData } =
    useContext(MovieContext);

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
