import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema(
  {
    flight: String,
    from: String,
    to: String,
    countryFrom: String,
    countryTo: String,
    departure: String,
    arrival: String,
    distance: String,
    flightDuration: String,
    flightDurationInHours: Number,
    day: String,
    month: String,
    price: Number,

  },
  // {
  //   versionKey: false,
  //   timestamps: true,
  // }
);

const FlightsModel = mongoose.model('flight', flightSchema, 'flights');

export default FlightsModel;
