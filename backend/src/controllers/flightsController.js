import FlightsModel from "../models/flightsModel.js";


// GET ALL FLIGHTS
export const getAllFlights = async () => {
  return await FlightsModel.find({});
};

// FILTER BY PROPERTY

export const filterByProperty = async (property, value) => {
  return await FlightsModel.find({ [property]: value });
};

//SORT BY PROPERTY

export const sortByProperty = async (property, order) => {
  return await FlightsModel.find({}).sort({ [property]: order });
};



