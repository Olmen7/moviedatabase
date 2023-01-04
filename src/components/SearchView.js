import React from "react";
import { Link } from "react-router-dom";
import { Hero } from "./Hero";

const MovieCard = ({ movie }) => {
  const detailUrl = `/movies/${movie.id}`;

  function posterLoaded(poster, title) {
    if (poster === null) {
      return (
        <>
          <img
            src="https://images.unsplash.com/photo-1545486332-9e0999c535b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            className="card-img-top poster-img"
            alt={title}
          />
          <span className="poster-title">{title}</span>
        </>
      );
    } else {
      const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      return <img src={posterUrl} className="card-img-top" alt={title} />;
    }
  }

  return (
    <div className="col-lg-3 col-md-3 col-2 my-4">
      <div className="card">
        {posterLoaded(movie.poster_path, movie.original_title)}
        <div className="card-body">
          <h5 className="card-title">{movie.original_title}</h5>
          <Link to={detailUrl} className="btn btn-primary">
            Show details
          </Link>
        </div>
      </div>
    </div>
  );
};

export const SearchView = ({ keyword, searchResults }) => {
  const title = `You are searching for ${keyword}`;

  const resultsHtml = searchResults.map((obj, i) => {
    return <MovieCard movie={obj} key={i} />;
  });

  return (
    <>
      <Hero text={title} />
      {resultsHtml && (
        <div className="container">
          <div className="row">{resultsHtml}</div>
        </div>
      )}
    </>
  );
};