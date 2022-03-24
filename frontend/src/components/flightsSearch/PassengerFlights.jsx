// import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import icons from "../../functions/icons.js";
import convertHours from "../../functions/convertHours.js";
import formatFlightDurationWithoutLetters from "../../functions/formatFlightDurationWithoutLetters.js";
import timeSlicer from "../../functions/timeSlicer.js";
import dateSlicer from "../../functions/dateSlicer.js";

function PassengersFlights() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="passengerFlights">
      <ul className="passengerFlightsList">
        {location.state.map((passengerFlight, index) => (
          <li key={index} className="passengerFlight">
            <div className="passengerIcon">
              <icons.FaUser />
              {passengerFlight.passengerId}
            </div>
            <div className="passengerOutbound">
              <p className="airportsToUppercase">
                <icons.FaPlaneDeparture className="reactIconAirplane" />
                {` ${passengerFlight.outboundFlight.from} - ${passengerFlight.outboundFlight.to}`}
              </p>
              {/* <p>
                {`${timeSlicer(passengerFlight.outboundFlight.departure)} - 
                ${timeSlicer(passengerFlight.outboundFlight.arrival)}`}
              </p> */}
              <p className="datesColor">
                <icons.FaClock className="reactIconClock" />
                {` ${dateSlicer(passengerFlight.outboundFlight.departure)} - 
                ${dateSlicer(
                  passengerFlight.outboundFlight.arrival
                )} ${timeSlicer(passengerFlight.outboundFlight.departure)}`}
              </p>
            </div>
            <div className="passengerOutbound">
              <p className="airportsToUppercase">
                <icons.FaPlaneArrival className="reactIconAirplane" />
                {` ${passengerFlight.returnFlight.from} - ${passengerFlight.returnFlight.to}`}
              </p>
              {/* <p>
                {`${timeSlicer(passengerFlight.returnFlight.departure)} - 
                ${timeSlicer(passengerFlight.returnFlight.arrival)}`}
              </p> */}
              <p className="datesColor">
                <icons.FaClock className="reactIconClock" />
                {` ${dateSlicer(passengerFlight.returnFlight.departure)} - 
                ${dateSlicer(
                  passengerFlight.returnFlight.arrival
                )} ${timeSlicer(passengerFlight.returnFlight.departure)}`}
              </p>
            </div>
            <div className="stayTimeTotalPrice">
              <p>
                {`Flight duration: ${formatFlightDurationWithoutLetters(
                  passengerFlight.outboundFlight.flightDuration
                )}`}
                {/* {console.log(
                  formatFlightDurationWithoutLetters(
                    passengerFlight.outboundFlight.flightDuration
                  )
                )} */}
                {/* <icons.FaClock className="reactIconClock" /> */}
              </p>
              <p>
                {`Total price: ${passengerFlight.totalPrice}`}
                <icons.FaEuroSign className="reactIconEuro" />
              </p>
              <p>
                {`Stay time: ${convertHours(passengerFlight.stayTime)}`}
                {/* <icons.FaClock className="reactIconClock" /> */}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(-1)}>go back</button>
    </div>
  );
}

export default PassengersFlights;
