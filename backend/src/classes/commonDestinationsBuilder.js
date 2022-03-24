export class CommonDestinationsBuilder {
  constructor(
    commonDestinationsController,
    individualCompatibleTrips,
    passengers,
    minStayTimeTogether
  ) {
    this.commonDestinationsController = commonDestinationsController;
    this.passengers = passengers;
    this.minStayTimeTogether = minStayTimeTogether;
    this.individualCompatibleTrips = individualCompatibleTrips;
    this.commonDestinations = [];
    this.commonAirports = [];
    this.orderedPassengerTrips = {};
  }

  calculate() {
    this.stepOne_findCommonAirports();
    this.stepTwo_buildOrderedPassengerTrips();
    this.stepThree_buildCommonDestinations();
    return this.commonDestinations;
  }

  TripsAreCompatible(currentAirport, tripA, tripB) {
    return (
      (currentAirport === null || tripA.outboundFlight.to === currentAirport) &&
      tripA.outboundFlight.to === tripB.outboundFlight.to &&
      this.commonDestinationsController.getTimeTogether(
        [tripA.outboundFlight.arrival, tripB.outboundFlight.arrival],
        [tripA.returnFlight.departure, tripB.returnFlight.departure]
      ) >= this.minStayTimeTogether
    );
  }

  compareTrips(currentIndex, currentAirport = null) {
    const Trips1 = this.individualCompatibleTrips[currentIndex];
    const Trips2 = this.individualCompatibleTrips[currentIndex + 1];
    const atEnd = this.individualCompatibleTrips.length - currentIndex === 2;

    if (!atEnd) {
      Trips1.forEach((tripA) => {
        Trips2.forEach((tripB) => {
          if (this.TripsAreCompatible(currentAirport, tripA, tripB)) {
            this.compareTrips(currentIndex + 1, tripA.outboundFlight.to);
          }
        });
      });
    } else {
      Trips1.forEach((tripA) => {
        Trips2.forEach((tripB) => {
          if (this.TripsAreCompatible(currentAirport, tripA, tripB)) {
            this.commonAirports.push(tripA.outboundFlight.to);
          }
        });
      });
    }
  }

  stepOne_findCommonAirports() {
    this.compareTrips(0);
    this.commonAirports = [...new Set(this.commonAirports)];
  }

  getPassengerTripsForAirportAndPassenger(airport, passengerId) {
    const trips = [];
    this.individualCompatibleTrips.forEach((passengertripArray) => {
      passengertripArray.forEach((passengerTrip) => {
        if (
          airport === passengerTrip.outboundFlight.to &&
          passengerTrip.passengerId === passengerId
        ) {
          trips.push(passengerTrip);
        }
      });
    });
    return trips;
  }

  stepTwo_buildOrderedPassengerTrips() {
    this.commonAirports.forEach((commonAirport) => {
      this.orderedPassengerTrips[commonAirport] = {};
      this.passengers.forEach((passenger) => {
        this.orderedPassengerTrips[commonAirport][passenger.id] =
          this.getPassengerTripsForAirportAndPassenger(
            commonAirport,
            passenger.id
          );
      });
    });
  }

  stepThree_buildCommonDestinations() {
    const combinations = (obj) => {
      const result = [];
      const keys = Object.keys(obj);
      const max = keys.length - 1;
      const recursivCombinations = (level, arr = null) => {
        let key = keys[level];
        obj[key].forEach((elm) => {
          let arr2 = !arr ? [elm] : [...arr, elm];
          if (level < max) recursivCombinations(level + 1, arr2);
          else {
            const arrivalDates = arr2.map((trip) => {
              return trip.outboundFlight.arrival;
            });
            const departureDates = arr2.map((trip) => {
              return trip.returnFlight.departure;
            });

            const groupPrice = arr2.reduce((acc, trip) => {
              return (acc += trip.totalPrice);
            }, 0);

            const timeTogether =
              this.commonDestinationsController.getTimeTogether(
                arrivalDates,
                departureDates
              );
            timeTogether >= this.minStayTimeTogether &&
              result.push({
                _id: `${groupPrice}${timeTogether}${arr2.length}`,
                timeTogether,
                groupPrice,
                trips: [...arr2],
              });
          }
        });
      };
      recursivCombinations(0);
      return result;
    };

    this.commonDestinations = this.commonAirports
      .map((airport) => {
        return {
          airport: airport,
          commonDestinationsToAirport: combinations(
            this.orderedPassengerTrips[airport]
          ),
        };
      })
      .filter((element) => element.commonDestinationsToAirport.length > 0);
  }

  debug() {
    return {
      commonAirports: this.commonAirports,
      orderedPassengerTrips: this.orderedPassengerTrips,
      commonDestinations: this.commonDestinations,
    };
  }
}
