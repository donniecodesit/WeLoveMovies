if (process.env.USER) require("dotenv").config();

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();

const moviesRouter = require('./endpoints/movies/movies.router')
const reviewsRouter = require('./endpoints/reviews/reviews.router')
const theatersRouter = require('./endpoints/theaters/theaters.router')

const notFoundHandler = require("./errors/notFoundHandler.js");
const errorHandler = require("./errors/errorHandler.js");

//App General Usage
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//App Routes for Requests
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

//Not Found Handler
app.use(notFoundHandler);

//Error Handler
app.use(errorHandler);

module.exports = app;
