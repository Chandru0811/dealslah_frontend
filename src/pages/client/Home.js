import React from "react";
import Registration from "../../components/auth/Registration";
import NotFound from "../../components/NotFound";
import Hero from "./home/Hero";

function Home({ handleLogin }) {
  return (
    <div className="container">
      {/* <button onClick={handleLogin} className="btn btn-primary"></button> */}
      <Registration />
      <NotFound />
      <Hero />
    </div>
  );
}

export default Home;
