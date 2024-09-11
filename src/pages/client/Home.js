import React from "react";
import Hero from "./home/Hero";
import DailyDeals from "./home/DailyDeals";
import BestSelling from "./home/BestSelling";
import Categories from "./home/Categories";
import SubCategories from "./home/SubCategories";

function Home({ handleLogin }) {
  return (
    <div>
      {/* <button onClick={handleLogin} className="btn btn-primary"></button> */}
      <Hero />
      <Categories />
      <DailyDeals />
      <SubCategories />
      <BestSelling />
    </div>
  );
}

export default Home;
