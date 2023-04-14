import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { SearchView } from './components/SearchView'
import { useState, useEffect } from 'react'
import { MovieView } from './components/MovieView'
import { TvView } from './components/TvView'
import ScrollToTop from './ScrollToTop'
import { SearchBar } from './components/SearchBar'
import { AmazonAffiliate } from './AmazonAffiliate'

function App() {
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (searchText) {
      Promise.all([
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=3ffb1ef9412dbe911529e0af90b27623&language=en-US&query=${searchText}&page=1&include_adult=false`
        ).then(data => data.json()),
        fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=3ffb1ef9412dbe911529e0af90b27623&language=en-US&page=1&query=${searchText}&include_adult=false`
        ).then(data => data.json()),
      ]).then(([dataMovies, dataTv]) => {
        setSearchResults(dataMovies.results.concat(dataTv.results))
      })
    }
  }, [searchText])

  return (
    <>
      <Router>
        <ScrollToTop>
          <AmazonAffiliate />
          <Navbar searchText={searchText} setSearchText={setSearchText} />
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<SearchView keyword={searchText} searchResults={searchResults} />} />
            <Route />
            <Route path='/movies/:id' element={<MovieView />} />
            <Route path='/tv/:id' element={<TvView />} />
            <Route path='/test' element={<SearchBar />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </>
  )
}

export default App
