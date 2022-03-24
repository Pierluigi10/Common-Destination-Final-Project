import React from "react";
import FlightSearch from "./flightsSearch/FlightSearch";

function Home({ className }) {
  return (
    <div className={className}>
      <h2 className="afterEffect"> </h2>
      <FlightSearch />
    </div>
  );
}

export default Home;
