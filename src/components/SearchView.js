import React from "react";
import { Link } from "react-router-dom";
import { Hero } from "./Hero";

const MovieCard = ({ movie }) => {
  const detailUrl = `/movies/${movie.id}`;
  const tvUrl = `/tv/${movie.id}`;

  function posterLoaded(poster, title) {
    if (poster === null) {
      return (
        <>
          <img
            src="https://images.unsplash.com/photo-1545486332-9e0999c535b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            className="card-img-top poster-img flex-card-img"
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
    <div className="col-lg-3 col-md-3 col-6 my-4 text-center">
      <div className="card flex-card bg-dark">
        {posterLoaded(movie.poster_path, movie.title)}
        <div className="card-body">
          <h5 className="card-title">
            {movie.original_title ? movie.title : movie.name}
          </h5>
          <Link
            to={movie.first_air_date ? tvUrl : detailUrl}
            className="btn btn-primary"
          >
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
        <div className="container container-fluid">
          <div className="row">{resultsHtml}</div>
        </div>
      )}
    </>
  );
};
