import { Hero } from "./Hero";
import { News } from "./homeComponents/News";

const Home = () => {
  const homeHero =
    "https://images.unsplash.com/photo-1460881680858-30d872d5b530?";
  return (
    <>
      <Hero text="Welcome to The Tribual" backdrop={homeHero} />
      <News />
    </>
  );
};
export default Home;
