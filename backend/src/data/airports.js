export let airports = [
  {
    name: "London",
    country: "UK",
    passengersInMillionPerYear: 80,
  },
  {
    name: "Paris",
    country: "France",
    passengersInMillionPerYear: 76,
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    passengersInMillionPerYear: 71,
  },
  {
    name: "Frankfurt",
    country: "Germany",
    passengersInMillionPerYear: 70,
  },
  {
    name: "Barcelona",
    country: "Spain",
    passengersInMillionPerYear: 52,
  },
  {
    name: "Istanbul",
    country: "Turkey",
    passengersInMillionPerYear: 52,
  },
  {
    name: "Moscow",
    country: "Russia",
    passengersInMillionPerYear: 49,
  },
  {
    name: "Madrid",
    country: "Spain",
    passengersInMillionPerYear: 47,
  },
  {
    name: "Rome",
    country: "Italy",
    passengersInMillionPerYear: 43,
  },
  {
    name: "Dublin",
    country: "Ireland",
    passengersInMillionPerYear: 32,
  },
  {
    name: "Vienna",
    country: "Austria",
    passengersInMillionPerYear: 31,
  },
  {
    name: "Zurich",
    country: "Switzerland",
    passengersInMillionPerYear: 31,
  },
  {
    name: "Lisbon",
    country: "Portugal",
    passengersInMillionPerYear: 31,
  },
  {
    name: "Copenhagen",
    country: "Denmark",
    passengersInMillionPerYear: 30,
  },
  {
    name: "Palma de Mallorca",
    country: "Spain",
    passengersInMillionPerYear: 29,
  },
  {
    name: "Milan",
    country: "Italy",
    passengersInMillionPerYear: 28,
  },
  {
    name: "Oslo",
    country: "Norway",
    passengersInMillionPerYear: 28,
  },
  {
    name: "Brussels",
    country: "Belgium",
    passengersInMillionPerYear: 26,
  },
  {
    name: "Stockholm",
    country: "Sweden",
    passengersInMillionPerYear: 25,
  },
  {
    name: "Athens",
    country: "Greece",
    passengersInMillionPerYear: 25,
  },
  {
    name: "Dusseldorf",
    country: "Germany",
    passengersInMillionPerYear: 25,
  },
  {
    name: "Berlin",
    country: "Germany",
    passengersInMillionPerYear: 24,
  },
  {
    name: "Helsinki",
    country: "Finland",
    passengersInMillionPerYear: 22,
  },
  {
    name: "Saint Petersburg",
    country: "Russia",
    passengersInMillionPerYear: 21,
  },
  {
    name: "Warsaw",
    country: "Poland",
    passengersInMillionPerYear: 20,
  },
  {
    name: "Prague",
    country: "Czech Republic",
    passengersInMillionPerYear: 19,
  },
  {
    name: "Hamburg",
    country: "Germany",
    passengersInMillionPerYear: 19,
  },
  {
    name: "Budapest",
    country: "Hungary",
    passengersInMillionPerYear: 18,
  },
  {
    name: "Stuttgart",
    country: "Germany",
    passengersInMillionPerYear: 17,
  },
];

airports.map((airport) => {
  airport.range = Math.round(airport.passengersInMillionPerYear / 10);
});
