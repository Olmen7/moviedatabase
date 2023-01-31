import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./News.css";

export const News = () => {
  const [newsData, setNewsData] = useState([]);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=3ffb1ef9412dbe911529e0af90b27623"
    )
      .then((response) => response.json())
      .then((json) => setNewsData(json["results"]));
  }, []);

  return (
    <>
      <section className="news-section">
        <h2 className="news-section-title">Trending Movies this week:</h2>
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
                  <h5 className="card-title">
                    {info.name || info.original_title}
                  </h5>
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
    </>
  );
};
