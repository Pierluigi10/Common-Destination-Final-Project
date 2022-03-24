import "./config.js";
import "./db-connect.js";
import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import { flightsRouter } from "./routers/flightsRouter.js";
import { usersRouter } from "./routers/usersRouter.js";
import { commonDestinationsRouter } from "./routers/commonDestinationsRouter.js";

const app = express();
// const port = process.env.PORT;
const port = process.env.PORT || 3003;
app.set("trust proxy", 1); // allow / trust Heroku proxy to forward secure cookies

app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN_URL || "http://localhost:3000",
    credentials: true, // accept incoming  cookies
  })
);

app.use(
  session({
    name: "sessId",
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true, // httpOnly => cookie can just be written from API and not by Javascript
      maxAge: 60 * 1000 * 30, // 30 minutes of inactivity
      // sameSite: "none", // allow cookies transfered from OTHER origin
      // secure: true, // allow cookies to be set just via HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use(cookieParser());

app.use("/users", usersRouter, (req, res) => {
  res.status(404).send({
    message: "404 page not found",
    url: req.originalUrl,
  });
});

app.use("/flights", flightsRouter, (req, res) => {
  res.status(404).send({
    message: "404 page not found",
    url: req.originalUrl,
  });
});

app.use("/common-destinations", commonDestinationsRouter, (req, res) => {
  res.status(404).send({
    message: "404 page not found",
    url: req.originalUrl,
  });
});

app.use("/", (req, res) => {
  res.status(404).send("WELCOME TO COMMON DESTINATION");
});
app.listen(port, () => console.log(`http://localhost:${port}`));
