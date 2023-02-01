import { Hero } from "./Hero";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const TvView = () => {
  const { id } = useParams();

  const [tvDetails, setTvDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [provider, setProvider] = useState([]);

  const movieId = tvDetails.id;

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
    const yt = tvDetails.videos.results;

    let findName = yt.find((yt) => yt.official);

    if (findName && Object.values(findName).includes(true)) {
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
      `https://api.themoviedb.org/3/tv/${movieId}/watch/providers?api_key=3ffb1ef9412dbe911529e0af90b27623`
    )
      .then((response) => response.json())
      .then((data) => setProvider(data.results.US.flatrate[0]));
  }, [movieId]);
  //   console.log(tvDetails.videos.results[0].key);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=3ffb1ef9412dbe911529e0af90b27623&append_to_response=videos`
    )
      .then((response) => response.json())
      .then((data) => {
        setTvDetails(data);
        setIsLoading(false);
      });
  }, [id]);

  function rendertvDetails() {
    if (isLoading) {
      return <Hero text="Loading..." />;
    }
    if (tvDetails) {
      const backdropUrl = `https://image.tmdb.org/t/p/original${tvDetails.backdrop_path}`;

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
          const posterPath = `https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`;
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
          <Hero text={tvDetails.name} backdrop={backdropUrl} />
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
                  {posterLoaded(
                    tvDetails.poster_path,
                    tvDetails.original_title
                  )}
                </div>
                <div className="col-md-9 text-white">
                  <h2>{tvDetails.original_title}</h2>
                  <p className="fs-4">
                    Rating:{" "}
                    {tvDetails.vote_average > 0
                      ? `${tvDetails.vote_average}/10`
                      : "Unknown"}
                  </p>
                  <p className="fs-3">
                    Episode Run Time:{" "}
                    {tvDetails.episode_run_time > 0
                      ? `${tvDetails.episode_run_time} minutes`
                      : "To be determined"}
                  </p>
                  <p className="fs2">Status: {tvDetails.status}</p>
                  {hasLogo()}
                  <p className="fs2">
                    First Air Date:{" "}
                    {tvDetails.first_air_date
                      ? tvDetails.first_air_date
                      : "To be determined"}
                  </p>
                  <p className="lead">{tvDetails.overview}</p>
                  {showTrailer()}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  return rendertvDetails();
};
