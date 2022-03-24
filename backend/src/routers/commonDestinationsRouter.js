import "../config.js";
import express from "express";
import moment from "moment";
import * as commonDestinationsController from "../controllers/commonDestinationController.js";
import { CommonDestinationsBuilder } from "../classes/commonDestinationsBuilder.js";
import UsersModel from "../models/usersModel.js";
import mongoose from "mongoose";

const commonDestinationsRouter = express.Router();

commonDestinationsRouter.patch("/favorite-trips/:id", async (req, res) => {
  const id = req.params.id;
  const user = await UsersModel.findById(id);
  const favoriteTrips = req.body.favoriteTrips;
  const isANewBookMark = user.favoriteTrips.some(
    (favoriteTrip) => favoriteTrip._id === favoriteTrips._id
  );
  !isANewBookMark &&
    (await UsersModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $push: { favoriteTrips: [favoriteTrips] } },
      { new: true }
    ));
  req.session.user = user;
});

commonDestinationsRouter.get("/compatible-flights", async (req, res) => {
  const passengers = [
    {
      id: "1",
      airport: "London",
      minOutboundDate: moment("2022-02-01 08:02"),
      maxReturnDate: moment("2022-02-04 08:02"),
    },
    {
      id: "2",
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
  let passengers = req.session.passengers;
  let stayTimeTogether = req.session.stayTimeTogether;
  // const passengers = [
  //   {
  //     id: "1",
  //     airport: "Amsterdam",
  //     minOutboundDate: "2022-03-15T23:00:00.000Z",
  //     maxReturnDate: "2022-03-24T23:00:00.000Z",
  //   },
  //   {
  //     id: "2",
  //     airport: "Frankfurt",
  //     minOutboundDate: "2022-03-15T23:00:00.000Z",
  //     maxReturnDate: "2022-03-24T23:00:00.000Z",
  //   },
  //   {
  //     id: "3",
  //     airport: "London",
  //     minOutboundDate: "2022-03-15T23:00:00.000Z",
  //     maxReturnDate: "2022-03-23T23:00:00.000Z",
  //   },
  // ];
  // let minStayTimeTogether = 10;
  const individualCompatibleTrips =
    await commonDestinationsController.individualCompatibleFlights(
      passengers,
      stayTimeTogether
    );
  const commonDestinationsBuilder = new CommonDestinationsBuilder(
    commonDestinationsController,
    individualCompatibleTrips,
    passengers,
    stayTimeTogether
  );
  const commonDestinations = commonDestinationsBuilder.calculate();
  res.json(commonDestinations.length > 0 ? commonDestinations : "");
});

export { commonDestinationsRouter };
