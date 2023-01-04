import { Hero } from "./Hero";

const Home = () => {
  return (
    <>
      <Hero text="Welcome, look up past movies and future movies" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 my-5">
            Go to the search bar to look for movies
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
