import { Hero } from "./Hero";

export const About = () => {
  return (
    <>
      <Hero text="About Us" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 my-5">
            This is a react application that was created to practice the use of
            react hooks and the use of an api. To search for movies and see
            details use the search bar.
          </div>
        </div>
      </div>
    </>
  );
};
