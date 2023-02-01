import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./News.css";

export const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=3ffb1ef9412dbe911529e0af90b27623"
      ).then((response) => response.json()),
      fetch(
        "https://api.themoviedb.org/3/trending/tv/week?api_key=3ffb1ef9412dbe911529e0af90b27623"
      ).then((response) => response.json()),
    ]).then(([dataNews, dataTv]) => {
      setNewsData(dataNews["results"]);
      setTrendingTv(dataTv["results"]);
    });
  }, []);

  return (
    <>
      <div>
        <div className="text-center">
          <div className="line"></div>
          <a className="anchor-tag" href="#movies">
            Trending Movies
          </a>
          <a className="anchor-tag" href="#shows">
            Trending Shows
          </a>
          <div className="line"></div>
        </div>
        <section className="news-section">
          <h2 className="news-section-title" id="movies">
            Trending Movies this week:
          </h2>
          {newsData.map((info) => {
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
                const posterUrl = `https://image.tmdb.org/t/p/w500${info.poster_path}`;
                return (
                  <img src={posterUrl} className="card-img-top" alt={title} />
                );
              }
            }
            const detailUrl = `/movies/${info.id}`;

            return (
              <>
                <div className="card-wrapper">
                  {posterLoaded(info.poster_path, info.original_title)}
                  <div className="card-body bg-dark">
                    <h5 className="card-title">{info.name || info.title}</h5>
                    <p className="vote">
                      {info.vote_average > 0 ? ` ${info.vote_average}/10` : ""}
                    </p>
                    <p>{info.video}</p>
                    <Link to={detailUrl} className="btn btn-primary">
                      Details
                    </Link>
                  </div>
                </div>
              </>
            );
          })}
        </section>
        <section className="news-section">
          <h2 className="news-section-title" id="shows">
            Trending Shows this week:
          </h2>
          {trendingTv.map((info) => {
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
                const posterUrl = `https://image.tmdb.org/t/p/w500${info.poster_path}`;
                return (
                  <img src={posterUrl} className="card-img-top" alt={title} />
                );
              }
            }
            const tvUrl = `/tv/${info.id}`;

            return (
              <>
                <div className="card-wrapper">
                  {posterLoaded(info.poster_path, info.original_title)}
                  <div className="card-body bg-dark">
                    <h5 className="card-title">{info.name || info.title}</h5>
                    <p className="vote">
                      {info.vote_average > 0 ? ` ${info.vote_average}/10` : ""}
                    </p>
                    <p>{info.video}</p>
                    <Link to={tvUrl} className="btn btn-primary">
                      Details
                    </Link>
                  </div>
                </div>
              </>
            );
          })}
        </section>
      </div>
    </>
  );
};
