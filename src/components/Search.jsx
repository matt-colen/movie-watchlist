import { useState, useContext } from "react";
import { MovieContext } from "./Layout";
import "./Search.css";

export default function Search() {
  const [inputError, setInputError] = useState(false);
  const { inputValue, setInputValue, handleSearch } = useContext(MovieContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue) {
      setInputError(true);
      return;
    } // Don't fetch if input is empty

    setInputError(false);
    handleSearch();
  };

  return (
    <>
      <form id="search-form" onSubmit={handleSubmit}>
        <div className="search-bar grid">
          <input
            id="search-bar__input"
            className="search-bar__input"
            type="search"
            placeholder="Search for movies"
            aria-label="Search for movies"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button id="search-btn" className="btn btn--primary">
            Search
          </button>
          {inputError && (
            <p className="error">Please enter a movie to search for</p>
          )}
        </div>
      </form>
    </>
  );
}
