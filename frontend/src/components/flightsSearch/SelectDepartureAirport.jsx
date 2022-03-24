import React, { useState, useEffect } from "react";

function SelectDepartureAirport({
  airport,
  handleChangeField,
  departureAirports,
  markedErrors,
}) {
  const [airportIsValid, setAirportIsValid] = useState(false);

  // const styles = {
  //   boxShadow:
  //     !airportIsValid && markedErrors ? "inset 0 0 0 2rem #f00" : "none",
  // };

  useEffect(() => {
    departureAirports.includes(airport)
      ? setAirportIsValid(true)
      : setAirportIsValid(false);
  }, [airport, airportIsValid, departureAirports]);

  return (
    <div className="selectDeparture">
      <input
        className={!airportIsValid && markedErrors ? "airportError" : "airport"}
        placeholder="departure airport"
        list="opts"
        value={airport}
        onChange={(e) => handleChangeField("airport", e.target.value)}
        // style={styles}
      />
      <datalist id="opts">
        {departureAirports.map((departureAirport, index) => (
          <option key={index} value={departureAirport}>
            {departureAirport}
          </option>
        ))}
      </datalist>
    </div>
  );
}

export default SelectDepartureAirport;
