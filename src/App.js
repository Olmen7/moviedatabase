import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { SearchView } from "./components/SearchView";
import { useState, useEffect } from "react";
import { MovieView } from "./components/MovieView";
import ScrollToTop from "./ScrollToTop";
import { TrailerRenderComponent } from "./components/TrailerRenderComponent";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=3ffb1ef9412dbe911529e0af90b27623&language=en-US&query=${searchText}&page=1&include_adult=false`
      )
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.results);
        });
    }
  }, [searchText]);

  return (
    <>
      <Router>
        <ScrollToTop>
          <Navbar searchText={searchText} setSearchText={setSearchText} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/search"
              element={
                <SearchView
                  keyword={searchText}
                  searchResults={searchResults}
                />
              }
            />
            <Route path="/movies/:id" element={<MovieView />} />
            <Route path="/test" element={<TrailerRenderComponent />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </>
  );
}

export default App;
