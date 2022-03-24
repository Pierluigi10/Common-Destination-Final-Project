import FlightsModel from "../models/flightsModel.js";
import moment from "moment";

//COMPATIBLE FLIGHTS FOR EVERY PASSENGER

export const individualCompatibleFlights = async (
  passengers,
  minStayTimeTogether
) => {
  let individualCompatibleFlights = [];
  const flights = await FlightsModel.find({});

  // all compatible departure and return oneway flights per passenger
  passengers.map((passenger) => {
    let outboundFlights = [];
    let returnFlights = [];

    flights.map((flight) => {
      const departureFlightConditions =
        flight.from === passenger.airport &&
        moment(flight.departure) >= moment(passenger.minOutboundDate) &&
        moment(flight.departure) < moment(passenger.maxReturnDate);

      const returnFlightConditions =
        flight.to === passenger.airport &&
        moment(flight.arrival) <= moment(passenger.maxReturnDate) &&
        moment(flight.arrival) > moment(passenger.minOutboundDate);

      if (departureFlightConditions) return outboundFlights.push(flight);
      if (returnFlightConditions) return returnFlights.push(flight);
    });

    // CREATE ROUNDTRIPS FLIGHTS FOR EACH PASSENGER
    let roundTrips = [];

    outboundFlights.forEach((outboundFlight, outboundFlightIndex) => {
      returnFlights.forEach((returnFlight, returnIndex) => {
        if (
          moment(returnFlight.departure) >= moment(outboundFlight.departure) &&
          outboundFlight.to === returnFlight.from
        ) {
          const stayTime = moment(returnFlight.departure).diff(
            moment(outboundFlight.arrival),
            "hours"
          );

          // CREATE ROUNDTRIP FLIGHT
          if (stayTime >= minStayTimeTogether) {
            const roundTrip = {
              _id: `${passenger.id}.${outboundFlightIndex}${returnIndex}`,
              passengerId: passenger.id,
              outboundFlight: outboundFlight,
              returnFlight: returnFlight,
              totalPrice: outboundFlight.price + returnFlight.price,
              stayTime: stayTime,
            };

            roundTrips.push(roundTrip);
          }
        }
      });
    });
    return individualCompatibleFlights.push(roundTrips);
  });

  return individualCompatibleFlights;
};

export const getTimeTogether = (arrivalDates, departureDates) => {
  const earliestReturn = moment(
    departureDates.reduce((a, b) => Math.min(moment(a), moment(b)))
  );
  const lastestOutbound = moment(
    arrivalDates.reduce((a, b) => Math.max(moment(b), moment(a)))
  );
  const timeTogether = moment(earliestReturn).diff(
    moment(lastestOutbound),
    "hours"
  );

  return timeTogether;
};
