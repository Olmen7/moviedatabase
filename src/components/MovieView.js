import { Hero } from "./Hero";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const MovieView = () => {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [provider, setProvider] = useState([]);

  const movieId = movieDetails.id;

  const logoUrl = provider.logo_path;

  function hasLogo() {
    if (logoUrl) {
      const providerLogo = `https://image.tmdb.org/t/p/original${logoUrl}`;
      return (
        <div>
          Where to watch:{" "}
          <img className="provider-logo" src={providerLogo} alt="..." />
        </div>
      );
    } else {
      return;
    }
  }

  function showTrailer() {
    const yt = movieDetails.videos.results;
    function officialTrailer(yt) {
      if (yt.name === "Official Trailer") {
        return yt.name;
      } else if (yt.name === "official trailer") {
        return yt.name;
      } else if (yt.type === "Trailer") {
        return yt.type;
      } else {
        return <div>No trailer</div>;
      }
    }
    let findName = yt.find((yt) => officialTrailer(yt));

    if (findName && Object.values(findName).includes("YouTube")) {
      const trailer = `https://www.youtube.com/embed/${findName.key}`;
      return (
        <>
          <iframe
            title="trailer"
            id="ytplayer"
            width="640"
            height="360"
            src={trailer}
            frameBorder="0"
          />
        </>
      );
    } else {
      return <div></div>;
    }
  }
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=3ffb1ef9412dbe911529e0af90b27623`
    )
      .then((response) => response.json())
      .then((data) => setProvider(data.results.US.flatrate[0]))
      .catch(console.log(""));
  }, [movieId]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=3ffb1ef9412dbe911529e0af90b27623&append_to_response=videos`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
        setIsLoading(false);
      })
      .catch(console.log(""));
  }, [id]);

  function renderMovieDetails() {
    if (isLoading) {
      return <Hero text="Loading..." />;
    }
    if (movieDetails) {
      const backdropUrl = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;

      function posterLoaded(poster, title) {
        if (poster === null) {
          return (
            <>
              <img
                src="https://images.unsplash.com/photo-1545486332-9e0999c535b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                className="img-fluid shadow rounded poster-img"
                alt={title}
              />
            </>
          );
        } else {
          const posterPath = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
          return (
            <img
              src={posterPath}
              alt={title}
              className="img-fluid shadow rounded"
            />
          );
        }
      }
      return (
        <>
          <Hero text={movieDetails.title} backdrop={backdropUrl} />
          <div
            style={{
              background: `linear-gradient(to right, rgba(0,0,0,.8),rgba(0,0,0,.7)),url(${backdropUrl})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              padding: "20px",
            }}
          >
            <div className="container my-4">
              <div className="row">
                <div className="col-md-3">
                  {posterLoaded(movieDetails.poster_path, movieDetails.title)}
                </div>
                <div className="col-md-9 text-white">
                  <h2>{movieDetails.title}</h2>
                  <p className="fs-4">
                    Rating:{" "}
                    {movieDetails.vote_average > 0
                      ? `${movieDetails.vote_average}/10`
                      : "Unknown"}
                  </p>
                  <p className="fs-3">
                    Run Time:{" "}
                    {movieDetails.runtime > 0
                      ? `${movieDetails.runtime} minutes`
                      : "To be determined"}
                  </p>
                  <p className="fs2">Status: {movieDetails.status}</p>
                  {hasLogo()}
                  <p className="fs2">
                    Release Date:{" "}
                    {movieDetails.release_date
                      ? movieDetails.release_date
                      : "To be determined"}
                  </p>
                  <p className="lead">{movieDetails.overview}</p>
                  {showTrailer()}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  return renderMovieDetails();
};
