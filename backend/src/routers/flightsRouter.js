import "../config.js";
import express from "express";
import moment from "moment";
import * as flightsController from "../controllers/flightsController.js";
import { airports } from "../data/airports.js";
import cookieParser from "cookie-parser";
const flightsRouter = express.Router();

// DEPARTURE AIRPORT
flightsRouter.get("/departure-airport/:airport", async (req, res) => {
  const airport = req.params.airport;
  const flights = await flightsController.filterByProperty("from", airport);
  res.json(flights);
});

// ARRIVAL AIRPORT
flightsRouter.get("/arrival-airport/:airport", async (req, res) => {
  const airport = req.params.airport;
  const flights = await flightsController.filterByProperty("to", airport);
  res.json(flights);
});

// DEPARTURE COUNTRY
flightsRouter.get("/departure-country/:country", async (req, res) => {
  const country = req.params.country;
  const flights = await flightsController.filterByProperty(
    "countryFrom",
    country
  );
  res.json(flights);
});

// ARRIVAL COUNTRY
flightsRouter.get("/arrival-country/:country", async (req, res) => {
  const country = req.params.country;
  const flights = await flightsController.filterByProperty(
    "countryTo",
    country
  );
  res.json(flights);
});

// DEPARTURE DATE
flightsRouter.get("/departure-date/:departure", async (req, res) => {
  const departure = req.params.departure;
  const flights = await flightsController.getAllFlights();
  const filteredByDepartureDate = flights.filter(
    (elem) => elem.departure.slice(0, -6) === departure
  );
  res.json(filteredByDepartureDate);
});

// DEPARTURE => AIRPORT FROM => START => END
flightsRouter.get("/departure/:airport/:minstart/:maxend", async (req, res) => {
  //START AND END WITH DAY AND TIME
  const airport = req.params.airport;
  // const date = req.params.date;
  const minstart = req.params.minstart;
  const maxend = req.params.maxend;
  const flights = await flightsController.getAllFlights();
  const filteredByDepartureHour = flights.filter(
    (elem) =>
      elem.from === airport &&
      // elem.arrival.slice(0, -6) === date &&
      elem.departure.slice(0, -6) >= minstart &&
      elem.departure.slice(0, -6) <= maxend
  );
  res.json(filteredByDepartureHour);
});

// ARRIVAL => AIRPORT FROM => START => END
flightsRouter.get("/arrival/:airport/:date/:start/:end", async (req, res) => {
  const airport = req.params.airport;
  const start = req.params.start;
  const end = req.params.end;
  const date = req.params.date;
  const flights = await flightsController.getAllFlights();
  const filteredByDepartureHour = flights.filter(
    (elem) =>
      elem.from === airport &&
      elem.arrival.slice(0, -6) === date &&
      elem.arrival.slice(-5) >= start &&
      elem.arrival.slice(-5) <= end
  );
  res.json(filteredByDepartureHour);
});

// ARRIVAL DATE
flightsRouter.get("/arrival-date/:arrival", async (req, res) => {
  const arrival = req.params.arrival;
  const flights = await flightsController.getAllFlights();
  const filteredByArrival = flights.filter(
    (elem) => elem.arrival.slice(0, -6) === arrival
  );
  res.json(filteredByArrival);
});

// FLIGHT DISTANCE
flightsRouter.get("/flight-distance", async (req, res) => {
  const distance = req.params.flightDurationInHours;
  const flights = await flightsController.getAllFlights();
  const sortedByDistance = flights
    .filter((elem) => elem.flightDurationInHours)
    .sort((min, max) => min.flightDurationInHours - max.flightDurationInHours);
  res.json(sortedByDistance);
});

// FLIGHT DURATION
flightsRouter.get("/flight-duration", async (req, res) => {
  const flights = await flightsController.getAllFlights();
  const sortedByDuration = flights
    .filter((elem) => elem.flightDurationInHours)
    .sort((min, max) => min.flightDurationInHours - max.flightDurationInHours);
  res.json(sortedByDuration);
});

// MAX-PRICE
flightsRouter.get("/max-price/:price", async (req, res) => {
  const price = req.params.price;
  const flights = await flightsController.getAllFlights();
  const filteredByMaxPrice = flights
    .filter((elem) => elem.price <= price)
    .sort((min, max) => min.price - max.price);
  res.json(filteredByMaxPrice);
});

// GET ALL UNIQUE AIRPORTS AND UNIQUE COUNTRIES
// flightsRouter.get("/airports", async (_req, res) => {
//   const getAllAirports = airports.map((airport) => airport.name);
//   const getAllCountries = airports.map((airport) => airport.country);
//   const getUniqueDepartures = [
//     ...new Set(getAllAirports),
//     ...new Set(getAllCountries),
//   ];
//   res.json(getUniqueDepartures);
//   console.log(getUniqueDepartures);
//   console.log(getUniqueDepartures.length);
// });

// GET ALL UNIQUE AIRPORTS
flightsRouter.get("/airports", async (req, res) => {
  const getSortedAirports = airports.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const getAllAirports = getSortedAirports.map((airport) => airport.name);
  const getUniqueAirports = [...new Set(getAllAirports)];
  res.json(getUniqueAirports);
});

// GET ALL UNIQUE COUNTRIES
flightsRouter.get("/countries", async (req, res) => {
  const getSortedCountries = airports.sort((a, b) =>
    a.country.localeCompare(b.country)
  );
  const getAllCountries = getSortedCountries.map((country) => country.country);
  const getUniqueCountries = [...new Set(getAllCountries)];
  res.json(getUniqueCountries);
});

// SORT BY DEPARTURE DATE

flightsRouter.get("/ascending-departuredate", async (req, res) => {
  const getSorteDate = await flightsController.sortByProperty("departure", 1);
  res.json(getSorteDate);
});

flightsRouter.get("/descending-departuredate", async (req, res) => {
  const getSorteDate = await flightsController.sortByProperty("departure", -1);
  res.json(getSorteDate);
});



// GET ALL FLIGHTS
flightsRouter.get("/", async (_req, res) => {
  const flights = await flightsController.getAllFlights();
  res.json(flights);
});

export { flightsRouter };
