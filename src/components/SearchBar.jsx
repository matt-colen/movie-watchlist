import { useContext } from "react";
import { AppContext } from "../App"
import "./SearchBar.css";

export default function SearchBar() {
  const { inputValue, setInputValue, handleSearch, inputError } =
    useContext(AppContext);

  return (
    <>
      <form id="search-form" onSubmit={handleSearch}>
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
