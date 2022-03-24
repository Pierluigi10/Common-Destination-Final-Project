import React from "react";
import RandomImages from "../components/randomImages/RandomImages.jsx";
// import img from "../assets/images/image1-min.png";
// import img from "../assets/images/airport-min.jpg";

function About(props) {
  return (
    <div className={props.className}>
      <RandomImages className="image" />

      <div className="description">
        <p>
          COMMON DESTINATION is a start-up company born at the end of 2021 from
          the chance meeting of three people. Since then, COMMON DESTINATION has
          grown to allow you to find more than two thousand flights.
        </p>
        <br />
        <p>
          You and your friends all live in different cities but want to meet up
          this weekend? Simple, find your COMMON DESTINATION with us! With a
          simple click you will find out where to meet, which flights are best
          suited to your needs and at the best price! <br />
          What are you waiting for, find your COMMON DESTINATION!
        </p>
        {/* test */}
      </div>
      <div className="wave"></div>
      {/* </div> */}
    </div>
  );
}

export default About;
