import { Hero } from "./Hero";
import { About } from "./homeComponents/About";
// import { News } from "./homeComponents/News";

const Home = () => {
  const homeHero =
    "https://images.unsplash.com/photo-1460881680858-30d872d5b530?";
  return (
    <>
      <Hero text="Welcome to Movie Browser" backdrop={homeHero} />
      <About />
      {/* <News /> */}
    </>
  );
};
export default Home;
