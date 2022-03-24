import geoCoder from "node-open-geocoder";
import { getDistance } from "geolib";
import moment from "moment";
import momentRandom from "moment-random";
import { airports } from "../data/airports.js";
import {
  flightsConditions,
  dayOfWeek,
  Month,
  purchasingSeason,
  flightDurationString,
  getFLightPrice,
} from "./apiFunctions.js";

// get distance between two addresses / geo points in meters
const getGeoData = (strLocation1, strLocation2) => {
  return new Promise((resolve, reject) => {
    geoCoder()
      .geocode(strLocation1)
      .end((err, res) => {
        const coordAirport1 = { latitude: res[0].lat, longitude: res[0].lon };
        geoCoder()
          .geocode(strLocation2)
          .end((err, res) => {
            const coordAirport2 = {
              latitude: res[0].lat,
              longitude: res[0].lon,
            };
            const dist = getDistance(coordAirport1, coordAirport2);
            resolve(dist);
          });
      });
  });
};

const getFlightsAPI = async () => {
  let flights = [];
  const minDate = moment().add(1, "days").format("YYYY-MM-DD");
  const maxDate = moment().add(1, "years").format("YYYY-MM-DD");

  for (let i = 0; i < airports.length; i++) {
    // combine with every other airport
    for (let j = i + 1; j < airports.length; j++) {
      const distance = Math.round(
        (await getGeoData(
          `${airports[i].name} Airport, ${airports[i].country}`,
          `${airports[j].name} Airport, ${airports[j].country}`
        )) / 1000
      );

      const landingAndBoardingTime = 0.5;
      const averageFlightSpeed = 800;
      const flightDurationInHours =
        distance / averageFlightSpeed + landingAndBoardingTime;

      // HOW MANY DAYS OF FLIGHTS
      const amountFlights = 365;

      //ITERATION X DAYS TO ADD 1 DAY EVRY TIME

      for (let x = 0; x < amountFlights; x++) {
        const randomDate = momentRandom(
          moment(`${maxDate} 18:30:00`),
          moment(`${minDate} 05:00:00`)
        );

        const departureDate1 = randomDate;
        // const departureDate1 = randomDate.add(1, "days");
        // .add(Math.round(Math.random() * (0 + 360)), "minutes");

        const departureDate2 = departureDate1
          .clone()
          .add(1 + flightDurationInHours, "hours");

        const arrival1 = departureDate1
          .clone()
          .add(flightDurationInHours, "hours");

        const arrival2 = departureDate2
          .clone()
          .add(flightDurationInHours, "hours");

        if (
          !flightsConditions(
            airports[i].range,
            airports[j].range,
            departureDate1.isoWeekday(),
            Month(departureDate1)
          )
        ) {
          continue;
        }

        //first flight

        flights.push({
          from: airports[i].name,
          to: airports[j].name,
          countryFrom: airports[i].country,
          countryTo: airports[j].country,
          departure: departureDate1.format("YYYY-MM-DD HH:mm"),
          arrival: arrival1.format("YYYY-MM-DD HH:mm"),
          day: dayOfWeek(departureDate1),
          month: Month(departureDate1),
          distance: `${distance} km`,
          flightDuration: flightDurationString(flightDurationInHours),
          flightDurationInHours,
          price: getFLightPrice(
            purchasingSeason(departureDate1),
            flightDurationInHours
          ),
        });

        //second flight

        flights.push({
          from: airports[j].name,
          to: airports[i].name,
          countryFrom: airports[j].country,
          countryTo: airports[i].country,
          departure: departureDate2.format("YYYY-MM-DD HH:mm"),
          arrival: arrival2.format("YYYY-MM-DD HH:mm"),
          day: dayOfWeek(departureDate2),
          month: Month(departureDate2),
          distance: `${distance} km`,
          flightDuration: flightDurationString(flightDurationInHours),
          flightDurationInHours,
          price: getFLightPrice(
            purchasingSeason(departureDate2),
            flightDurationInHours
          ),
        });
      }
    }
  }
  return flights;
};

export default getFlightsAPI;
