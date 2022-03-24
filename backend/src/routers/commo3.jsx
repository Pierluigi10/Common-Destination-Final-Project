import "../config.js";
import express from "express";
import moment from "moment";
import * as commonDestinationsController from "../controllers/commonDestinationController.js";

const commonDestinationsRouter = express.Router();

//COMPATIBLE FLIGHTS FOR EVERY PASSENGER

commonDestinationsRouter.get("/compatible-flights", async (req, res) => {
  const passengers = [
    {
      id: "passenger2",
      airport: "Hamburg",
      minOutboundDate: moment("2022-02-01 08:02"),
      maxReturnDate: moment("2022-02-04 08:02"),
    },
  ];
  const flights = await commonDestinationsController.compatibleFlights(
    passengers
  );
  res.json(flights);
});

//GET COMMON DESTINATION D

commonDestinationsRouter.post("/passengers-data", async (req, res) => {
  let passengers = req.body.passengers;
  let stayTimeTogether = req.body.stayTimeTogether;
  req.session.passengers = passengers;
  req.session.stayTimeTogether = stayTimeTogether;
  req.session.save();

  res.json({ passengers, stayTimeTogether });
});

commonDestinationsRouter.get("/", async (req, res) => {
  // let passengers = req.session.passengers;
  // let stayTimeTogether = req.session.stayTimeTogether;
  // console.log({ passengers, stayTimeTogether });
  const passengers = [
    {
      id: "1",
      airport: "Barcelona",
      minOutboundDate: "2022-02-08T23:00:00.000Z",
      maxReturnDate: "2022-02-14T23:00:00.000Z",
    },
    {
      id: "2",
      airport: "Amsterdam",
      minOutboundDate: "2022-02-08T23:00:00.000Z",
      maxReturnDate: "2022-02-14T23:00:00.000Z",
    },
    {
      id: "3",
      airport: "London",
      minOutboundDate: "2022-02-08T23:00:00.000Z",
      maxReturnDate: "2022-02-13T23:00:00.000Z",
    },
 
  ];
  let stayTimeTogether = 35;
  const individualCompatibleFlights =
    await commonDestinationsController.individualCompatibleFlights(passengers);
  let commonDestinations = [];
  const compareFlights = (currentIndex, currentAirport = null) => {
    const flights1 = individualCompatibleFlights[currentIndex];
    const flights2 = individualCompatibleFlights[currentIndex + 1];
    const atEnd = individualCompatibleFlights.length - currentIndex === 2;
    const flightsAreCompatible = (currentAirport, flightA, flightB) => {
      return (
        (currentAirport === null ||
          flightA.outboundFlight.to === currentAirport) &&
        flightA.outboundFlight.to === flightB.outboundFlight.to &&
        commonDestinationsController.getTimeTogether(
          [flightA.outboundFlight.arrival, flightB.outboundFlight.arrival],
          [flightA.returnFlight.departure, flightB.returnFlight.departure]
        ) >= stayTimeTogether
      );
    };

    if (!atEnd) {
      flights1.forEach((flightA) => {
        flights2.forEach((flightB) => {
          if (flightsAreCompatible(currentAirport, flightA, flightB)) {
            compareFlights(currentIndex + 1, flightA.outboundFlight.to);
          }
        });
      });
    } else {
      flights1.forEach((flightA) => {
        flights2.forEach((flightB) => {
          if (flightsAreCompatible(currentAirport, flightA, flightB)) {
            const flightsToCommonAirport = [];
            individualCompatibleFlights.forEach((passengerFlightGroup) => {
              passengerFlightGroup.forEach((flight) => {
                if (flight.outboundFlight.to === currentAirport) {
                  flightsToCommonAirport.push(flight);
                }
              });
            });
            const passengerGroups = flightsToCommonAirport.reduce(
              (obj, flight) => {
                if (obj[flight.passengerId]) {
                  obj[flight.passengerId].push(flight);
                } else {
                  obj[flight.passengerId] = [flight];
                }
                return obj;
              },
              {}
            );
            // console.log(currentAirport)
            // console.log(passengerGroups);
            console.log(flightsToCommonAirport.length)
            // const outbounds = flightsToCommonAirport.map(
            //   (flight) => flight.outboundFlight.arrival
            // );
            // const returns = flightsToCommonAirport.map(
            //   (flight) => flight.returnFlight.departure
            // );
            // if (outbounds.length > 0 && returns.length > 0) {
            //   const earliestReturn = moment(
            //     returns.reduce((a, b) => Math.min(moment(a), moment(b)))
            //   );
            //   const lastestOutbound = moment(
            //     outbounds.reduce((a, b) => Math.max(moment(b), moment(a)))
            //   );
            //   const howManyTimeTogether = moment(earliestReturn).diff(
            //     moment(lastestOutbound),
            //     "hours"
            //   );
            //   if (howManyTimeTogether >= stayTimeTogether) {
                commonDestinations.push({
                  airport: currentAirport,
                  passengerFlights: flightsToCommonAirport,
                });
              }
            // }
          // }
        });
      });
    }
  };

  compareFlights(0);

  res.json(commonDestinations);
  // res.json(individualCompatibleFlights);
});

export { commonDestinationsRouter };
