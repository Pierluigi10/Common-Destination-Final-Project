import React, { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext.js";
import ShowPassenger from "./ShowPassenger";
import GeneralCriteria from "./GeneralCriteria.jsx";
import icons from "../../functions/icons.js";

const _emptyPassenger = {
  id: "",
  airport: "",
  minOutboundDate: "",
  maxReturnDate: "",
};

const fillDataIntoPassengers = (passengers) => {
  passengers.forEach((passenger, index) => {
    passenger.id = `${index + 1}`;
  });
  return passengers;
};

function FlightSearch() {
  const [departureAirports, setDepartureAirports] = useState([]);
  const [stayTimeTogether, setStayTimeTogether] = useState(24);
  const [passengersValidation, setPassengersValidation] = useState(false);
  const [datesValidation, setDatesValidation] = useState(false);
  const [airportsValidation, setAirportsValidation] = useState(false);
  const [datesError, setDatesError] = useState(false);
  const [datesAreEmpty, setDatesAreEmpty] = useState(true);
  const [noMeeting, setNoMeeting] = useState(true);
  const [otboundLaterThanReturn, setOtboundLaterThanReturn] = useState(false);
  const [airportsError, setAirportsError] = useState(false);
  const [errorsToggle, setErrorsToggle] = useState(false);
  const [markedErrors, setMarkedErrors] = useState(false);
  const [earliestReturn, setEarlistReturn] = useState("");
  const [lastestOutbound, setLastestOubound] = useState("");
  const { backendUrl, passengers, setPassengers } = useTheme();
  const navigate = useNavigate();
  const airports = passengers.map((passenger) => passenger.airport);
  const outbounds = passengers.map((passenger) => passenger.minOutboundDate);
  const returns = passengers.map((passenger) => passenger.maxReturnDate);

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "GET",
        credentials: "include",
        // mode: "no-cors"
      };
      const response = await fetch(
        `${backendUrl}/flights/airports`,
        requestOptions
      );
      if (response.ok) {
        const _departureAirports = await response.json();
        setDepartureAirports(_departureAirports);
      }
    })();
    const _passengers = [{ ..._emptyPassenger }, { ..._emptyPassenger }];
    setPassengers([...fillDataIntoPassengers(_passengers)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (outbounds.length > 0 && returns.length > 0) {
      const _earliestReturn = moment(
        returns.reduce((a, b) => Math.min(moment(a), moment(b)))
      );
      const _lastestOutbound = moment(
        outbounds.reduce((a, b) => Math.max(moment(b), moment(a)))
      );

      setEarlistReturn(new Date(_earliestReturn));
      setLastestOubound(new Date(_lastestOutbound));

      const howManyTimeTogether = moment(_earliestReturn).diff(
        moment(_lastestOutbound),
        "hours"
      );

      returns.includes("") || outbounds.includes("")
        ? setDatesAreEmpty(true)
        : setDatesAreEmpty(false);

      !datesAreEmpty && howManyTimeTogether < stayTimeTogether
        ? setNoMeeting(true)
        : setNoMeeting(false);

      !noMeeting && !datesAreEmpty
        ? setDatesValidation(true)
        : setDatesValidation(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passengers, stayTimeTogether, datesAreEmpty, noMeeting]);

  useEffect(() => {
    const allAirportsFieldAreTrue = airports.every((airport) =>
      departureAirports.includes(airport)
    );
    if (allAirportsFieldAreTrue) {
      setAirportsValidation(true);
    } else {
      setAirportsValidation(false);
    }
  }, [departureAirports, airports]);

  useEffect(() => {
    if (datesValidation && airportsValidation) {
      setPassengersValidation(true);
    } else return setPassengersValidation(false);
  }, [
    passengers,
    airports,
    airportsValidation,
    datesValidation,
    outbounds,
    returns,
  ]);

  useEffect(() => {
    errorsToggle && !airportsValidation
      ? setAirportsError(true)
      : setAirportsError(false);
    errorsToggle && !datesValidation
      ? setDatesError(true)
      : setDatesError(false);
  }, [airportsValidation, datesValidation, errorsToggle]);

  const handlePassengerChange = () => {
    setPassengers([...passengers]);
  };

  const handlePassengerAdd = () => {
    const _passengers = [...passengers, { ..._emptyPassenger }];
    fillDataIntoPassengers(_passengers);
    setPassengers([..._passengers]);
    window.scrollBy(0, 7000);
  };

  const handlePassengerDelete = (index) => {
    const _passengers = [...passengers];
    _passengers.splice(index, 1);
    fillDataIntoPassengers(_passengers);
    setPassengers([..._passengers]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passengers, stayTimeTogether }),
    };
    const response = await fetch(
      `${backendUrl}/common-destinations/passengers-data`,
      requestOptions
    );

    if (response.ok && passengersValidation) {
      const _passengers = [{ ..._emptyPassenger }, { ..._emptyPassenger }];
      setPassengers([...fillDataIntoPassengers(_passengers)]);
      navigate("/common-destinations");
    } else {
      setErrorsToggle(true);
      setMarkedErrors(true);
    }
  };

  return (
    <div className="flightSearch">
      <div className="passengersCriteria">
        <GeneralCriteria
          passengers={passengers}
          stayTimeTogether={stayTimeTogether}
          setStayTimeTogether={setStayTimeTogether}
          airportsValidation={airportsValidation}
          datesValidation={datesValidation}
          airportsError={airportsError}
          datesError={datesError}
          setErrorsToggle={setErrorsToggle}
          datesAreEmpty={datesAreEmpty}
          noMeeting={noMeeting}
          otboundLaterThanReturn={otboundLaterThanReturn}
        />
        {passengers.map((passenger, index) => (
          <ShowPassenger
            key={index}
            departureAirports={departureAirports}
            handlePassengerChange={handlePassengerChange}
            handlePassengerDelete={handlePassengerDelete}
            canDelete={passengers.length > 2}
            passenger={passenger}
            stayTimeTogether={stayTimeTogether}
            errorsToggle={errorsToggle}
            airportsError={airportsError}
            setAirportsError={setAirportsError}
            datesError={datesError}
            setDatesError={setDatesError}
            earliestReturn={earliestReturn}
            lastestOutbound={lastestOutbound}
            markedErrors={markedErrors}
            noMeeting={noMeeting}
            setOtboundLaterThanReturn={setOtboundLaterThanReturn}
          />
        ))}
        <div className="btnContainer">
          <icons.BsFillPersonPlusFill
            className="addPassengerBtn"
            type="button"
            onClick={handlePassengerAdd}
          />
          <button className="submitBtn" type="button" onClick={handleSubmit}>
            Common Destinations
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlightSearch;
