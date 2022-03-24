import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext.js";
import icons from "../../functions/icons.js";
import convertHours from "../../functions/convertHours.js";

function CommonDestinations() {
  const [commonDestinations, setCommonDestinations] = useState([]);
  const { backendUrl } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "GET",
        credentials: "include",
        // mode: "no-cors",
      };
      const response = await fetch(
        `${backendUrl}/common-destinations`,
        requestOptions
      );
      const _commonDestinations = await response.json();
      setCommonDestinations(_commonDestinations);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="commonDestinations">
      {commonDestinations.length > 0 && (
        <ul className="destinations">
          {commonDestinations.map((destination, index) => (
            <li key={index} className="destination">
              <h2>{destination.airport}</h2>
              <ul className="commonDestinationsToAirport">
                {destination.commonDestinationsToAirport
                  .sort((a, b) => a.groupPrice - b.groupPrice)
                  .map((commonDestinationToAirport, index) => (
                    <li
                      key={index}
                      className="commonDestinationToAirport"
                      onClick={() => {
                        navigate("/passenger-flights", {
                          state: commonDestinationToAirport.trips,
                        });
                      }}
                    >
                      <icons.FaClock />
                      {convertHours(commonDestinationToAirport.timeTogether)}
                      <icons.FaEuroSign />
                      {commonDestinationToAirport.groupPrice}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      {commonDestinations.length === 0 && commonDestinations !== "" && (
        <h5>Loading...</h5>
      )}
      {commonDestinations === "" && (
        <>
          <h5>
            there are no suitable destinations with these criteria, try changing
            the dates or the meeting time
          </h5>
        </>
      )}
    </div>
  );
}

export default CommonDestinations;
