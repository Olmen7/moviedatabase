import React from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ searchText, setSearchText }) => {
  const navigate = useNavigate();
  const updateSearchText = (e) => {
    navigate("/search");
    setSearchText(e.target.value);
  };
  const clickHandler = (e) => {
    e.preventDefault();
    updateSearchText();
  };
  function deleteText(e) {
    e.target.value = "";
  }

  return (
    <div className="d-flex justify-content-center m-4">
      <form className="search-form" role="search">
        <input
          className="form-control me-2 searchbar fs-4"
          type="search"
          placeholder="Search for movie here..."
          aria-label="Search"
          value={searchText}
          onChange={updateSearchText}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault();
            }
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              deleteText(e);
            }
          }}
        ></input>
        <button
          onClick={clickHandler}
          className=" btn-outline-success search-btn"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};
